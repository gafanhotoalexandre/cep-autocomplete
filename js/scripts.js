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

