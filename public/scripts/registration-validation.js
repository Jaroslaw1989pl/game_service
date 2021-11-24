// USER NAME VALIDATION
const nameRegex = /[^\w]/;
const userNameInput = document.getElementById('user-name');
const userNameParagraph = document.getElementById('user-name-error');

const nameValidation = () => {

  try {
    
    if(userNameInput.value == '') {
      userNameParagraph.textContent = '';
    } else if(nameRegex.test(userNameInput.value)) {
      throw 'Username can only contain Latin letters, numbers and underscore';
    } else if (userNameInput.value.length < 3) {
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
              // throw 'User name already in use';
              userNameParagraph.textContent = 'User name already in use';
            } else {
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
    userNameParagraph.textContent = error;
  }
};

userNameInput.addEventListener('input', nameValidation);


// USER EMAIL VALIDATION
const emailRegex = /^([\w]+[.|-]{0,1}[\w]+)+@([\w]+-{0,1}[\w]+\.)+[a-zA-Z]+$/i;
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
              userEmailParagraph.textContent = 'An account with this email address already exists';
            } else {
              userEmailParagraph.textContent = '';
            } 
          }
        }
      }
      xhttp.open('GET', '/user-authentication/user-email-input-validation?userEmail=' + userEmailInput.value, true);
      xhttp.send();
    }
  } catch (error) {
    userEmailParagraph.textContent = error;
  }
};

userEmailInput.addEventListener('input', emailValidation);


// USER PASSWORD VALIDATION
// const passRegex = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()\-_=+<>?])[\w!@#$%^&*()\-=+<>?]{8,}/;
const passRegex = /(?=.*[A-Z])(?=.*[a-z])(?=.*([0-9]|[!@#$%^&*()\-_=+<>?]))[\w!@#$%^&*()\-=+<>?]{8,}/;
const userPassInput = document.getElementById('user-pass');
// const userPassParagraph = document.getElementById('user-pass-error');
// password requirements list items
const passRequirements = document.getElementById('password-requirements');
const passLength = document.getElementById('password-length');
const passLetters = document.getElementById('password-letters');
const passSymbols = document.getElementById('password-symbols');
const passUniqueness = document.getElementById('password-uniqueness');

let isLengthValid, areLettersValid, areSymbolsValid, isUniquenessValid;

const displayPassRequirements = () => {
  if(userPassInput.value === '') {
    passRequirements.style.display = 'none';
  } else if(isLengthValid && areLettersValid && areSymbolsValid && isUniquenessValid) {
    setTimeout(() => {passRequirements.style.display = 'none';}, 1000);
  } else {
    passRequirements.style.display = 'block';
  }
};

const passValidation = () => {
  // length validation
  if(userPassInput.value.length >= 8) {
    passLength.style.color = 'green';
    isLengthValid = true;
  } else {
    passLength.style.color = 'black';
    isLengthValid = false;
  }
  // both lower and upper case validation
  if(/(?=.*[A-Z])(?=.*[a-z])/.test(userPassInput.value)) {
    passLetters.style.color = 'green';
    areLettersValid = true;
  } else {
    passLetters.style.color = 'black';
    areLettersValid = false;
  }
  // number and symbol validation
  if(/(?=.*([\x21-\x40]|[\x5B-\x60]|[\x7B-\x7E]))/.test(userPassInput.value)) {
    passSymbols.style.color = 'green';
    areSymbolsValid = true;
  } else {
    passSymbols.style.color = 'black';
    areSymbolsValid = false;
  }
  // uniqueness validation
  if((!userPassInput.value.includes(userNameInput.value) || !userNameInput.value) && 
     (!userPassInput.value.includes(userEmailInput.value) || !userEmailInput.value)) {
    passUniqueness.style.color = 'green';
    isUniquenessValid = true;
  } else {
    passUniqueness.style.color = 'black';
    isUniquenessValid = false;
  }

  displayPassRequirements();
  pass2Validation();
};

userPassInput.addEventListener('input', passValidation);


const userPass2Input = document.getElementById('user-pass-2');
const userPass2Paragraph = document.getElementById('user-pass2-error');

const pass2Validation = () => {
  if(userPass2Input.value.length > 0) {
    if(userPassInput.value === userPass2Input.value) {
      userPass2Paragraph.textContent = '';
    } else {
      userPass2Paragraph.textContent = 'Passwords are not the same';
    }
  }
};

userPass2Input.addEventListener('input', pass2Validation);