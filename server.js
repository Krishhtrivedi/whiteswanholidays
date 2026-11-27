require('dotenv').config();

const crypto = require('crypto');
const path = require('path');
const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
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

const MAIL_HOST = process.env.MAIL_HOST || 'smtp.office365.com';
const MAIL_PORT = Number(process.env.MAIL_PORT) || 587;
const MAIL_USERNAME = process.env.MAIL_USERNAME || 'info@whiteswanholidays.in';
const MAIL_PASSWORD = process.env.MAIL_PASSWORD || '';

function isMailConfigured() {
  return Boolean(MAIL_HOST && MAIL_USERNAME && MAIL_PASSWORD);
}

function createMailTransporter() {
  if (!isMailConfigured()) return null;
  return nodemailer.createTransport({
    host: MAIL_HOST,
    port: MAIL_PORT,
    secure: MAIL_PORT === 465,
    requireTLS: MAIL_PORT === 587,
    auth: {
      user: MAIL_USERNAME,
      pass: MAIL_PASSWORD
    }
  });
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function sendInquiryEmailsAsync(inquiry) {
  const transporter = createMailTransporter();
  if (!transporter) return;

  setImmediate(async () => {
    try {
      const custName = escapeHtml(inquiry.travelerName || 'Traveler');
      const custPhone = escapeHtml(inquiry.phone || 'Not provided');
      const custEmail = isValidEmail(inquiry.email) ? inquiry.email.trim() : '';
      const pkgTitle = escapeHtml(inquiry.packageTitle || 'Custom Holiday Package');
      const pkgRef = escapeHtml(inquiry.packageRef || 'CUSTOM');
      const category = escapeHtml(inquiry.category || 'Holiday');
      const travelDates = escapeHtml(inquiry.travelDates || 'Flexible');
      const depCity = escapeHtml(inquiry.departureCity || inquiry.city || 'Ahmedabad');
      const hotelTier = escapeHtml(inquiry.hotelTier || '4-Star');
      const groupSize = `${Number(inquiry.adults) || 2} Adults, ${Number(inquiry.children) || 0} Children`;
      const notes = escapeHtml(inquiry.notes || 'None').replace(/\n/g, '<br>');
      const inqId = escapeHtml(inquiry.id || `INQ-${Date.now()}`);

      // 1. Notification email to info@whiteswanholidays.in
      await transporter.sendMail({
        from: `"White Swan Holidays Web Desk" <${MAIL_USERNAME}>`,
        to: MAIL_USERNAME,
        replyTo: custEmail || undefined,
        subject: `New Inquiry [${inqId}]: ${inquiry.packageTitle || 'Custom Package'} (${inquiry.travelerName || 'Guest'})`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;border:1px solid #E2D8CA;border-radius:12px;overflow:hidden;background:#FAF7F2;color:#1C1915">
            <div style="background:#110F0D;color:#F5F0E6;padding:18px 24px">
              <h2 style="margin:0;color:#D8A85A;font-size:20px">White Swan Holidays — New Lead Notification</h2>
              <p style="margin:4px 0 0;font-size:13px;color:#A89F91">Inquiry ID: ${inqId} &bull; ${category}</p>
            </div>
            <div style="padding:20px 24px;background:#FFFFFF">
              <table style="width:100%;border-collapse:collapse;font-size:14px">
                <tr><td style="padding:6px 0;color:#5E564C;width:150px"><strong>Customer Name:</strong></td><td>${custName}</td></tr>
                <tr><td style="padding:6px 0;color:#5E564C"><strong>Phone / WhatsApp:</strong></td><td>${custPhone}</td></tr>
                <tr><td style="padding:6px 0;color:#5E564C"><strong>Customer Email:</strong></td><td>${escapeHtml(custEmail || 'Not provided')}</td></tr>
                <tr><td style="padding:6px 0;color:#5E564C"><strong>Package / Trip:</strong></td><td>${pkgTitle} (${pkgRef})</td></tr>
                <tr><td style="padding:6px 0;color:#5E564C"><strong>Departure City:</strong></td><td>${depCity}</td></tr>
                <tr><td style="padding:6px 0;color:#5E564C"><strong>Travel Dates:</strong></td><td>${travelDates}</td></tr>
                <tr><td style="padding:6px 0;color:#5E564C"><strong>Group Size:</strong></td><td>${groupSize}</td></tr>
                <tr><td style="padding:6px 0;color:#5E564C"><strong>Hotel Tier:</strong></td><td>${hotelTier}</td></tr>
                <tr><td style="padding:6px 0;color:#5E564C;vertical-align:top"><strong>Notes / Itinerary:</strong></td><td>${notes}</td></tr>
              </table>
            </div>
          </div>
        `
      });

      // 2. Branded confirmation auto-reply to customer
      if (custEmail) {
        await transporter.sendMail({
          from: `"White Swan Holidays" <${MAIL_USERNAME}>`,
          to: custEmail,
          subject: `We Received Your Travel Inquiry [${inqId}] — White Swan Holidays`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #E2D8CA;border-radius:12px;overflow:hidden;background:#FAF7F2;color:#1C1915">
              <div style="background:#110F0D;color:#F5F0E6;padding:20px 24px">
                <h2 style="margin:0;color:#D8A85A;font-size:20px">Namaste ${custName},</h2>
                <p style="margin:6px 0 0;font-size:13px;color:#A89F91">Thank you for choosing White Swan Holidays, Ahmedabad</p>
              </div>
              <div style="padding:22px 24px;background:#FFFFFF;font-size:14px;line-height:1.6">
                <p>We have received your travel inquiry (<strong>${inqId}</strong>) for <strong>${pkgTitle}</strong>.</p>
                <p>Our senior holiday specialists at our CG Road, Ahmedabad desk are preparing your tailored itinerary and quote for <strong>${travelDates}</strong> (${groupSize}).</p>
                <p style="margin-top:16px">Need immediate assistance? Reply directly to this email or reach us on WhatsApp / Call at <strong>+91 99258 11770</strong> or <strong>+91 90990 41625</strong>.</p>
                <p style="margin-top:20px;color:#5E564C;font-size:13px">Warm regards,<br><strong>White Swan Holidays Pvt Ltd</strong><br>501, Sun Square Building, Off CG Road, Ahmedabad</p>
              </div>
            </div>
          `
        });
      }
    } catch (mailErr) {
      console.error('[WSH Mail Error]', mailErr && mailErr.message ? mailErr.message : mailErr);
    }
  });
}

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
    storage: isCloudinaryConfigured() ? 'cloudinary' : 'unconfigured',
    mail: isMailConfigured() ? 'configured' : 'unconfigured'
  });
});

