document.addEventListener('DOMContentLoaded', () => {
  let heroesData = [];
  let currentPage = 1;
  const heroesPerPage = 12;
  let currentSort = { field: 'default', direction: 'asc' };
  let filteredHeroes = [];

  fetch('assets/data/heroes.json')
    .then(response => response.json())
    .then(data => {
      heroesData = data;
      filteredHeroes = [...heroesData];
      renderHeroes(filteredHeroes);
      setupSearch();
      setupSorting();
    });

  function renderHeroes(heroesArray) {
    const container = document.getElementById('heroes-container');
    container.innerHTML = '';

    const startIndex = (currentPage - 1) * heroesPerPage;
    const endIndex = startIndex + heroesPerPage;
    const heroesToShow = heroesArray.slice(startIndex, endIndex);

    heroesToShow.forEach(hero => {
      const card = document.createElement('div');
      card.className = 'hero-card';
      card.innerHTML = `
        <img src="${hero.photo}" alt="${hero.name}">
        <h3 class="hero-name">
          <a href="${hero.page}">${hero.name}</a>
        </h3>
        <p><em>${hero.birthDate_text} – ${hero.deathDate_text}</em></p>
        <p><strong>${hero.rank}</strong>, ${hero.unit}</p>
      `;
      container.appendChild(card);
    });

    renderPagination(heroesArray.length, heroesArray);
  }

  function renderPagination(totalHeroes, currentArray) {
    const paginationContainer = document.getElementById('pagination');
    if (!paginationContainer) {
      console.error('❗ Елемент #pagination не знайдено в DOM');
      return;
    }

    paginationContainer.innerHTML = '';
    const totalPages = Math.ceil(totalHeroes / heroesPerPage);

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      btn.className = i === currentPage ? 'active' : '';
      btn.addEventListener('click', () => {
        currentPage = i;
        renderHeroes(currentArray);
      });
      paginationContainer.appendChild(btn);
    }
  }

  function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase().trim();
      filteredHeroes = heroesData.filter(hero =>
        hero.name.toLowerCase().includes(query) ||
        hero.unit.toLowerCase().includes(query) ||
        hero.rank.toLowerCase().includes(query) 
      );
      currentPage = 1;
      applySorting();
    });
  }

  function setupSorting() {
    const sortSelect = document.getElementById('sortSelect');
    if (!sortSelect) return;

    sortSelect.addEventListener('change', () => {
      const value = sortSelect.value;

      if (currentSort.field === value) {
        currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
      } else {
        currentSort.field = value;
        currentSort.direction = 'asc';
      }

      currentPage = 1;
      applySorting();
    });
  }

  function applySorting() {
    let sorted = [...filteredHeroes];

    if (currentSort.field === 'name') {
      sorted.sort((a, b) =>
        currentSort.direction === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
    } else if (currentSort.field === 'birthDate') {
      sorted.sort((a, b) =>
        currentSort.direction === 'asc'
          ? new Date(a.birthDate_iso) - new Date(b.birthDate_iso)
          : new Date(b.birthDate_iso) - new Date(a.birthDate_iso)
      );
    } else if (currentSort.field === 'deathDate') {
      sorted.sort((a, b) =>
        currentSort.direction === 'asc'
          ? new Date(a.deathDate_iso) - new Date(b.deathDate_iso)
          : new Date(b.deathDate_iso) - new Date(a.deathDate_iso)
      );
    }

    renderHeroes(sorted);
  }
});
