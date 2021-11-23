// USER NAME INPUT
const nameRegex = /[^\w]/;
const inputUserName = document.getElementById('user-name');
const pUserName = document.getElementById('p-user-name');
let isUserNameValid = true;

const nameValidation = () => {

  try {
    
    if(inputUserName.value == '') {
      pUserName.textContent = '';
    } else if(nameRegex.test(inputUserName.value)) {
      throw 'Username can only contain Latin letters, numbers and underscore';
    } else if (inputUserName.value.length < 4) {
      throw 'Username should be at least 3 characters long';
    } else if(inputUserName.value.length > 24) {
      throw 'Username should not exceed 24 characters';
    } else {
      const xhttp = new XMLHttpRequest();
      xhttp.onload = () => {
        if(xhttp.status >= 200 && xhttp.status < 300) {
          if(xhttp.readyState == 4) {
            if(xhttp.responseText == inputUserName.value) {
              console.log(xhttp.responseText);
              isUserNameValid = false;
              pUserName.textContent = 'User name already in use';
            } else {
              isUserNameValid = true;
              pUserName.textContent = '';
            } 
          }
        }
      }
      xhttp.open('POST', '/user-authentication/user-name-input-validation', true);
      xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhttp.send('userName=' + inputUserName.value);
    }
  } catch (error) {
    isUserNameValid = false;
    pUserName.textContent = error;
  }
};

inputUserName.addEventListener('input', nameValidation);


// USER EMAIL INPUT
const emailRegex = /^([\w-]+\.{0,1})+[\w-]+@([\w-]+\.)+[\w-]{2,4}$/i;
const inputUserEmail = document.getElementById('user-email');
const pUserEmail = document.getElementById('p-user-email');
let isUserEmailValid = true;

const emailValidation = () => {

  try {
    if(inputUserEmail.value == '') {
      pUserEmail.textContent = '';
    } else if(!emailRegex.test(inputUserEmail.value)) {
      throw 'The email address is incorrect';
    } else if(emailRegex.test(inputUserEmail.value)) {
      const xhttp = new XMLHttpRequest();
      xhttp.onload = () => {
        if(xhttp.status >= 200 && xhttp.status < 300) {
          if(xhttp.readyState == 4) {
            if(xhttp.responseText == inputUserEmail.value) {
              console.log(xhttp.responseText);
              isUserEmailValid = false;
              pUserEmail.textContent = 'The email address has already been used to create the account';
            } else {
              isUserEmailValid = true;
              pUserEmail.textContent = '';
            } 
          }
        }
      }
      xhttp.open('GET', '/user-authentication/user-email-input-validation?userEmail=' + inputUserEmail.value, true);
      xhttp.send();
    }
  } catch (error) {
    isUserEmailValid = false;
    pUserEmail.textContent = error;
  }
};

inputUserEmail.addEventListener('input', emailValidation);


// USER PASSWORD INPUT
const passRegex = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()\-_=+<>?])[\w!@#$%^&*()\-=+<>?]{8,}/;
const inputUserPass = document.getElementById('user-pass');
const pUserPass = document.getElementById('p-user-pass');
let isUserPassValid = true;

const passValidation = () => {

  try {
    if(inputUserPass.value == '') {
      pUserPass.textContent = '';
    } else if (inputUserPass.value.length < 8) {
      throw 'Password should be at least 8 characters long';
    } else if(inputUserPass.value.length > 24) {
      throw 'Password should not exceed 24 characters';
    } else if(passRegex.test(inputUserPass.value)) {
      throw 'hasło poprawne';
      // throw 'Password should contain at least one capitol letter, one small letter, one number and one special character: !@#$%^&*()-_=+<>?';
    } else {
      pUserPass.textContent = '';
    } 
  } catch (error) {
    isUserPassValid = false;
    pUserPass.textContent = error;
  }
};

inputUserPass.addEventListener('input', passValidation);