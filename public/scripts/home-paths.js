const loginBtn = document.getElementById("login-btn");
const registrationBtn = document.getElementById("registration-btn");

loginBtn.addEventListener('click', () => {
  window.location.pathname = 'login';
});
registrationBtn.addEventListener('click', () => {
  window.location.pathname = 'registration';
});