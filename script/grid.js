fetch('data/data.json')
  .then(res => res.json())
  .then(games => {
    let currentPage = 1;
    const perPage = 6;
    let filteredGames = [...games]; 

    const grid = document.getElementById('gameGrid');
    const pageNum = document.getElementById('pageNumber');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const gameCategories = document.getElementById('gameCategories'); 

    // Total pages function
    function getTotalPages() {
      return Math.ceil(filteredGames.length / perPage);
    }

    // Indexing as per me
    function renderPage(page) {
      if (page < 1) page = 1;
      if (page > getTotalPages()) page = getTotalPages();
      currentPage = page;


      const start = (page - 1) * perPage;
      const pageItems = filteredGames.slice(start, start + perPage);

      // clear & render
      grid.innerHTML = '';
      pageItems.forEach(g => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `
          <a href="pages/detail.html?id=${g.id}" class="card-link">
          <img src="${g.image}" alt="${g.name}">
          <h3>${g.name}</h3>
          </a>
        `;

        grid.appendChild(card);
      });

      // update controls
      pageNum.textContent = `Page ${currentPage} of ${getTotalPages()}`;
      prevBtn.disabled = currentPage === 1;
      nextBtn.disabled = currentPage === getTotalPages();
    }

    function applyFilter() {
      const selectedValue = gameCategories.value;
      if (selectedValue === 'all') {
        filteredGames = [...games];
      } else {
        filteredGames = games.filter(g => g.genre.includes(selectedValue));
      }
      currentPage = 1; // reset to page 1 on filter change
      renderPage(currentPage);
    }

    prevBtn.addEventListener('click', () => renderPage(currentPage - 1));
    nextBtn.addEventListener('click', () => renderPage(currentPage + 1));
    gameCategories.addEventListener('change', applyFilter);

    // Initial Render
    renderPage(1);
  })
  .catch(err => console.error('Could not load data.json:', err));
