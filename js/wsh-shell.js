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

  function injectNavbarAndDrawer() {
    const mount = document.getElementById('wsh-header-mount');
    if (!mount) return;
    const active = getActivePage();

    const navItems = [
      { href: 'index.html', label: 'Home' },
      { href: 'domestic.html', label: 'Domestic India' },
      { href: 'international.html', label: 'International' },
      { href: 'ai-planner.html', label: 'AI Planner' },
      { href: 'services.html', label: 'Services' },
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
          <div style="display:flex;align-items:center;justify-content:space-between;padding-bottom:14px;border-bottom:var(--border-subtle)">
            <img src="img/white_swan_logo.png" alt="White Swan Holidays" style="height:38px;width:auto">
            <button type="button" id="wshDrawerClose" aria-label="Close menu" style="width:44px;height:44px;border-radius:12px;background:var(--bg-ivory);border:var(--border-subtle);font-size:1.5rem;display:flex;align-items:center;justify-content:center;color:var(--ink-navy)">
              &times;
            </button>
          </div>
          <nav class="wsh-drawer-links">
            ${drawerLinksHtml}
          </nav>
          <div style="margin-top:auto;display:grid;gap:0.65rem">
            <a href="inquiry.html" class="btn btn-marigold" style="width:100%">Get Custom Quote</a>
            <a href="https://wa.me/919876543210?text=${encodeURIComponent('Namaste White Swan Holidays! I would like to plan a holiday from Ahmedabad.')}" target="_blank" rel="noopener" class="btn btn-whatsapp" style="width:100%">
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
              </div>

              <div>
                <h4>Explore Tours</h4>
                <ul>
                  <li><a href="domestic.html">Domestic India Tours</a></li>
                  <li><a href="international.html">International Holidays</a></li>
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
                  <a href="tel:+919876543210" style="color:#F59E0B;font-weight:700">+91 98765 43210</a>
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
      wa.href = `https://wa.me/919876543210?text=${encodeURIComponent('Namaste White Swan Holidays! I would like to chat with the Ahmedabad Travel Desk.')}`;
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
    const inquiryURL = `inquiry.html?ref=${encodeURIComponent(pkg.refCode)}&type=${encodeURIComponent(pkg.category)}&package=${encodeURIComponent(pkg.title)}`;
    const detailURL = `package.html?slug=${encodeURIComponent(pkg.slug)}`;
    const waURL = store.buildPackageWhatsAppURL(pkg);
    const catBadge = pkg.category === 'Domestic'
      ? `<span class="wsh-badge badge-amber">Domestic India</span>`
      : `<span class="wsh-badge badge-sky">${pkg.visaType || 'International'}</span>`;

    return `
      <article class="wsh-card pkg-card">
        <div class="pkg-card-media">
          <img src="${pkg.image}" alt="${pkg.title}" loading="lazy">
          <div style="position:absolute;top:12px;left:12px;display:flex;gap:0.4rem;flex-wrap:wrap">
            ${catBadge}
          </div>
          <div style="position:absolute;bottom:12px;right:12px">
            <span class="ref-code-pill" style="background:rgba(255,255,255,0.92);backdrop-filter:blur(8px)">${pkg.refCode}</span>
          </div>
        </div>

        <div class="pkg-card-body">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:0.5rem;margin-bottom:0.45rem;font-size:0.8rem;font-weight:600;color:var(--ink-muted)">
            <span>${pkg.duration}</span>
            <span>${pkg.style || pkg.region}</span>
          </div>

          <h3 style="margin-bottom:0.4rem;font-size:1.25rem">
            <a href="${detailURL}">${pkg.title}</a>
          </h3>

          <p style="font-size:0.86rem;color:var(--ink-slate);margin-bottom:0.85rem;line-height:1.5;flex:1">
            ${pkg.destination}
          </p>

          ${pkg.category === 'International' && pkg.flightInfo ? `
            <div style="font-size:0.78rem;color:#0369A1;background:var(--tint-mint);padding:0.45rem 0.7rem;border-radius:10px;margin-bottom:0.85rem;font-weight:600">
              ✈ ${pkg.flightInfo}
            </div>
          ` : ''}

          <div style="display:flex;align-items:baseline;justify-content:space-between;border-top:var(--border-subtle);padding-top:0.85rem">
            <div>
              <span style="font-size:0.72rem;text-transform:uppercase;letter-spacing:0.06em;color:var(--ink-muted);display:block;font-weight:700">Starting From</span>
              <span class="tabular-nums" style="font-size:1.35rem;font-weight:800;color:var(--ink-navy)">${store.formatINR(pkg.price)}</span>
              <span style="font-size:0.76rem;color:var(--ink-muted)">/ person</span>
            </div>
            <span class="ref-code-pill">${pkg.refCode}</span>
          </div>

          <div class="pkg-card-actions">
            <a href="${detailURL}" class="btn btn-outline btn-sm">View Details</a>
            <a href="${inquiryURL}" class="btn btn-marigold btn-sm">Inquire Now</a>
            <a href="${waURL}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-sm btn-wa-full">
              WhatsApp Quote
            </a>
          </div>
        </div>
      </article>
    `;
  }

  document.addEventListener('DOMContentLoaded', () => {
    injectNavbarAndDrawer();
    injectFooterAndWhatsApp();
  });

  window.WSHShell = {
    renderPackageCard,
    showToast
  };
})();
