const btnLogon = document.getElementById('btn-login');
let email = document.getElementById('login-email');
let pass = document.getElementById('login-pass');
// const errMessage = document.querySelector('.err-message');
let emailLocal =localStorage.getItem("email")
let passLocal =localStorage.getItem("password")
btnLogon.setAttribute('class', 'btn btn-primary disabled');

// motion the label
const changeInput = (classname, input) => {
  let x = document.querySelector(`#${classname}`);
  input.value.length > 0
    ? x.classList.add('inpt-focused')
    : x.classList.remove('inpt-focused');

};

email.addEventListener('blur', () => {
  validEmail();
});
pass.addEventListener('blur', () => {
  validpassword();
  loginbtn(flag);
});

function loginbtn(flag) {
  if (flag) {
    btnLogon.setAttribute('class', 'btn btn-primary active');
  }
}

// validation of Email.
function validEmail(){
    console.log(email.value)
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if( emailPattern.test(email.value) && email.value == emailLocal){
         email.setAttribute('class', 'form-control is-valid');
         flag = true;
        }else{
            email.setAttribute('class', 'form-control is-invalid');
            email.focus();
           flag = false;
        }
    
}
// validation of password
function validpassword(){
    if( pass.value.length >= 8 && pass.value == passLocal){
pass.setAttribute('class', 'form-control is-valid');
flag = true;
    }else{
             pass.setAttribute('class', 'form-control is-invalid');
             pass.focus();
             flag = false;
    }
}
btnLogon.addEventListener('click', () => {
  window.open('home.html', '_blank');
});