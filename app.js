/* ==========================================================================
   MENTOR BUSINESS CONSULTING - HEAVY FREIGHT LOGISTICS JAVASCRIPT LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initRouteExplorer();
  initFleetFilter();
  initFreightEstimator();
  initTrackingSimulator();
  initContactForm();
  initCounterAnimations();
});

/* 1. Navbar Scroll Effect & Mobile Menu */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '85px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = '#0b1329';
        navLinks.style.padding = '2rem';
        navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
      }
    });
  }
}

/* 2. Route Explorer Tabs */
const routeData = {
  drc: {
    title: "Democratic Republic of Congo (DRC) Highway Line",
    transit: "5 - 7 Days Transit",
    description: "Specialized heavy haulage line extending from Cape Town & Johannesburg directly to Lubumbashi, Kolwezi, Likasi & Kinshasa. Transporting heavy mining equipment, industrial machinery, and containerized goods through Beitbridge, Chirundu, and Kasumbalesa border posts.",
    borders: ["Beitbridge (SA/ZIM)", "Chirundu (ZIM/ZAM)", "Kasumbalesa (ZAM/DRC)"],
    cargoTypes: "Mining Machinery, Heavy Plant Equipment, Chemicals, Manufactured Goods"
  },
  sadc: {
    title: "SADC Regional Corridor (Zambia, Zimbabwe, Botswana, Mozambique)",
    transit: "2 - 4 Days Transit",
    description: "Daily scheduled heavy freight runs connecting South Africa's industrial centers (Cape Town, Durban, Joburg) with Gaborone, Harare, Lusaka, Ndola, Windhoek, and Maputo.",
    borders: ["Ramatlabama (SA/BOT)", "Lebombo (SA/MOZ)", "Pioneer Gate (SA/BOT)", "Beitbridge (SA/ZIM)"],
    cargoTypes: "FMCG, Steel, Agricultural Machinery, Construction Materials"
  },
  domestic: {
    title: "South Africa Interstate Express Freight",
    transit: "24 - 48 Hours Transit",
    description: "High-frequency long-haul routes linking Western Cape (Cape Town Depot, Ottery), Gauteng (Johannesburg Hub), KwaZulu-Natal (Durban Port), and Limpopo (Musina border gateway).",
    borders: ["Interstate Toll Corridors (N1, N3, N4, N7)"],
    cargoTypes: "Superlink Bulk Freight, Retail Distribution, Heavy Container Transport"
  }
};

function initRouteExplorer() {
  const routeButtons = document.querySelectorAll('.route-tab-btn');
  const titleEl = document.getElementById('route-title');
  const transitEl = document.getElementById('route-transit');
  const descEl = document.getElementById('route-desc');
  const bordersEl = document.getElementById('route-borders');
  const cargoEl = document.getElementById('route-cargo');

  routeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      routeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const routeKey = btn.dataset.route;
      const data = routeData[routeKey];

      if (data) {
        titleEl.textContent = data.title;
        transitEl.textContent = data.transit;
        descEl.textContent = data.description;
        cargoEl.textContent = data.cargoTypes;

        bordersEl.innerHTML = data.borders.map(border => `<span class="chip"><i class="fas fa-passport"></i> ${border}</span>`).join('');
      }
    });
  });
}

