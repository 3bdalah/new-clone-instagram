let username = document.querySelector(`#sign-username`);
let pass = document.querySelector(`#sign-pass`);
let conPass = document.querySelector(`#sign-con-pass`);
let email = document.querySelector(`#sign-email`);
let btnLogin = document.querySelector(`#btn-sign`);
let errMessage = document.querySelector('.err-message');
let usernameLabel = document.getElementById('label-username');
btnLogin.setAttribute('class', 'btn btn-primary disabled');
let flag = false;
// motion the label
const changeInput = (classname, input) => {
  let x = document.querySelector(`#${classname}`);
  input.value.length > 0
    ? x.classList.add('inpt-focused')
    : x.classList.remove('inpt-focused');
};

// EVENT LISTENER ON ALL INPUTS
username.addEventListener('blur', () => {
  validuserName();
});

email.addEventListener('blur', () => {
  validEmail();
});
pass.addEventListener('blur', () => {
  validpassword();
});
conPass.addEventListener('blur', () => {
  validConpassword();
  signbtn(flag);
  console.log('flag', flag);
});

// validation on UserName
function validuserName() {
  var regex = /^[0-9]/;
  if (username.value.length <= 3 || regex.test(username)) {
    username.setAttribute('class', 'form-control is-invalid');
    //   event.preventDefault();
    username.focus();
    flag = false;
  } else {
    username.setAttribute('class', 'form-control is-valid');
    flag = true;
  }
}

// validation of Email.
function validEmail() {
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailPattern.test(email.value)) {
    email.setAttribute('class', 'form-control is-valid');
    flag = true;
  } else {
    email.setAttribute('class', 'form-control is-invalid');
    email.focus();
    flag = false;
  }
}
// validation of password
function validpassword() {
  if (pass.value.length >= 8) {
    pass.setAttribute('class', 'form-control is-valid');
    flag = true;
  } else {
    pass.setAttribute('class', 'form-control is-invalid');
    pass.focus();
    flag = false;
  }
}
// validation of password
function validConpassword() {
  if (conPass.value.length >= 8 && conPass.value === pass.value) {
    conPass.setAttribute('class', 'form-control is-valid');
    flag = true;
  } else {
    conPass.setAttribute('class', 'form-control is-invalid');
    conPass.focus();
    flag = false;
  }
}

function signbtn(flag) {
  if (flag) {
    btnLogin.setAttribute('class', 'btn btn-primary active');
  }
}
btnLogin.addEventListener('click', () => {
  window.open('home.html');
  //   // Save the email value to the local storage
  localStorage.setItem('userName', username.value);
  localStorage.setItem('email', email.value);
  localStorage.setItem('password', pass.value);
  localStorage.setItem('confirmPassword', conPass.value);
});
