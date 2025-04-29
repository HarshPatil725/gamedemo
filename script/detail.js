const params = new URLSearchParams(window.location.search);             
const gameId = parseInt(params.get('id'), 10);                          
  
fetch('../data/data.json')                                            
  .then(res => res.json())                                             
  .then(games => {
 
    const game = games.find(g => g.id === gameId);                     
    if (!game) {
      document.getElementById('gameDetail').innerHTML = '<p>Game not found.</p>';
      return;
    }

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
 
    let users = JSON.parse(localStorage.getItem('users')) || [];         
    const currentUserName = localStorage.getItem('currentUser');          
    const userIndex = users.findIndex(u => u.username === currentUserName); 

    document.getElementById('btnFav').addEventListener('click', () => {
      if (userIndex === -1) {
        alert('Please sign in first');  
        return;
      }
      users[userIndex].favorites = users[userIndex].favorites || [];   
      if (!users[userIndex].favorites.find(f => f.id === game.id)) {   
        users[userIndex].favorites.push(game);                         
        localStorage.setItem('users', JSON.stringify(users));          
        alert('Added to your favorites');
      } else {
        alert('Already in your favorites');
      }
    });
  })
  .catch(err => console.error('Error loading game data:', err));
 
document.getElementById('btnBack').addEventListener('click', () => {
  history.back();                                                   
});
