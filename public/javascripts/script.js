document.addEventListener('DOMContentLoaded', () => {

  let logInButton = document.getElementById('log-in');
  let formContainer = document.querySelector('.singup-or-login');
  let message = document.querySelector('.fail-message');

  if(logInButton === null){
    return;
  }

  logInButton.onclick = ()=>{
    formContainer.style.marginLeft = '-315px';
  };

  if(message.innerText == 'Incorrect email or password.'){
    formContainer.style.marginLeft = '-315px';
  }

}, false);

document.addEventListener('DOMContentLoaded', ()=>{
  //CREATE MATERIAL PANEL
  let addMaterialButton = document.querySelectorAll('.create-material');
  let createMaterialPanel = document.querySelector('.setup-material');
  let cancel = document.querySelector('.cancel');

  let addMaterialButtonImg = document.querySelector('.add-img');
  let hideShow = false;

  if(cancel === null){
    return;
  }

  addMaterialButton.forEach((el)=>{
    el.addEventListener('click', ()=>{
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
  });

  cancel.addEventListener('click', ()=>{
    createMaterialPanel.style.display = 'none';
    addMaterialButtonImg.setAttribute('src', '../images/plus.png');
    hideShow = false;
    return;
  });
});

document.addEventListener('DOMContentLoaded', ()=>{

  let textureInput = document.querySelectorAll('.upload-texture');

  if(textureInput.length === 0){
    return;
  }

  textureInput.forEach((el)=>{
    el.addEventListener('change', ()=>{
      if(el.id == 'diff'){
        changeAddMaterialButton(el.id);
      }
      if(el.id == 'spec'){
        changeAddMaterialButton(el.id);
      }
      if(el.id == 'emis'){
        changeAddMaterialButton(el.id);
      }
      if(el.id == 'ambi'){
        changeAddMaterialButton(el.id);
      }
      if(el.id == 'opac'){
        changeAddMaterialButton(el.id);
      }
      if(el.id == 'normal'){
        changeAddMaterialButton(el.id);
      }
      if(el.id == 'bump'){
        changeAddMaterialButton(el.id);
      }
      if(el.id == 'disp'){
        changeAddMaterialButton(el.id);
      }
      if(el.id == 'refl'){
        changeAddMaterialButton(el.id);
      }
      if(el.id == 'refr'){
        changeAddMaterialButton(el.id);
      }
    });
  });

  function changeAddMaterialButton(className){
    let button = document.querySelector('.'+className);
    button.style.background = '#a682ff';
    button.firstChild.setAttribute('src', '/images/plus.png');
    console.log(button);
  }

});