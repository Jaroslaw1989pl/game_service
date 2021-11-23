let isUserNameValid = true;

// USER NAME INPUT
const nameRegex = /[^\w]/;
const userNameInput = document.getElementById('user-name');
const userNameParagraph = document.getElementById('user-name-error');

const nameValidation = () => {

  try {
    
    if(userNameInput.value == '') {
      userNameParagraph.textContent = '';
    } else if(nameRegex.test(userNameInput.value)) {
      throw 'Username can only contain Latin letters, numbers and underscore';
    } else if (userNameInput.value.length < 4) {
      throw 'Username should be at least 3 characters long';
    } else if(userNameInput.value.length > 24) {
      throw 'Username should not exceed 24 characters';
    } else {
      const xhttp = new XMLHttpRequest();
      xhttp.onload = () => {
        if(xhttp.status >= 200 && xhttp.status < 300) {
          if(xhttp.readyState == 4) {
            if(xhttp.responseText == userNameInput.value) {
              console.log(xhttp.responseText);
              isUserNameValid = false;
              // throw 'User name already in use';
              userNameParagraph.textContent = 'User name already in use';
            } else {
              isUserNameValid = true;
              userNameParagraph.textContent = '';
            } 
          }
        }
      }
      xhttp.open('POST', '/user-authentication/user-name-input-validation', true);
      xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhttp.send('userName=' + userNameInput.value);
    }
  } catch (error) {
    isUserNameValid = false;
    userNameParagraph.textContent = error;
  }
};

userNameInput.addEventListener('input', nameValidation);


// USER EMAIL INPUT
const emailRegex = /^([\w-]+\.{0,1})+[\w-]+@([\w-]+\.)+[\w-]{2,4}$/i;
const userEmailInput = document.getElementById('user-email');
const userEmailParagraph = document.getElementById('user-email-error');

const emailValidation = () => {

  try {
    if(userEmailInput.value == '') {
      userEmailParagraph.textContent = '';
    } else if(!emailRegex.test(userEmailInput.value)) {
      throw 'The email address is incorrect';
    } else if(emailRegex.test(userEmailInput.value)) {
      const xhttp = new XMLHttpRequest();
      xhttp.onload = () => {
        if(xhttp.status >= 200 && xhttp.status < 300) {
          if(xhttp.readyState == 4) {
            if(xhttp.responseText == userEmailInput.value) {
              console.log(xhttp.responseText);
              isUserEmailValid = false;
              userEmailParagraph.textContent = 'The email address has already been used to create the account';
            } else {
              isUserEmailValid = true;
              userEmailParagraph.textContent = '';
            } 
          }
        }
      }
      xhttp.open('GET', '/user-authentication/user-email-input-validation?userEmail=' + userEmailInput.value, true);
      xhttp.send();
    }
  } catch (error) {
    isUserEmailValid = false;
    userEmailParagraph.textContent = error;
  }
};

userEmailInput.addEventListener('input', emailValidation);


// USER PASSWORD INPUT
const passRegex = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()\-_=+<>?])[\w!@#$%^&*()\-=+<>?]{8,}/;
const userPassInput = document.getElementById('user-pass');
const userPassParagraph = document.getElementById('user-pass-error');

const passValidation = () => {

  try {
    if(userPassInput.value == '') {
      userPassParagraph.textContent = '';
    } else if (userPassInput.value.length < 8) {
      throw 'Password should be at least 8 characters long';
    } else if(userPassInput.value.length > 24) {
      throw 'Password should not exceed 24 characters';
    } else if(passRegex.test(userPassInput.value)) {
      throw 'hasło poprawne';
      // throw 'Password should contain at least one capitol letter, one small letter, one number and one special character: !@#$%^&*()-_=+<>?';
    } else {
      userPassParagraph.textContent = '';
    } 
  } catch (error) {
    isUserPassValid = false;
    userPassParagraph.textContent = error;
  }
};

userPassInput.addEventListener('input', passValidation);