/* 3. Fleet Showcase Filter */
function initFleetFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const fleetCards = document.querySelectorAll('.fleet-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.filter;

      fleetCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* 4. Interactive Freight Rate Estimator */
const routeMatrix = {
  "Cape Town": {
    "Johannesburg": { dist: 1400, days: "2 Days", ratePerTon: 850 },
    "Durban": { dist: 1750, days: "2-3 Days", ratePerTon: 980 },
    "Harare (Zimbabwe)": { dist: 2500, days: "4 Days", ratePerTon: 1650 },
    "Lusaka (Zambia)": { dist: 2950, days: "5 Days", ratePerTon: 1950 },
    "Lubumbashi (DRC)": { dist: 3500, days: "6-7 Days", ratePerTon: 2450 },
    "Gaborone (Botswana)": { dist: 1450, days: "2-3 Days", ratePerTon: 1100 },
    "Maputo (Mozambique)": { dist: 1900, days: "3 Days", ratePerTon: 1400 },
    "Windhoek (Namibia)": { dist: 1480, days: "2-3 Days", ratePerTon: 1250 }
  },
  "Johannesburg": {
    "Cape Town": { dist: 1400, days: "2 Days", ratePerTon: 850 },
    "Durban": { dist: 600, days: "24 Hrs", ratePerTon: 450 },
    "Harare (Zimbabwe)": { dist: 1100, days: "2-3 Days", ratePerTon: 950 },
    "Lusaka (Zambia)": { dist: 1550, days: "3-4 Days", ratePerTon: 1350 },
    "Lubumbashi (DRC)": { dist: 2100, days: "5-6 Days", ratePerTon: 1850 },
    "Gaborone (Botswana)": { dist: 380, days: "24 Hrs", ratePerTon: 480 },
    "Maputo (Mozambique)": { dist: 550, days: "24 Hrs", ratePerTon: 520 },
    "Windhoek (Namibia)": { dist: 1380, days: "2-3 Days", ratePerTon: 1150 }
  },
  "Durban": {
    "Cape Town": { dist: 1750, days: "2-3 Days", ratePerTon: 980 },
    "Johannesburg": { dist: 600, days: "24 Hrs", ratePerTon: 450 },
    "Harare (Zimbabwe)": { dist: 1680, days: "3 Days", ratePerTon: 1250 },
    "Lusaka (Zambia)": { dist: 2130, days: "4-5 Days", ratePerTon: 1650 },
    "Lubumbashi (DRC)": { dist: 2680, days: "6-7 Days", ratePerTon: 2150 }
  }
};

function initFreightEstimator() {
  const originSelect = document.getElementById('est-origin');
  const destSelect = document.getElementById('est-destination');
  const trailerSelect = document.getElementById('est-trailer');
  const weightInput = document.getElementById('est-weight');
  const weightVal = document.getElementById('weight-value');
  const goodsValueSelect = document.getElementById('est-goods-value');

  const resultAmount = document.getElementById('calc-amount');
  const resultDist = document.getElementById('calc-distance');
  const resultTime = document.getElementById('calc-time');
  const resultBorderCost = document.getElementById('calc-border-cost');
  const resultGitCost = document.getElementById('calc-git-cost');
  const resultBorders = document.getElementById('calc-borders');
  const bookBtn = document.getElementById('calc-book-btn');

  if (!originSelect || !destSelect) return;

  function calculateQuote() {
    const origin = originSelect.value;
    const dest = destSelect.value;
    const tons = parseInt(weightInput.value);
    weightVal.textContent = `${tons} Tons`;

    const routeInfo = (routeMatrix[origin] && routeMatrix[origin][dest]) || { dist: 2200, days: "4-5 Days" };
    const distKm = routeInfo.dist;

    // Base Rate: ~R80 per KM for standard 34 Ton trailer
    const baseRatePerKm = 80;
    
    let trailerMultiplier = 1.0;
    if (trailerSelect.value === 'lowbed') trailerMultiplier = 1.35; // Heavy abnormal trailer
    if (trailerSelect.value === 'sdetipper') trailerMultiplier = 1.15; // Bulk side-tipper
    if (trailerSelect.value === 'flatbed') trailerMultiplier = 0.95; // Tri-axle flatbed

    // Weight factor relative to standard 34T load
    const weightFactor = tons / 34;

    // Distance haulage cost calculation
    const distanceCost = distKm * baseRatePerKm * trailerMultiplier * weightFactor;

    // Border clearance fees
    let borderFee = 0;
    let borderCount = "None (Domestic)";

    if (dest.includes("DRC")) {
      borderFee = 6500;
      borderCount = "3 Borders (Beitbridge, Chirundu, Kasumbalesa)";
    } else if (dest.includes("Zambia")) {
      borderFee = 4200;
      borderCount = "2 Borders (Beitbridge, Chirundu)";
    } else if (dest.includes("Zimbabwe")) {
      borderFee = 2500;
      borderCount = "1 Border (Beitbridge)";
    } else if (dest.includes("Botswana")) {
      borderFee = 2200;
      borderCount = "1 Border (Ramatlabama)";
    } else if (dest.includes("Mozambique")) {
      borderFee = 2200;
      borderCount = "1 Border (Lebombo)";
    } else if (dest.includes("Namibia")) {
      borderFee = 2200;
      borderCount = "1 Border (Noordoewer)";
    }

    // Goods declared value factor (Risk & GIT coverage)
    const declaredGoodsValue = goodsValueSelect ? parseInt(goodsValueSelect.value) : 500000;
    const gitValueFee = Math.round(declaredGoodsValue * 0.0035); // 0.35% value coverage factor

    // Total Freight Rate Estimate
    const totalCost = Math.round(distanceCost + borderFee + gitValueFee);

    const fmt = new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 });

    resultAmount.textContent = fmt.format(totalCost);
    resultDist.textContent = `${distKm} KM (~${fmt.format(Math.round(distanceCost))})`;
    resultTime.textContent = routeInfo.days;
    if (resultBorderCost) resultBorderCost.textContent = borderFee > 0 ? fmt.format(borderFee) : "R0 (Domestic)";
    if (resultGitCost) resultGitCost.textContent = fmt.format(gitValueFee);
    resultBorders.textContent = borderCount;
  }

  originSelect.addEventListener('change', calculateQuote);
  destSelect.addEventListener('change', calculateQuote);
  trailerSelect.addEventListener('change', calculateQuote);
  weightInput.addEventListener('input', calculateQuote);
  if (goodsValueSelect) goodsValueSelect.addEventListener('change', calculateQuote);

  calculateQuote();

  if (bookBtn) {
    bookBtn.addEventListener('click', () => {
      const origin = originSelect.value;
      const dest = destSelect.value;
      const tons = weightInput.value;
      const trailer = trailerSelect.options[trailerSelect.selectedIndex].text;
      const goodsValText = goodsValueSelect ? goodsValueSelect.options[goodsValueSelect.selectedIndex].text : "Declared Cargo";
      const quote = resultAmount.textContent;

      const message = `Hello Mentor Business Consulting! I would like to lock in a quote estimate based on R80/km pricing:%0A` +
                      `📍 *Origin:* ${origin}%0A` +
                      `🏁 *Destination:* ${dest}%0A` +
                      `🚛 *Trailer Type:* ${trailer}%0A` +
                      `⚖️ *Weight:* ${tons} Tons%0A` +
                      `💎 *Declared Cargo Value:* ${goodsValText}%0A` +
                      `💰 *Est. Total Rate:* ${quote}%0A%0APlease contact me to finalize border clearance & dispatch.`;
      
      window.open(`https://wa.me/27605150440?text=${message}`, '_blank');
      showToast("Redirecting to Dispatch Team via WhatsApp...");
    });
  }
}