app.post('/api/inquiries', (req, res) => {
  const payload = req.body || {};
  const travelerName = String(payload.travelerName || '').trim();
  const phone = String(payload.phone || '').trim();

  if (!travelerName || phone.replace(/[^0-9]/g, '').length < 8) {
    return res.status(400).json({ error: 'Valid travelerName and phone are required.' });
  }

  const inquiry = {
    id: String(payload.id || `INQ-WSH-${Date.now()}`).trim(),
    category: String(payload.category || 'Domestic').trim(),
    packageTitle: String(payload.packageTitle || 'Custom Holiday Package').trim(),
    packageRef: String(payload.packageRef || 'CUSTOM').trim(),
    travelerName,
    phone,
    email: String(payload.email || '').trim(),
    departureCity: String(payload.departureCity || payload.city || 'Ahmedabad').trim(),
    travelDates: String(payload.travelDates || 'Flexible').trim(),
    adults: Number(payload.adults) || 2,
    children: Number(payload.children) || 0,
    hotelTier: String(payload.hotelTier || '4-Star').trim(),
    notes: String(payload.notes || '').trim()
  };

  sendInquiryEmailsAsync(inquiry);
  return res.status(201).json({
    ok: true,
    id: inquiry.id,
    mailConfigured: isMailConfigured()
  });
});

app.post('/api/admin/test-email', requireAdminSession, async (req, res) => {
  if (!isMailConfigured()) {
    return res.status(503).json({
      error: 'SMTP is not configured. Set MAIL_HOST, MAIL_PORT, MAIL_USERNAME, and MAIL_PASSWORD in Render.'
    });
  }
  const transporter = createMailTransporter();
  try {
    await transporter.verify();
    if (req.body && req.body.sendTest) {
      await transporter.sendMail({
        from: `"White Swan Holidays" <${MAIL_USERNAME}>`,
        to: MAIL_USERNAME,
        subject: 'SMTP Verification Test — White Swan Holidays',
        text: 'Your Render SMTP configuration for info@whiteswanholidays.in is working properly.'
      });
    }
    return res.json({
      ok: true,
      host: MAIL_HOST,
      port: MAIL_PORT,
      username: MAIL_USERNAME
    });
  } catch (err) {
    return res.status(502).json({
      error: err && err.message ? err.message : 'SMTP verification failed.'
    });
  }
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
