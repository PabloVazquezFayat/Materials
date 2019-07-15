document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

  let signUpButton = document.getElementById('sign-up');
  let logInButton = document.getElementById('log-in');

  let formContainer = document.querySelector('.singup-or-login');

  let message = document.querySelector('.fail-message');

  logInButton.onclick = ()=>{
    formContainer.style.marginLeft = '-330px';
  };

  console.log(message);

  if(message.innerText == 'Incorrect email or password.'){
    formContainer.style.marginLeft = '-330px';
  }

}, false);
