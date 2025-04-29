const currentUser = localStorage.getItem('currentUser');           

if (!currentUser) {
  alert('Please sign in to view profile');
  window.location.href = '../pages/signIn.html';
}

const user = users.find(u => u.username === currentUser);            

document.getElementById('welcome').textContent = `Welcome, ${user.username}`;
document.getElementById('email').textContent = user.email;

// For favourites loading
const grid = document.getElementById('favGrid');
if (user.favorites && user.favorites.length) {
  user.favorites.forEach(game => {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `
      <img src="../${game.image}" alt="${game.name}">
      <h3>${game.name}</h3>
      <button class="remove-btn" title="Remove">×</button>
    `;

    card.querySelector('.remove-btn').addEventListener('click', () => {
      user.favorites = user.favorites.filter(f => f.id !== game.id);
      localStorage.setItem('users', JSON.stringify(users));         
      card.remove();
    });
    grid.appendChild(card);
  });
} else {
  grid.innerHTML = '<p style="color:#888;">You have no favorite games yet.</p>';
}

document.getElementById('btnBack').addEventListener('click', () => history.back());  

const logoutBtn = document.getElementById('logoutBtn');
const deleteAccountBtn = document.getElementById('deleteAccountBtn');

// Logout
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('currentUser');
  alert('Logged out successfully!');
  window.location.href = '../index.html'; 
});

// Delete Account
deleteAccountBtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to delete your account? This cannot be undone!')) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = localStorage.getItem('currentUser');

    const updatedUsers = users.filter(u => u.username !== currentUser);

    localStorage.setItem('users', JSON.stringify(updatedUsers));

    localStorage.removeItem('currentUser');
    localStorage.removeItem(`favorites_${currentUser}`);

    alert('Account deleted successfully.');
    window.location.href = '../index.html'; 
  }
});
