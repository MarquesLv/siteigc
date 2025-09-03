// Enhanced UI State & helpers with new features
(function () {
  const minerals = window.MINERALS || [];

  // Elements
  const mineralGrid = document.getElementById("mineralGrid");
  const searchInput = document.getElementById("searchInput");
  const noResults = document.getElementById("noResults");
  const modal = document.getElementById("mineralModal");
  const modalContent = document.getElementById("modalContent");
  const sortSelect = document.getElementById("sortSelect");
  const favoritesOnly = document.getElementById("favoritesOnly");
  const clearFilters = document.getElementById("clearFilters");
  const pagination = document.getElementById("pagination");
  const prevPageBtn = document.getElementById("prevPage");
  const nextPageBtn = document.getElementById("nextPage");
  const pageInfo = document.getElementById("pageInfo");
  const themeToggle = document.getElementById("themeToggle");
  const themeToggleMobile = document.getElementById("themeToggleMobile");
  const themeIcon = document.getElementById("themeIcon");
  const themeIconMobile = document.getElementById("themeIconMobile");
  const menuButton = document.getElementById("menuButton");
  const mobileMenu = document.getElementById("mobileMenu");

  // Carousel elements
  const carouselTrack = document.getElementById("carouselTrack");
  const carouselIndicators = document.getElementById("carouselIndicators");
  const prevCarousel = document.getElementById("prevCarousel");
  const nextCarousel = document.getElementById("nextCarousel");

  const PAGE_SIZE = 10;
  let state = {
    query: "",
    sort: "name-asc",
    favoritesOnly: false,
    page: 1,
    favorites: new Set(JSON.parse(localStorage.getItem("favorites") || "[]")),
    currentCarouselSlide: 0,
  };

  function persistFavorites() {
    localStorage.setItem("favorites", JSON.stringify(Array.from(state.favorites)));
  }

  // Enhanced Theme Management
  function initTheme() {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
    }
    updateThemeIcon();
  }

  function toggleTheme() {
    document.documentElement.classList.toggle("dark");
    const isDark = document.documentElement.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateThemeIcon();
    
    // Add smooth transition effect
    document.body.style.transition = "all 0.3s ease";
    setTimeout(() => {
      document.body.style.transition = "";
    }, 300);
  }

  function updateThemeIcon() {
    const isDark = document.documentElement.classList.contains("dark");
    const icon = isDark ? "☀️" : "🌙";
    
    if (themeIcon) themeIcon.textContent = icon;
    if (themeIconMobile) themeIconMobile.textContent = icon;
  }

  // Theme toggle event listeners
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }
  if (themeToggleMobile) {
    themeToggleMobile.addEventListener("click", toggleTheme);
  }

  // Mobile menu
  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
      
      // Animate menu button
      const svg = menuButton.querySelector("svg");
      if (svg) {
        svg.style.transform = mobileMenu.classList.contains("hidden") ? "rotate(0deg)" : "rotate(90deg)";
      }
    });
  }

  // Initialize Counter Animation
  function animateCounters() {
    const counters = document.querySelectorAll("[data-counter]");
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute("data-counter"));
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current);
        }
      }, duration / steps);
    });
  }

  // Carousel functionality
  function initCarousel() {
    if (!carouselTrack || !carouselIndicators) return;
    
    const slidesToShow = window.innerWidth >= 768 ? 3 : 1;
    const totalSlides = Math.ceil(minerals.length / slidesToShow);
    
    // Create carousel slides
    for (let i = 0; i < totalSlides; i++) {
      const slide = document.createElement("div");
      slide.className = "carousel-slide min-w-full grid gap-6";
      slide.style.gridTemplateColumns = `repeat(${slidesToShow}, 1fr)`;
      
      for (let j = 0; j < slidesToShow; j++) {
        const mineralIndex = i * slidesToShow + j;
        if (mineralIndex < minerals.length) {
          const mineral = minerals[mineralIndex];
          slide.appendChild(createCarouselCard(mineral));
        }
      }
      
      carouselTrack.appendChild(slide);
    }
    
    // Create indicators
    for (let i = 0; i < totalSlides; i++) {
      const indicator = document.createElement("button");
      indicator.className = `carousel-indicator ${i === 0 ? "active" : ""}`;
      indicator.addEventListener("click", () => goToSlide(i));
      carouselIndicators.appendChild(indicator);
    }
    
    updateCarousel();
  }

  function createCarouselCard(mineral) {
    const card = document.createElement("div");
    card.className = "bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer group";
    
    card.innerHTML = `
      <div class="relative overflow-hidden">
        <img src="${mineral.image}" alt="${mineral.name}" class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" onerror="this.onerror=null;this.src='https://placehold.co/400x300/e2e8f0/64748b?text=Imagem+N/D';">
        <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div class="absolute bottom-2 right-2">
          <button class="carousel-fav-btn bg-white/90 dark:bg-slate-800/90 text-yellow-600 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${state.favorites.has(mineral.id) ? "text-yellow-500" : "text-slate-400"}" data-id="${mineral.id}">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="p-6">
        <h3 class="font-bold text-lg text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">${mineral.name}</h3>
        <p class="text-sm text-slate-600 dark:text-slate-400 mb-3 font-mono bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">${mineral.formula}</p>
        <p class="text-sm text-slate-700 dark:text-slate-300 leading-relaxed line-clamp-3">${mineral.description}</p>
        <div class="mt-4 flex justify-between items-center">
          <span class="text-xs text-slate-500 dark:text-slate-400">Dureza: ${mineral.hardness}</span>
          <span class="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">${mineral.crystalSystem}</span>
        </div>
      </div>
    `;
    
    card.addEventListener("click", (e) => {
      if (!e.target.closest(".carousel-fav-btn")) {
        openModal(mineral);
      }
    });
    
    // Handle favorite button
    const favBtn = card.querySelector(".carousel-fav-btn");
    favBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFavorite(mineral.id);
      favBtn.classList.toggle("text-yellow-500", state.favorites.has(mineral.id));
      favBtn.classList.toggle("text-slate-400", !state.favorites.has(mineral.id));
    });
    
    return card;
  }

  function goToSlide(slideIndex) {
    state.currentCarouselSlide = slideIndex;
    updateCarousel();
  }

  function nextSlide() {
    const totalSlides = carouselIndicators?.children.length || 0;
    state.currentCarouselSlide = (state.currentCarouselSlide + 1) % totalSlides;
    updateCarousel();
  }

  function prevSlide() {
    const totalSlides = carouselIndicators?.children.length || 0;
    state.currentCarouselSlide = (state.currentCarouselSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }

  function updateCarousel() {
    if (!carouselTrack || !carouselIndicators) return;
    
    const slideWidth = carouselTrack.children[0]?.offsetWidth || 0;
    carouselTrack.style.transform = `translateX(-${state.currentCarouselSlide * slideWidth}px)`;
    
    // Update indicators
    Array.from(carouselIndicators.children).forEach((indicator, index) => {
      indicator.classList.toggle("active", index === state.currentCarouselSlide);
    });
  }

  // Carousel controls
  if (nextCarousel) {
    nextCarousel.addEventListener("click", nextSlide);
  }
  if (prevCarousel) {
    prevCarousel.addEventListener("click", prevSlide);
  }

  // Auto-advance carousel
  setInterval(() => {
    if (carouselTrack && !document.hidden) {
      nextSlide();
    }
  }, 5000);

  function normalize(str) {
    return (str || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function sortMinerals(list, sort) {
    const sorted = [...list];
    if (sort === "name-asc") sorted.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "name-desc") sorted.sort((a, b) => b.name.localeCompare(a.name));
    return sorted;
  }

  function filterMinerals() {
    const q = normalize(state.query);
    let list = minerals.filter((m) => 
      normalize(m.name).includes(q) || 
      normalize(m.formula).includes(q) ||
      normalize(m.description).includes(q)
    );
    if (state.favoritesOnly) list = list.filter((m) => state.favorites.has(m.id));
    return sortMinerals(list, state.sort);
  }

  function paginate(list) {
    const total = list.length;
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const page = Math.min(state.page, totalPages);
    const start = (page - 1) * PAGE_SIZE;
    const items = list.slice(start, start + PAGE_SIZE);
    return { items, page, totalPages, total };
  }

  function render() {
    if (!mineralGrid) return; // Only render on catalog page
    
    const filtered = filterMinerals();
    const { items, page, totalPages, total } = paginate(filtered);

    mineralGrid.innerHTML = "";
    noResults.classList.toggle("hidden", total > 0);

    items.forEach((mineral, index) => {
      const card = document.createElement("button");
      card.className =
        "card bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-sm text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-200 dark:border-slate-700";
      card.setAttribute("aria-label", `Abrir detalhes de ${mineral.name}`);
      card.style.animationDelay = `${index * 0.1}s`;
      card.innerHTML = `
        <div class="relative overflow-hidden">
          <img src="${mineral.image}" alt="Imagem de ${mineral.name}" class="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105" onerror="this.onerror=null;this.src='https://placehold.co/400x300/e2e8f0/64748b?text=Imagem+N/D';">
          <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="absolute top-2 right-2">
            <button class="favBtn px-2 py-1 text-sm rounded-full bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-600 shadow-sm transition-all duration-300 hover:scale-110 ${
              state.favorites.has(mineral.id) ? "text-yellow-500" : "text-slate-600 dark:text-slate-400"
            }" title="Favoritar" data-id="${mineral.id}">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </button>
          </div>
        </div>
        <div class="p-4">
          <h3 class="font-semibold text-sm text-slate-900 dark:text-white mb-2 line-clamp-2">${mineral.name}</h3>
          <div class="text-xs text-slate-600 dark:text-slate-400 mb-2 font-mono bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">${mineral.formula}</div>
          <div class="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
            <span>Dureza: ${mineral.hardness}</span>
            <span class="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">${mineral.crystalSystem}</span>
          </div>
        </div>
      `;
      
      card.addEventListener("click", (ev) => {
        if (ev.target && ev.target.closest(".favBtn")) return;
        openModal(mineral);
      });
      
      mineralGrid.appendChild(card);

      // Handle favorite button
      const favBtn = card.querySelector(".favBtn");
      favBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleFavorite(mineral.id);
        render();
      });
    });

    // Pagination
    if (pagination) {
      pagination.classList.toggle("hidden", total <= PAGE_SIZE);
      if (!pagination.classList.contains("hidden")) {
        pageInfo.textContent = `Página ${page} de ${totalPages}`;
        prevPageBtn.disabled = page <= 1;
        nextPageBtn.disabled = page >= totalPages;
        prevPageBtn.classList.toggle("opacity-50", page <= 1);
        nextPageBtn.classList.toggle("opacity-50", page >= totalPages);
      }
    }
  }

  function toggleFavorite(id) {
    if (state.favorites.has(id)) state.favorites.delete(id);
    else state.favorites.add(id);
    persistFavorites();
  }

  function openModal(mineral) {
    const modalHtml = `
      <div class="relative">
        <div class="p-6 md:p-8">
          <div class="flex justify-between items-start mb-6">
            <h2 class="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">${mineral.name}</h2>
            <div class="flex items-center gap-3">
              <button id="favInModal" class="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 transition-all duration-300 hover:scale-105 ${
                state.favorites.has(mineral.id) ? "text-yellow-600 border-yellow-300" : "text-slate-700 dark:text-slate-300"
              }">
                <svg class="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                Favorito
              </button>
              <button id="closeModal" class="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300" aria-label="Fechar">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <div class="grid md:grid-cols-2 gap-8 items-start">
            <div class="relative group">
              <img src="${mineral.image}" alt="Imagem de ${mineral.name}" class="w-full h-auto rounded-xl shadow-lg transition-transform duration-500 group-hover:scale-105" onerror="this.onerror=null;this.src='https://placehold.co/600x400/e2e8f0/64748b?text=Imagem+N/D';">
              <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
            </div>
            
            <div class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div class="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                  <h4 class="font-semibold text-slate-900 dark:text-white mb-2">Composição</h4>
                  <span class="font-mono bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-3 py-2 rounded border text-sm">${mineral.formula}</span>
                </div>
                <div class="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                  <h4 class="font-semibold text-slate-900 dark:text-white mb-2">Dureza (Mohs)</h4>
                  <span class="text-2xl font-bold text-blue-600 dark:text-blue-400">${mineral.hardness}</span>
                </div>
              </div>
              
              <div class="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                <h4 class="font-semibold text-slate-900 dark:text-white mb-2">Propriedades</h4>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-slate-600 dark:text-slate-400">Cor:</span>
                    <span class="font-medium text-slate-900 dark:text-white">${mineral.color}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-600 dark:text-slate-400">Sistema Cristalino:</span>
                    <span class="font-medium text-slate-900 dark:text-white">${mineral.crystalSystem}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="mt-8 space-y-6">
            <section class="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
              <h3 class="flex items-center font-semibold text-lg text-slate-900 dark:text-white mb-4">
                <svg class="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Descrição
              </h3>
              <p class="text-slate-700 dark:text-slate-300 leading-relaxed">${mineral.description}</p>
            </section>
            
            <section class="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
              <h3 class="flex items-center font-semibold text-lg text-slate-900 dark:text-white mb-4">
                <svg class="w-5 h-5 mr-2 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                Ocorrência
              </h3>
              <p class="text-slate-700 dark:text-slate-300 leading-relaxed">${mineral.occurrence}</p>
            </section>
            
            <section class="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
              <h3 class="flex items-center font-semibold text-lg text-slate-900 dark:text-white mb-4">
                <svg class="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                </svg>
                Usos e Aplicações
              </h3>
              <p class="text-slate-700 dark:text-slate-300 leading-relaxed">${mineral.uses}</p>
            </section>
          </div>
        </div>
      </div>
    `;
    
    modalContent.innerHTML = modalHtml;
    modal.classList.remove("hidden");
    
    requestAnimationFrame(() => {
      modal.classList.remove("opacity-0");
      modalContent.classList.remove("scale-95");
      modalContent.classList.add("scale-100");
      modalContent.classList.add("opacity-100");
      const closeBtn = document.getElementById("closeModal");
      if (closeBtn) closeBtn.focus();
    });

    // Deep link via hash
    history.replaceState(null, "", `#${mineral.id}`);

    // Internal events
    document.getElementById("closeModal").addEventListener("click", closeModal);
    document.getElementById("favInModal").addEventListener("click", () => {
      toggleFavorite(mineral.id);
      openModal(mineral); // Re-render modal to reflect state
      render();
    });

    // Remove loading after image loads
    const img = modalContent.querySelector('img');
    if (img) {
      img.addEventListener('load', () => img.classList.remove('loading'));
      img.addEventListener('error', () => img.classList.remove('loading'));
    }
  }

  function closeModal() {
    modal.classList.add("opacity-0");
    modalContent.classList.add("scale-95");
    modalContent.classList.remove("scale-100");
    
    setTimeout(() => {
      modal.classList.add("hidden");
      // Clear hash
      if (location.hash) history.replaceState(null, "", location.pathname + location.search);
    }, 300);
  }

  // Event Listeners
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.query = e.target.value;
      state.page = 1;
      render();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      state.sort = e.target.value;
      state.page = 1;
      render();
    });
  }

  if (favoritesOnly) {
    favoritesOnly.addEventListener("change", (e) => {
      state.favoritesOnly = e.target.checked;
      state.page = 1;
      render();
    });
  }

  if (clearFilters) {
    clearFilters.addEventListener("click", () => {
      state.query = "";
      state.sort = "name-asc";
      state.favoritesOnly = false;
      state.page = 1;
      if (searchInput) searchInput.value = "";
      if (sortSelect) sortSelect.value = "name-asc";
      if (favoritesOnly) favoritesOnly.checked = false;
      render();
    });
  }

  if (prevPageBtn && nextPageBtn) {
    prevPageBtn.addEventListener("click", () => {
      state.page = Math.max(1, state.page - 1);
      render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    nextPageBtn.addEventListener("click", () => {
      state.page = state.page + 1;
      render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Close modal on outside click and Escape key
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
    
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
    });
  }

  // Open modal if hash exists for deep linking
  if (location.hash) {
    const id = location.hash.replace("#", "");
    const item = minerals.find((m) => m.id === id);
    if (item) setTimeout(() => openModal(item), 100);
  }

  // Window resize handler for carousel
  window.addEventListener('resize', () => {
    if (carouselTrack && carouselIndicators) {
      updateCarousel();
    }
  });

  // Initialize everything
  initTheme();
  
  // Initialize carousel on home page
  if (document.body.getAttribute('data-page') === 'home') {
    setTimeout(() => {
      initCarousel();
      animateCounters();
    }, 500);
  }
  
  // Initialize catalog on other pages
  if (mineralGrid) {
    render();
  }

  // Intersection Observer for animations
  const observeElements = document.querySelectorAll('.feature-card, .stat-card');
  if (observeElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationDelay = '0s';
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, { threshold: 0.1 });

    observeElements.forEach(el => observer.observe(el));
  }

  // Add smooth scrolling for anchor links
  document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
      e.preventDefault();
      const target = document.querySelector(e.target.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });

})();
