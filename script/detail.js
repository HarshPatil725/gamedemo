// detail.js

// 1. Read `id` from URL  
const params = new URLSearchParams(window.location.search);              // :contentReference[oaicite:6]{index=6}  
const gameId = parseInt(params.get('id'), 10);                          

// 2. Fetch all games  
fetch('../data/data.json')                                             // :contentReference[oaicite:7]{index=7}  
  .then(res => res.json())                                             
  .then(games => {
    // 3. Find the game by id  
    const game = games.find(g => g.id === gameId);                     // :contentReference[oaicite:8]{index=8}  
    if (!game) {
      document.getElementById('gameDetail').innerHTML = '<p>Game not found.</p>';
      return;
    }

    // 4. Render details  
    const detailDiv = document.getElementById('gameDetail');
    detailDiv.innerHTML = `
      <img src="../${game.image}" alt="${game.name}" class="detail-img">
      <h1>${game.name}</h1>
      <p><strong>Genre:</strong> ${Array.isArray(game.genre) ? game.genre.join(', ') : game.genre}</p>
      <p><strong>Rating:</strong> ${game.rating} / 10</p>
      <p><strong>Platforms:</strong> ${game.platform.join(', ')}</p>
      <p><strong>Release Date:</strong> ${game.release_date}</p>
      <p class="description">${game.description}</p>
      <button id="btnFav" class="btn">Add to Favorites</button>
    `;

    // 5. Add to Favorites handler (per-user)  
    let users = JSON.parse(localStorage.getItem('users')) || [];         // :contentReference[oaicite:9]{index=9}  
    const currentUserName = localStorage.getItem('currentUser');        // :contentReference[oaicite:10]{index=10}  
    const userIndex = users.findIndex(u => u.username === currentUserName); // :contentReference[oaicite:11]{index=11}  

    document.getElementById('btnFav').addEventListener('click', () => {
      if (userIndex === -1) {
        alert('Please sign in first');  
        return;
      }
      users[userIndex].favorites = users[userIndex].favorites || [];    // :contentReference[oaicite:12]{index=12}  
      if (!users[userIndex].favorites.find(f => f.id === game.id)) {    // prevent duplicates  
        users[userIndex].favorites.push(game);                         
        localStorage.setItem('users', JSON.stringify(users));          // :contentReference[oaicite:13]{index=13}  
        alert('Added to your favorites');
      } else {
        alert('Already in your favorites');
      }
    });
  })
  .catch(err => console.error('Error loading game data:', err));

// 6. Back button  
document.getElementById('btnBack').addEventListener('click', () => {
  history.back();                                                      // :contentReference[oaicite:14]{index=14}  
});