/* 5. Tracking Simulator */
const mockTrackingDB = {
  "MBC-89201": {
    cargo: "Superlink Mining Equipment",
    route: "Cape Town -> Lubumbashi (DRC)",
    progress: "75%",
    steps: [
      { name: "Cape Town Depot (Ottery)", time: "20 Jul - Dispatched", done: true },
      { name: "Johannesburg Transit Hub", time: "21 Jul - Cleared", done: true },
      { name: "Beitbridge Border Clearance", time: "22 Jul - Cleared", done: true },
      { name: "Kasumbalesa Border (DRC)", time: "In Progress (Customs Inspection)", active: true },
      { name: "Lubumbashi Terminal", time: "ETA: 24 Jul 14:00", done: false }
    ]
  },
  "MBC-77412": {
    cargo: "34-Ton Flatbed Construction Steel",
    route: "Durban Port -> Lusaka (Zambia)",
    progress: "50%",
    steps: [
      { name: "Durban Port Terminal", time: "21 Jul - Loaded", done: true },
      { name: "Harare Bypass Corridor", time: "22 Jul - In Transit", done: true },
      { name: "Chirundu Border Control", time: "Active Border Stamp", active: true },
      { name: "Lusaka Industrial Zone", time: "ETA: 24 Jul 09:00", done: false }
    ]
  }
};

