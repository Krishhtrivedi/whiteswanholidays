/**
 * White Swan Holidays — Shared Navigation Shell, Mobile Drawer,
 * Floating WhatsApp Concierge & Package Card Renderer
 */

(function () {
  'use strict';

  function getActivePage() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    return path.toLowerCase();
  }

  function getThemeIconSvg(theme) {
    if (theme === 'dark') {
      // Sun icon to switch to Light Mode
      return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>`;
    }
    // Moon icon to switch to Dark Mode
    return `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>`;
  }

  function syncThemeButtons() {
    const theme = window.WSHStore ? window.WSHStore.getTheme() : 'light';
    const icon = getThemeIconSvg(theme);
    const label = theme === 'dark' ? 'Switch to Warm Swan Light Mode' : 'Switch to Velvet Obsidian Dark Mode';
    document.querySelectorAll('.js-wsh-theme-toggle').forEach(btn => {
      btn.innerHTML = icon;
      btn.setAttribute('aria-label', label);
      btn.setAttribute('title', label);
    });
  }

  function injectNavbarAndDrawer() {
    const mount = document.getElementById('wsh-header-mount');
    if (!mount) return;
    const active = getActivePage();

    const navItems = [
      { href: 'index.html', label: 'Home' },
      { href: 'packages.html', label: 'All Packages' },
      { href: 'domestic.html', label: 'Domestic India' },
      { href: 'international.html', label: 'International' },
      { href: 'customize.html', label: 'Custom Itinerary' },
      { href: 'events.html', label: 'Trips & Events' },
      { href: 'ai-planner.html', label: 'AI Planner' },
      { href: 'contact.html', label: 'Contact' }
    ];

    const linksHtml = navItems.map(item => {
      const isActive = active === item.href || (active === '' && item.href === 'index.html');
      return `<li><a href="${item.href}" class="${isActive ? 'active' : ''}">${item.label}</a></li>`;
    }).join('');

    const drawerLinksHtml = [
      ...navItems,
      { href: 'inquiry.html', label: 'Inquire & Custom Quote' },
      { href: 'admin.html', label: 'Admin Panel' }
    ].map(item => {
      const isActive = active === item.href;
      return `<a href="${item.href}" class="${isActive ? 'active' : ''}"><span>${item.label}</span><span>&rarr;</span></a>`;
    }).join('');

    mount.innerHTML = `
      <header class="wsh-navbar">
        <div class="wsh-wrap wsh-nav-inner">
          <a href="index.html" class="wsh-logo-link" aria-label="White Swan Holidays Home">
            <img src="img/white_swan_logo.png" alt="White Swan Holidays" width="150" height="44">
          </a>

          <ul class="wsh-nav-links">
            ${linksHtml}
          </ul>

          <div class="wsh-nav-actions">
            <button type="button" class="wsh-theme-btn js-wsh-theme-toggle" aria-label="Toggle Light and Dark Mode" title="Toggle Theme"></button>
            <a href="admin.html" class="btn btn-outline btn-sm wsh-nav-desktop-only" title="Admin Management Panel">
              Admin
            </a>
            <a href="inquiry.html" class="btn btn-marigold btn-sm wsh-nav-desktop-only">
              Inquire Now
            </a>
            <button type="button" class="wsh-hamburger" id="wshDrawerOpen" aria-label="Open navigation menu">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div class="wsh-mobile-drawer" id="wshMobileDrawer" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
        <div class="wsh-drawer-backdrop" id="wshDrawerBackdrop"></div>
        <div class="wsh-drawer-panel">
          <div style="display:flex;align-items:center;justify-content:space-between;padding-bottom:14px;border-bottom:1px solid var(--border-subtle)">
            <a href="index.html" class="wsh-logo-link"><img src="img/white_swan_logo.png" alt="White Swan Holidays" style="height:36px;width:auto"></a>
            <div style="display:flex;align-items:center;gap:0.45rem">
              <button type="button" class="wsh-theme-btn js-wsh-theme-toggle" aria-label="Toggle Theme"></button>
              <button type="button" id="wshDrawerClose" aria-label="Close menu" style="width:44px;height:44px;border-radius:12px;background:var(--bg-ivory);border:1px solid var(--border-subtle);font-size:1.5rem;display:flex;align-items:center;justify-content:center;color:var(--ink-navy)">
                &times;
              </button>
            </div>
          </div>
          <nav class="wsh-drawer-links">
            ${drawerLinksHtml}
          </nav>
          <div style="margin-top:auto;display:grid;gap:0.65rem">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem">
              <a href="https://www.instagram.com/whiteswanholidays/?hl=en" target="_blank" rel="noopener" class="btn btn-outline btn-sm" style="width:100%">Instagram</a>
              <a href="https://www.facebook.com/profile.php?id=61579766578124" target="_blank" rel="noopener" class="btn btn-outline btn-sm" style="width:100%">Facebook</a>
            </div>
            <a href="inquiry.html" class="btn btn-marigold" style="width:100%">Get Custom Quote</a>
            <a href="https://wa.me/919925811770?text=${encodeURIComponent('Namaste White Swan Holidays! I would like to plan a holiday from Ahmedabad.')}" target="_blank" rel="noopener" class="btn btn-whatsapp" style="width:100%">
              WhatsApp Ahmedabad Desk
            </a>
          </div>
        </div>
      </div>
    `;

    const drawer = document.getElementById('wshMobileDrawer');
    const openBtn = document.getElementById('wshDrawerOpen');
    const closeBtn = document.getElementById('wshDrawerClose');
    const backdrop = document.getElementById('wshDrawerBackdrop');

    function openDrawer() {
      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.classList.add('drawer-open');
    }

    function closeDrawer() {
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('drawer-open');
    }

    if (openBtn) openBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (backdrop) backdrop.addEventListener('click', closeDrawer);
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
    });
  }

  function injectFooterAndWhatsApp() {
    const footerMount = document.getElementById('wsh-footer-mount');
    if (footerMount) {
      footerMount.innerHTML = `
        <footer class="wsh-footer">
          <div class="wsh-wrap">
            <div class="wsh-footer-grid">
              <div>
                <div style="display:inline-block;background:#FFFFFF;padding:0.5rem 0.9rem;border-radius:14px;margin-bottom:1rem">
                  <img src="img/white_swan_logo.png" alt="White Swan Holidays" style="height:40px;width:auto">
                </div>
                <p style="color:#94A3B8;font-size:0.9rem;max-width:340px;line-height:1.65">
                  White Swan Holidays Pvt Ltd — Premier bespoke travel &amp; holiday agency off CG Road, Ahmedabad. Crafting Domestic India &amp; International journeys since 2017.
                </p>
                <div style="display:flex;gap:0.55rem;flex-wrap:wrap;margin-top:0.75rem">
                  <a href="https://www.instagram.com/whiteswanholidays/?hl=en" target="_blank" rel="noopener" class="wsh-badge badge-lavender" style="text-decoration:none">Instagram @whiteswanholidays</a>
                  <a href="https://www.facebook.com/profile.php?id=61579766578124" target="_blank" rel="noopener" class="wsh-badge badge-sky" style="text-decoration:none">Facebook Page</a>
                </div>
              </div>

              <div>
                <h4>Explore Tours</h4>
                <ul>
                  <li><a href="domestic.html">Domestic India Tours</a></li>
                  <li><a href="international.html">International Holidays</a></li>
                  <li><a href="customize.html">Custom Itinerary Builder</a></li>
                  <li><a href="events.html">Trips &amp; Events Gallery</a></li>
                  <li><a href="ai-planner.html">AI Trip Planner</a></li>
                  <li><a href="inquiry.html">Custom Quote &amp; Inquiry</a></li>
                </ul>
              </div>

              <div>
                <h4>Specialist Services</h4>
                <ul>
                  <li><a href="services.html">Visa &amp; Air Tickets</a></li>
                  <li><a href="services.html#mice">Corporate MICE</a></li>
                  <li><a href="services.html#cruises">Luxury Cruises</a></li>
                  <li><a href="services.html#weddings">Destination Weddings</a></li>
                  <li><a href="admin.html">Admin Panel</a></li>
                </ul>
              </div>

              <div>
                <h4>Ahmedabad Head Office</h4>
                <p style="color:#94A3B8;font-size:0.88rem;line-height:1.6">
                  501, Sun Square Building,<br>
                  Off CG Road, Ahmedabad - 380009<br>
                  Gujarat, India<br>
                  <a href="tel:+919925811770" style="color:#F59E0B;font-weight:700">+91 99258 11770</a><br>
                  <a href="tel:+919099041625" style="color:#F59E0B;font-weight:700">+91 90990 41625</a>
                </p>
                <a href="contact.html" class="btn btn-outline btn-sm" style="margin-top:0.5rem;background:rgba(255,255,255,0.08);color:#FFFFFF !important;border-color:rgba(255,255,255,0.2)">
                  Office &amp; Map
                </a>
              </div>
            </div>

            <div style="border-top:1px solid rgba(255,255,255,0.1);padding-top:1.5rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;font-size:0.82rem;color:#64748B">
              <span>&copy; ${new Date().getFullYear()} White Swan Holidays Pvt Ltd. All rights reserved.</span>
              <span>Off CG Road, Ahmedabad &bull; 24x7 Traveler Concierge</span>
            </div>
          </div>
        </footer>
      `;
    }

    // Floating WhatsApp Concierge Button
    if (!document.querySelector('.wsh-floating-wa')) {
      const wa = document.createElement('a');
      wa.className = 'wsh-floating-wa';
      wa.href = `https://wa.me/919925811770?text=${encodeURIComponent('Namaste White Swan Holidays! I would like to chat with the Ahmedabad Travel Desk.')}`;
      wa.target = '_blank';
      wa.rel = 'noopener';
      wa.setAttribute('aria-label', 'Chat with Ahmedabad Desk on WhatsApp');
      wa.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 2c-5.516 0-9.969 4.453-9.969 9.969 0 1.766.453 3.484 1.328 5l-1.39 5.078 5.203-1.359c1.469.797 3.125 1.234 4.828 1.234 5.516 0 9.969-4.453 9.969-9.969S17.547 2 12.031 2zm5.813 14.125c-.25.703-1.438 1.344-2 1.422-.516.078-1.188.109-1.922-.125-.453-.141-1.031-.328-1.766-.656-3.094-1.344-5.109-4.469-5.266-4.672-.156-.203-1.266-1.672-1.266-3.188s.797-2.266 1.078-2.578c.281-.313.609-.391.813-.391.203 0 .406 0 .578.016.188.016.438-.078.688.516.25.609.859 2.094.938 2.25.078.156.125.344.016.547-.109.203-.156.344-.313.516-.156.172-.328.391-.469.531-.156.156-.328.328-.141.656.188.328.844 1.391 1.813 2.25 1.25 1.109 2.297 1.453 2.625 1.609.328.156.516.125.703-.094.188-.219.813-.953 1.031-1.281.219-.328.438-.266.734-.156.297.109 1.891.891 2.219 1.047.328.156.547.234.625.375.078.141.078.813-.172 1.516z"/>
        </svg>
        <span>Chat with Ahmedabad Desk</span>
      `;
      document.body.appendChild(wa);
    }
  }

  function showToast(msg) {
    let toast = document.getElementById('wshGlobalToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'wshGlobalToast';
      toast.className = 'wsh-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3200);
  }

  function renderPackageCard(pkg) {
    const store = window.WSHStore;
    const detailURL = `package.html?slug=${encodeURIComponent(pkg.slug)}`;
    const customizeURL = `customize.html?pkg=${encodeURIComponent(pkg.refCode)}`;
    const waURL = store.buildPackageWhatsAppURL(pkg);
    const emailURL = store.buildPackageEmailURL(pkg);
    const catBadge = pkg.category === 'Domestic'
      ? `<span class="wsh-badge badge-amber">Domestic India</span>`
      : `<span class="wsh-badge badge-sky">${pkg.visaType || 'International'}</span>`;

    return `
      <article class="wsh-card pkg-card">
        <div class="pkg-card-media">
          <img src="${pkg.image}" alt="${pkg.title}" loading="lazy" onerror="this.onerror=null;this.src='img/tours/dubai.jpg';">
          <div style="position:absolute;top:12px;left:12px;display:flex;gap:0.4rem;flex-wrap:wrap">
            ${catBadge}
          </div>
          <div style="position:absolute;bottom:12px;right:12px">
            <span class="ref-code-pill" style="background:var(--glass-white);backdrop-filter:blur(8px)">${pkg.refCode}</span>
          </div>
        </div>

        <div class="pkg-card-body">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:0.5rem;margin-bottom:0.5rem;flex-wrap:wrap">
            <span class="wsh-badge badge-sky">${pkg.duration}</span>
            <span style="font-size:0.78rem;font-weight:600;color:var(--text-secondary)">${pkg.style || pkg.region}</span>
          </div>

          <h3 style="margin-bottom:0.4rem;font-size:1.25rem">
            <a href="${detailURL}">${pkg.title}</a>
          </h3>

          <p style="font-size:0.86rem;color:var(--ink-slate);margin-bottom:0.85rem;line-height:1.5;flex:1">
            ${pkg.destination}
          </p>

          ${pkg.category === 'International' && pkg.flightInfo ? `
            <div style="font-size:0.78rem;color:var(--accent-sky-text);background:var(--tint-mint);padding:0.45rem 0.7rem;border-radius:10px;margin-bottom:0.85rem;font-weight:600">
              ✈ ${pkg.flightInfo}
            </div>
          ` : ''}

          <div style="display:flex;align-items:center;justify-content:space-between;gap:0.5rem;flex-wrap:wrap;border-top:1px solid var(--border-subtle);padding-top:0.85rem">
            <span class="wsh-badge badge-emerald">Tailored Quote Available</span>
            <span class="ref-code-pill">${pkg.refCode}</span>
          </div>

          <div class="pkg-card-actions">
            <a href="${waURL}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-sm btn-wa-top">
              Get Quote on WhatsApp
            </a>
            <a href="${emailURL}" class="btn btn-sky btn-sm" title="Email info@whiteswanholidays.in">
              Email Quote
            </a>
            <a href="${customizeURL}" class="btn btn-marigold btn-sm">
              Customize
            </a>
            <a href="${detailURL}" class="btn btn-outline btn-sm btn-wa-top">
              View Details &rarr;
            </a>
          </div>
        </div>
      </article>
    `;
  }

  function openWhatsAppChooser(originalUrl) {
    let encodedText = '';
    try {
      const u = new URL(originalUrl);
      const rawText = u.searchParams.get('text') || '';
      encodedText = encodeURIComponent(rawText);
    } catch (err) {
      const idx = originalUrl.indexOf('text=');
      encodedText = idx >= 0 ? originalUrl.slice(idx + 5) : '';
    }

    const url1 = `https://wa.me/919925811770${encodedText ? `?text=${encodedText}` : ''}`;
    const url2 = `https://wa.me/919099041625${encodedText ? `?text=${encodedText}` : ''}`;

    let modal = document.getElementById('wshWaChooserModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'wshWaChooserModal';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-label', 'Select WhatsApp Number');
      modal.style.cssText = 'position:fixed;inset:0;z-index:2000;background:var(--backdrop-scrim);backdrop-filter:blur(6px);display:none;align-items:center;justify-content:center;padding:1rem;';
      modal.innerHTML = `
        <div class="wsh-card" style="width:min(420px, 100%);padding:1.6rem;position:relative;box-shadow:var(--shadow-lg);background:var(--bg-elevated)">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.6rem">
            <span class="wsh-badge badge-emerald">WHATSAPP CONCIERGE</span>
            <button type="button" id="wshWaCloseBtn" aria-label="Close" style="width:40px;height:40px;border-radius:10px;background:var(--bg-ivory);border:1px solid var(--border-subtle);color:var(--ink-navy);font-size:1.35rem;display:flex;align-items:center;justify-content:center">&times;</button>
          </div>
          <h3 style="margin-bottom:0.35rem">Choose WhatsApp Desk</h3>
          <p style="font-size:0.88rem;margin-bottom:1.25rem">Select which White Swan Holidays Ahmedabad number to send your message to:</p>
          <div style="display:grid;gap:0.7rem">
            <a id="wshWaOpt1" href="#" target="_blank" rel="noopener" class="btn btn-whatsapp" style="width:100%;justify-content:space-between;padding:0.8rem 1.2rem">
              <span>Desk 1 &bull; +91 99258 11770</span>
              <span>&rarr;</span>
            </a>
            <a id="wshWaOpt2" href="#" target="_blank" rel="noopener" class="btn btn-whatsapp" style="width:100%;justify-content:space-between;padding:0.8rem 1.2rem">
              <span>Desk 2 &bull; +91 90990 41625</span>
              <span>&rarr;</span>
            </a>
            <button type="button" id="wshWaOptBoth" class="btn btn-outline" style="width:100%">
              Send to Both Numbers
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      const closeModal = () => { modal.style.display = 'none'; };
      modal.querySelector('#wshWaCloseBtn').addEventListener('click', closeModal);
      modal.addEventListener('click', e => {
        if (e.target === modal || e.target.closest('#wshWaOpt1') || e.target.closest('#wshWaOpt2')) {
          setTimeout(closeModal, 120);
        }
      });
      window.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal.style.display === 'flex') closeModal();
      });
    }

    const opt1 = modal.querySelector('#wshWaOpt1');
    const opt2 = modal.querySelector('#wshWaOpt2');
    const optBoth = modal.querySelector('#wshWaOptBoth');
    opt1.href = url1;
    opt2.href = url2;
    optBoth.onclick = () => {
      window.open(url1, '_blank', 'noopener');
      setTimeout(() => window.open(url2, '_blank', 'noopener'), 350);
      modal.style.display = 'none';
    };

    modal.style.display = 'flex';
  }

  function initScrollReveals() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    if (!('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    function scanTargets() {
      document.querySelectorAll('section h2, .wsh-slider-shell').forEach(el => {
        if (!el.classList.contains('wsh-reveal') && !el.closest('.sunlit-hero')) {
          el.classList.add('wsh-reveal');
          io.observe(el);
        }
      });

      document.querySelectorAll('.wsh-pkg-grid, .wsh-bento-grid, #eventsGalleryGrid').forEach(grid => {
        Array.from(grid.children).forEach((card, idx) => {
          if (!card.classList.contains('wsh-reveal')) {
            card.style.setProperty('--reveal-delay', `${(idx % 3) * 80}ms`);
            card.classList.add('wsh-reveal');
            io.observe(card);
          }
        });
      });
    }

    scanTargets();

    const mo = new MutationObserver(() => scanTargets());
    document.querySelectorAll('.wsh-pkg-grid, .wsh-bento-grid, #eventsGalleryGrid').forEach(grid => {
      mo.observe(grid, { childList: true });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    injectNavbarAndDrawer();
    injectFooterAndWhatsApp();
    syncThemeButtons();
    initScrollReveals();
  });

  document.addEventListener('click', e => {
    const btn = e.target.closest('.js-wsh-theme-toggle');
    if (btn && window.WSHStore) {
      document.documentElement.classList.add('wsh-theme-animating');
      const next = window.WSHStore.toggleTheme();
      syncThemeButtons();
      setTimeout(() => document.documentElement.classList.remove('wsh-theme-animating'), 320);
      showToast(next === 'dark' ? 'Velvet Obsidian Dark Mode enabled' : 'Warm Swan Beige Light Mode enabled');
      return;
    }

    // Intercept all desk WhatsApp links (excluding links inside the chooser modal itself)
    const waLink = e.target.closest('a[href*="wa.me/919925811770"], a[href*="wa.me/919099041625"]');
    if (waLink && !waLink.closest('#wshWaChooserModal')) {
      e.preventDefault();
      openWhatsAppChooser(waLink.href);
    }
  });

  function getEmbedVideoUrl(url) {
    if (!url) return null;
    const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{6,})/);
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1`;
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
    return null;
  }

  function getInstagramEmbedUrl(url) {
    if (!url) return null;
    const igMatch = url.match(/instagram\.com\/(p|reel)\/([a-zA-Z0-9_-]+)/);
    if (igMatch) return `https://www.instagram.com/${igMatch[1]}/${igMatch[2]}/embed`;
    return null;
  }

  let isLightboxOpen = false;

  function openEventLightbox(ev) {
    if (!ev) return;
    isLightboxOpen = true;
    let lb = document.getElementById('wshEventLightbox');
    if (!lb) {
      lb = document.createElement('div');
      lb.id = 'wshEventLightbox';
      lb.setAttribute('role', 'dialog');
      lb.setAttribute('aria-modal', 'true');
      lb.style.cssText = 'position:fixed;inset:0;z-index:2100;background:rgba(13,7,26,0.88);backdrop-filter:blur(10px);display:none;align-items:center;justify-content:center;padding:1rem;';
      lb.innerHTML = `
        <div class="wsh-card" style="width:min(880px, 100%);max-height:92vh;overflow-y:auto;padding:0;box-shadow:var(--shadow-lg)">
          <div id="wshLbMedia" style="position:relative;background:#000;aspect-ratio:16/9;max-height:60vh;display:flex;align-items:center;justify-content:center;overflow:hidden"></div>
          <div style="padding:1.4rem 1.6rem">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.5rem">
              <div style="display:flex;gap:0.5rem;align-items:center;flex-wrap:wrap">
                <span id="wshLbBadge" class="wsh-badge badge-amber"></span>
                <span id="wshLbLoc" style="font-size:0.82rem;font-weight:600;color:var(--ink-muted)"></span>
              </div>
              <button type="button" id="wshLbCloseBtn" class="btn btn-outline btn-sm">&times; Close</button>
            </div>
            <h3 id="wshLbTitle" style="margin-bottom:0.4rem"></h3>
            <p id="wshLbCaption" style="font-size:0.94rem;margin-bottom:1.15rem"></p>
            <div style="display:flex;gap:0.75rem;flex-wrap:wrap">
              <a id="wshLbPlanBtn" href="inquiry.html" class="btn btn-marigold">Plan a Similar Trip / Event &rarr;</a>
              <a id="wshLbInstaBtn" href="https://www.instagram.com/whiteswanholidays/?hl=en" target="_blank" rel="noopener" class="btn btn-outline">View Original on Instagram (@whiteswanholidays)</a>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(lb);

      const closeLb = () => {
        lb.style.display = 'none';
        lb.querySelector('#wshLbMedia').innerHTML = '';
        isLightboxOpen = false;
      };
      lb.querySelector('#wshLbCloseBtn').addEventListener('click', closeLb);
      lb.addEventListener('click', e => {
        if (e.target === lb) closeLb();
      });
      window.addEventListener('keydown', e => {
        if (e.key === 'Escape' && lb.style.display === 'flex') closeLb();
      });
    }

    const mediaBox = lb.querySelector('#wshLbMedia');
    const igEmbed = getInstagramEmbedUrl(ev.instagramUrl || ev.mediaUrl);
    if (ev.mediaFormat === 'Instagram' && igEmbed) {
      mediaBox.innerHTML = `<iframe src="${igEmbed}" style="width:100%;height:100%;border:0;background:#fff" allowfullscreen></iframe>`;
    } else if (ev.mediaFormat === 'Video') {
      const embed = getEmbedVideoUrl(ev.mediaUrl);
      if (embed) {
        mediaBox.innerHTML = `<iframe src="${embed}" style="width:100%;height:100%;border:0" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
      } else {
        mediaBox.innerHTML = `<video src="${ev.mediaUrl}" poster="${ev.posterUrl || ''}" controls autoplay playsinline style="width:100%;height:100%;object-fit:contain"></video>`;
      }
    } else {
      mediaBox.innerHTML = `<img src="${ev.mediaUrl || ev.posterUrl}" alt="${ev.title}" style="width:100%;height:100%;object-fit:contain">`;
    }

    const isEvent = ev.entryType === 'Organized Event';
    const badge = lb.querySelector('#wshLbBadge');
    badge.className = `wsh-badge ${ev.mediaFormat === 'Instagram' ? 'badge-lavender' : isEvent ? 'badge-sky' : 'badge-amber'}`;
    badge.textContent = ev.mediaFormat === 'Instagram' ? 'Instagram Highlight' : isEvent ? 'Organized Event' : 'Trip Memory';
    lb.querySelector('#wshLbLoc').textContent = ev.locationDate || '';
    lb.querySelector('#wshLbTitle').textContent = ev.title;
    lb.querySelector('#wshLbCaption').textContent = ev.caption || '';

    const instaHref = ev.instagramUrl || (window.WSHStore && window.WSHStore.INSTAGRAM_URL) || 'https://www.instagram.com/whiteswanholidays/?hl=en';
    lb.querySelector('#wshLbInstaBtn').href = instaHref;

    const inqType = isEvent ? 'Corporate Event / MICE' : 'Both / Custom';
    lb.querySelector('#wshLbPlanBtn').href = `inquiry.html?type=${encodeURIComponent(inqType)}&package=${encodeURIComponent(ev.title)}&notes=${encodeURIComponent('Inspired by: ' + ev.title + ' (' + (ev.locationDate || '') + ')')}`;

    lb.style.display = 'flex';
  }

  function initEventAutoSlider(containerId, items) {
    const root = document.getElementById(containerId);
    if (!root) return;
    if (!items || !items.length) {
      root.innerHTML = `<div class="wsh-card" style="padding:2.5rem;text-align:center"><p style="margin:0">No trip or event highlights added yet.</p></div>`;
      return;
    }

    let currentIdx = 0;
    let isHovered = false;
    let progress = 0;
    const INTERVAL_MS = 4000;
    const TICK_MS = 50;

    root.innerHTML = `
      <div class="wsh-slider-shell" id="${containerId}_shell">
        ${items.map((ev, idx) => {
          const thumb = (ev.mediaFormat === 'Video' || ev.mediaFormat === 'Instagram') ? (ev.posterUrl || ev.mediaUrl || 'img/tours/dubai.jpg') : ev.mediaUrl;
          const isEvent = ev.entryType === 'Organized Event';
          const isVideoOrReel = ev.mediaFormat === 'Video' || ev.mediaFormat === 'Instagram';
          return `
            <div class="wsh-slide-item ${idx === 0 ? 'active' : ''}" data-idx="${idx}">
              <img src="${thumb}" alt="${ev.title}">
              <div class="wsh-slide-scrim"></div>
              ${isVideoOrReel ? `
                <div class="wsh-video-play-badge" title="Play Video / Reel">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"></polygon></svg>
                </div>
              ` : ''}
              <div class="wsh-slide-caption">
                <div style="display:flex;gap:0.45rem;flex-wrap:wrap;align-items:center">
                  <span class="wsh-badge ${ev.mediaFormat === 'Instagram' ? 'badge-lavender' : isEvent ? 'badge-sky' : 'badge-amber'}">${ev.mediaFormat === 'Instagram' ? 'Instagram Highlight' : isEvent ? 'Organized Event' : 'Trip Memory'}</span>
                  <span class="wsh-badge badge-slate" style="background:rgba(255,255,255,0.18);color:#FFFFFF;border:none">${ev.mediaFormat === 'Video' ? 'VIDEO / REEL' : ev.mediaFormat.toUpperCase()}</span>
                  <span style="font-size:0.8rem;color:#E9D5FF;font-weight:600">${ev.locationDate || ''}</span>
                </div>
                <h3>${ev.title}</h3>
                <p>${ev.caption || ''}</p>
              </div>
            </div>
          `;
        }).join('')}

        <button type="button" class="wsh-slider-arrow wsh-slider-prev" aria-label="Previous slide">&lsaquo;</button>
        <button type="button" class="wsh-slider-arrow wsh-slider-next" aria-label="Next slide">&rsaquo;</button>
        <div class="wsh-slider-dots">
          ${items.map((_, i) => `<button type="button" class="wsh-slider-dot ${i === 0 ? 'active' : ''}" data-dot="${i}" aria-label="Slide ${i + 1}"></button>`).join('')}
        </div>
        <div class="wsh-slider-progress" id="${containerId}_progress"></div>
      </div>
    `;

    const shell = root.querySelector('.wsh-slider-shell');
    const slides = root.querySelectorAll('.wsh-slide-item');
    const dots = root.querySelectorAll('.wsh-slider-dot');
    const bar = root.querySelector(`#${containerId}_progress`);

    function goTo(idx) {
      currentIdx = (idx + items.length) % items.length;
      slides.forEach((s, i) => s.classList.toggle('active', i === currentIdx));
      dots.forEach((d, i) => d.classList.toggle('active', i === currentIdx));
      progress = 0;
      if (bar) bar.style.width = '0%';
    }

    root.querySelector('.wsh-slider-prev').addEventListener('click', e => { e.stopPropagation(); goTo(currentIdx - 1); });
    root.querySelector('.wsh-slider-next').addEventListener('click', e => { e.stopPropagation(); goTo(currentIdx + 1); });
    dots.forEach(d => d.addEventListener('click', e => { e.stopPropagation(); goTo(Number(d.dataset.dot)); }));
    slides.forEach(s => s.addEventListener('click', () => openEventLightbox(items[Number(s.dataset.idx)])));

    shell.addEventListener('mouseenter', () => { isHovered = true; });
    shell.addEventListener('mouseleave', () => { isHovered = false; });

    // Mobile Swipe Support
    let touchStartX = 0;
    shell.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
    shell.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        goTo(diff > 0 ? currentIdx + 1 : currentIdx - 1);
      }
    }, { passive: true });

    if (root._wshTimer) clearInterval(root._wshTimer);
    root._wshTimer = setInterval(() => {
      if (isHovered || isLightboxOpen || items.length <= 1) return;
      progress += (TICK_MS / INTERVAL_MS) * 100;
      if (progress >= 100) {
        goTo(currentIdx + 1);
      } else if (bar) {
        bar.style.width = `${progress}%`;
      }
    }, TICK_MS);
  }

  window.WSHShell = {
    renderPackageCard,
    showToast,
    syncThemeButtons,
    openWhatsAppChooser,
    initEventAutoSlider,
    openEventLightbox
  };
})();
