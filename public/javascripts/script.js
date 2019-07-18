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

document.addEventListener('DOMContentLoaded', ()=>{
  //ADD MATERIAL PANEL
  let addMaterialButton = document.querySelector('.create-material');
  let createMaterialPanel = document.querySelector('.setup-material');
  let cancel = document.querySelector('.cancel');

  let addMaterialButtonImg = document.getElementById('add-img');

  let createMaterialName = document.getElementById('name-the-mat');
  let createMaterialCategory = document.getElementById('cat-the-mat');

  let hideShow = false;

  addMaterialButton.addEventListener('click', ()=>{
    if(hideShow === false){
      createMaterialPanel.style.display = 'flex';
      hideShow = true;
      addMaterialButtonImg.setAttribute('src', '../images/minus.png');
      return 
    }else{
      createMaterialPanel.style.display = 'none';
      addMaterialButtonImg.setAttribute('src', '../images/plus.png');
      hideShow = false;
      return;
    }
  });

  cancel.addEventListener('click', ()=>{
    createMaterialPanel.style.display = 'none';
    addMaterialButtonImg.setAttribute('src', '../images/plus.png');
    hideShow = false;
    return;
  });

});