function initTrackingSimulator() {
  const trackBtn = document.getElementById('track-btn');
  const trackInput = document.getElementById('track-input');

  if (!trackBtn || !trackInput) return;

  trackBtn.addEventListener('click', () => {
    const code = trackInput.value.trim().toUpperCase();
    if (!code) {
      showToast("Please enter a valid tracking reference number!");
      return;
    }

    const data = mockTrackingDB[code] || {
      cargo: "General Containerized Freight",
      route: `${code} Custom Heavy Route`,
      progress: "60%",
      steps: [
        { name: "Depot Loading", time: "Completed", done: true },
        { name: "En-Route (GPS Satellite Active)", time: "In Transit", done: true },
        { name: "Border Inspection Point", time: "Processing Customs", active: true },
        { name: "Destination Offloading", time: "ETA: Scheduled", done: false }
      ]
    };

    renderTrackingUI(data);
    showToast(`Tracking status updated for ref: ${code}`);
  });
}

function renderTrackingUI(data) {
  const container = document.getElementById('tracking-results');
  const progressBar = document.querySelector('.tracking-progress-line');

  if (progressBar) progressBar.style.width = data.progress;

  if (container) {
    container.innerHTML = `
      <div style="margin-bottom: 1.5rem; text-align: center;">
        <span class="badge"><i class="fas fa-satellite-dish"></i> Live GPS Feed</span>
        <h4 style="font-size: 1.2rem; margin-top: 0.5rem;">${data.cargo}</h4>
        <p style="color: var(--text-muted); font-size: 0.9rem;">${data.route}</p>
      </div>
      <div class="tracking-timeline">
        ${data.steps.map(step => `
          <div class="step-node ${step.done ? 'completed' : ''} ${step.active ? 'active' : ''}">
            <div class="step-icon">
              <i class="fas ${step.done ? 'fa-check' : step.active ? 'fa-truck-moving' : 'fa-clock'}"></i>
            </div>
            <div class="step-title">${step.name}</div>
            <div class="step-time">${step.time}</div>
          </div>
        `).join('')}
      </div>
    `;
  }
}

/* 6. Contact Form Submission */
function initContactForm() {
  const contactForm = document.getElementById('main-contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value;
      const phone = document.getElementById('contact-phone').value;
      const route = document.getElementById('contact-route').value;
      const details = document.getElementById('contact-details').value;

      showToast(`Thank you ${name}! Our dispatch team is reviewing your request.`);

      const message = `Hello Mentor Business Consulting! New dispatch request:%0A` +
                      `👤 *Name:* ${name}%0A` +
                      `📞 *Phone:* ${phone}%0A` +
                      `🗺️ *Route:* ${route}%0A` +
                      `📦 *Cargo Details:* ${details}`;

      setTimeout(() => {
        window.open(`https://wa.me/27605150440?text=${message}`, '_blank');
      }, 1000);

      contactForm.reset();
    });
  }
}

/* 7. Toast Notification */
function showToast(message) {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fas fa-truck" style="color: var(--accent-gold);"></i> ${message}`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 4000);
}

/* 8. Dynamic Count-Up Animations */
function initCounterAnimations() {
  const counters = document.querySelectorAll('.counter-val');
  let animated = false;

  window.addEventListener('scroll', () => {
    if (counters.length === 0 || animated) return;

    const topPos = counters[0].getBoundingClientRect().top;
    if (topPos < window.innerHeight - 100) {
      animated = true;
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const speed = target / 50;

        const updateCount = () => {
          count += speed;
          if (count < target) {
            counter.innerText = Math.ceil(count);
            setTimeout(updateCount, 30);
          } else {
            counter.innerText = target;
          }
        };
        updateCount();
      });
    }
  });
}
