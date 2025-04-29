const btnSignIn = document.getElementById('btnSignIn');
const btnSignUp = document.getElementById('btnSignUp');
const formSignIn = document.getElementById('formSignIn');
const formSignUp = document.getElementById('formSignUp');
const title = document.getElementById('form-title');

// To store in users array of localstorage
let users = JSON.parse(localStorage.getItem('users')) || [];  

function saveUsers() {  
  localStorage.setItem('users', JSON.stringify(users));   
}

// Kon hai current mai
function setCurrentUser(username) {  
  localStorage.setItem('currentUser', username);          
}

// Sign up function code
formSignUp.addEventListener('submit', e => {  
  e.preventDefault();  

  const username = document.getElementById('signUpUser').value.trim();  
  const email    = document.getElementById('signUpEmail').value.trim();  
  const password = document.getElementById('signUppass').value;  

  if (users.find(u => u.username === username)) {  
    alert('Username already taken');  
    return;  
  }  

  // Add new user  
  users.push({ username, email, password });  
  saveUsers();  
  window.location.reload(); 
});  

// Sign in function code 
formSignIn.addEventListener('submit', e => {  
  e.preventDefault();  

  const email    = document.getElementById('signInEmail').value.trim();  
  const password = document.getElementById('signInpass').value;  

  const user = users.find(u => u.email === email && u.password === password);  
  if (!user) {  
    alert('Invalid credentials');  
    return;  
  }  
  alert(`${user.username} logged in`) ;
  setCurrentUser(user.username);
  window.location.href = "../index.html";    
});  

// Toggle between forms  
btnSignIn.addEventListener('click', () => {  
  formSignIn.classList.add('activeForm');  
  formSignUp.classList.remove('activeForm');  
  btnSignIn.classList.add('active');  
  btnSignUp.classList.remove('active');  
  title.textContent = 'Sign In';  
});  

btnSignUp.addEventListener('click', () => {  
  formSignUp.classList.add('activeForm');  
  formSignIn.classList.remove('activeForm');  
  btnSignUp.classList.add('active');  
  btnSignIn.classList.remove('active');  
  title.textContent = 'Sign Up';  
});  
