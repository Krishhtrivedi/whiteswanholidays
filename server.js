require('dotenv').config();

const crypto = require('crypto');
const path = require('path');
const express = require('express');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');

const app = express();
const PORT = Number(process.env.PORT) || 8080;

const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'info@whiteswanholidays.in').trim().toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'White@swan';
const SESSION_COOKIE_NAME = 'wsh_admin_session';
const SESSION_TTL_MS = 24 * 60 * 60 * 1000;
const SESSION_SECRET =
  process.env.SESSION_SECRET ||
  crypto.createHash('sha256').update(`${ADMIN_EMAIL}:${ADMIN_PASSWORD}:wsh-session`).digest('hex');

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const ALLOWED_FOLDERS = new Set(['packages', 'events', 'gallery', 'general']);

function isCloudinaryConfigured() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
  );
}

if (isCloudinaryConfigured()) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  });
}

function parseCookies(cookieHeader) {
  const cookies = {};
  if (!cookieHeader) return cookies;
  for (const part of cookieHeader.split(';')) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    const key = part.slice(0, idx).trim();
    const val = decodeURIComponent(part.slice(idx + 1).trim());
    cookies[key] = val;
  }
  return cookies;
}

function signSessionToken(email) {
  const payload = Buffer.from(
    JSON.stringify({ email, exp: Date.now() + SESSION_TTL_MS }),
    'utf8'
  ).toString('base64url');
  const sig = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

function verifySessionToken(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [payload, sig] = parts;
  const expectedSig = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('base64url');
  const sigBuf = Buffer.from(sig);
  const expectedBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(sigBuf, expectedBuf)) {
    return null;
  }
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (!data || !data.email || typeof data.exp !== 'number' || data.exp < Date.now()) {
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

function getAuthenticatedAdmin(req) {
  const cookies = parseCookies(req.headers.cookie);
  return verifySessionToken(cookies[SESSION_COOKIE_NAME]);
}

function requireAdminSession(req, res, next) {
  const admin = getAuthenticatedAdmin(req);
  if (!admin) {
    return res.status(401).json({ error: 'Unauthorized: valid admin session required.' });
  }
  req.admin = admin;
  return next();
}

function hasValidImageMagicBytes(buffer, mimetype) {
  if (!Buffer.isBuffer(buffer) || buffer.length < 12) return false;
  if (mimetype === 'image/jpeg') {
    return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  }
  if (mimetype === 'image/png') {
    return (
      buffer[0] === 0x89 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x4e &&
      buffer[3] === 0x47 &&
      buffer[4] === 0x0d &&
      buffer[5] === 0x0a &&
      buffer[6] === 0x1a &&
      buffer[7] === 0x0a
    );
  }
  if (mimetype === 'image/webp') {
    return (
      buffer.subarray(0, 4).toString('ascii') === 'RIFF' &&
      buffer.subarray(8, 12).toString('ascii') === 'WEBP'
    );
  }
  return false;
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_UPLOAD_BYTES },
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
      const err = new Error('Only JPG, PNG, and WebP images are allowed.');
      err.statusCode = 400;
      return cb(err);
    }
    return cb(null, true);
  }
});

app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    storage: isCloudinaryConfigured() ? 'cloudinary' : 'unconfigured'
  });
});

app.get('/api/admin/session', (req, res) => {
  const admin = getAuthenticatedAdmin(req);
  res.json({ authenticated: Boolean(admin), email: admin ? admin.email : null });
});

app.post('/api/admin/login', (req, res) => {
  const email = String(req.body?.email || '').trim().toLowerCase();
  const password = String(req.body?.password || '');
  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid Admin ID or password.' });
  }
  const token = signSessionToken(email);
  const isHttps = req.secure || req.headers['x-forwarded-proto'] === 'https';
  res.cookie(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: isHttps,
    maxAge: SESSION_TTL_MS,
    path: '/'
  });
  return res.json({ ok: true, email });
});

app.post('/api/admin/logout', (_req, res) => {
  res.clearCookie(SESSION_COOKIE_NAME, { path: '/' });
  res.json({ ok: true });
});

app.post('/api/upload', requireAdminSession, (req, res) => {
  upload.single('file')(req, res, async err => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({ error: 'File exceeds the 5 MB maximum upload size.' });
      }
      return res.status(err.statusCode || 400).json({ error: err.message || 'Invalid upload request.' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided.' });
    }

    if (!ALLOWED_MIME_TYPES.has(req.file.mimetype) || !hasValidImageMagicBytes(req.file.buffer, req.file.mimetype)) {
      return res.status(400).json({ error: 'Invalid image file. Only JPG, PNG, and WebP are allowed.' });
    }

    if (!isCloudinaryConfigured()) {
      return res.status(503).json({
        error: 'Cloudinary is not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in Render.'
      });
    }

    const requestedFolder = String(req.body?.folder || 'general').trim().toLowerCase();
    const targetFolder = ALLOWED_FOLDERS.has(requestedFolder) ? requestedFolder : 'general';

    try {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: `whiteswanholidays/${targetFolder}`,
            resource_type: 'image',
            format: 'webp',
            transformation: [{ quality: 'auto:good', fetch_format: 'webp' }]
          },
          (uploadErr, uploadRes) => {
            if (uploadErr) return reject(uploadErr);
            return resolve(uploadRes);
          }
        );
        stream.end(req.file.buffer);
      });

      return res.json({
        url: result.secure_url,
        publicId: result.public_id,
        format: result.format,
        bytes: result.bytes,
        width: result.width,
        height: result.height
      });
    } catch (uploadErr) {
      return res.status(502).json({
        error: uploadErr.message || 'Cloudinary upload failed.'
      });
    }
  });
});

app.use(express.static(path.join(__dirname), { dotfiles: 'ignore' }));

app.listen(PORT, () => {
  console.log(`White Swan Holidays server listening on port ${PORT}`);
});
