// 1. Read users & currentUser
const currentUser = localStorage.getItem('currentUser');             // :contentReference[oaicite:5]{index=5}

if (!currentUser) {
  alert('Please sign in to view profile');
  window.location.href = '../pages/signIn.html';
}

// 2. Find user object
const user = users.find(u => u.username === currentUser);            // :contentReference[oaicite:6]{index=6}

// 3. Display user info
document.getElementById('welcome').textContent = `Welcome, ${user.username}`;
document.getElementById('email').textContent = user.email;

// 4. Render favorites
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
    // 5. Remove handler
    card.querySelector('.remove-btn').addEventListener('click', () => {
      user.favorites = user.favorites.filter(f => f.id !== game.id);
      localStorage.setItem('users', JSON.stringify(users));         // :contentReference[oaicite:7]{index=7}
      card.remove();
    });
    grid.appendChild(card);
  });
} else {
  grid.innerHTML = '<p style="color:#888;">You have no favorite games yet.</p>';
}

// 6. Back button
document.getElementById('btnBack').addEventListener('click', () => history.back());  /* :contentReference[oaicite:8]{index=8} */


const logoutBtn = document.getElementById('logoutBtn');
const deleteAccountBtn = document.getElementById('deleteAccountBtn');

// Logout
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('currentUser');
  alert('Logged out successfully!');
  window.location.href = '../index.html'; // Go back to home page
});

// Delete Account
deleteAccountBtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to delete your account? This cannot be undone!')) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = localStorage.getItem('currentUser');

    // Remove the user from users array
    const updatedUsers = users.filter(u => u.username !== currentUser);

    // Save updated users array
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Also remove currentUser and favorites
    localStorage.removeItem('currentUser');
    localStorage.removeItem(`favorites_${currentUser}`);

    alert('Account deleted successfully.');
    window.location.href = '../index.html'; // Go to home page
  }
});
