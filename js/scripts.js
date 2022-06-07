const fadeElement = document.querySelector('#fade');

const addressForm = document.querySelector('#address-form');
const cepInput = document.querySelector('#cep');
const addressInput = document.querySelector('#address');
const cityInput = document.querySelector('#city');
const neighborhoodInput = document.querySelector('#neighborhood');
const regionInput = document.querySelector('#region');
const formInputs = document.querySelectorAll('[data-input]');

const closeButton = document.querySelector('#close-message');

// validate CEP input
cepInput.addEventListener('keypress', (event) => {
  const onlyNumbers = /[0-9]/;
  const key = String.fromCharCode(event.keyCode);

  // allow only numbers
  if (!onlyNumbers.test(key)) {
    event.preventDefault();
    return;
  }
});

// get address event
cepInput.addEventListener('keyup', event => {
  const inputValue = event.target.value;

  // check if we have the correct length
  if (inputValue.length === 8) getAddress(inputValue);
});

// close modal message
closeButton.addEventListener('click', () => {
  toggleMessage();
});

// get costumer address from api
async function getAddress(cep) {
  toggleLoader();
  cepInput.blur();

  // request
  const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;

  const response = await fetch(apiUrl);
  const data = await response.json();

  // show error and reset form
  if (data.erro === 'true') {
    // add disabled attribute
    if (!addressInput.hasAttribute('disabled')) toggleDisabled();

    addressForm.reset();
    toggleLoader();
    // show error message
    toggleMessage('CEP inválido, tente novamente.');
    return;
  }

  // remove disabled
  if(addressInput.value === '') toggleDisabled();

  // fill the inputs
  addressInput.value = data.logradouro;
  cityInput.value = data.localidade;
  neighborhoodInput.value = data.bairro;
  regionInput.value = data.uf;

  toggleLoader();
}

// show or hide loader
function toggleLoader() {
  const loaderElement = document.querySelector('#loader');

  fadeElement.classList.toggle('hide');
  loaderElement.classList.toggle('hide');
}

// show or hide message
function toggleMessage(message = '') {
  const messageElement = document.querySelector('#message');
  const messageElementText = document.querySelector('#message p');

  messageElementText.innerText = message;

  fadeElement.classList.toggle('hide');
  messageElement.classList.toggle('hide');
}

// add or remove disabled attribute
function toggleDisabled() {
  if (regionInput.hasAttribute('disabled')) {
    formInputs.forEach(input => input.removeAttribute('disabled'));
  } else {
    formInputs.forEach(input => input.setAttribute('disabled', 'disabled'));
  }
}
