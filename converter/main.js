const url = 'https://api.exchangerate.host/latest';
const activeBtn = document.querySelectorAll('.btn-active');
const btnIn = document.querySelectorAll('.input-select .btn-value');
const tab = document.querySelector('.input-select');
const tab2= document.querySelector('.output-select');
const btnOut = document.querySelectorAll('.output-select .btn-value');
const curRateIn = document.querySelector('.input-area .currency-rate');
const curRateOut = document.querySelector('.output-area .currency-rate');
const inputIn = document.querySelector('.input-area .amount');
const inputOut = document.querySelector('.output-area .amount');
const menuBtn = document.querySelector('.hamburger');
const menu = document.querySelector('.nav-content ul');
const container = document.querySelector('.container');


function handleTab(e) {
  console.log(e.target)
  btnIn.forEach(btn => {
    btn.classList.remove('btn-active')
  })
  e.target.classList.add('btn-active')
}

function handleTab2(e) {
  btnOut.forEach(btn => {
    btn.classList.remove('btn-active')
  })
  e.target.classList.add('btn-active')
}


tab.addEventListener('click', handleTab)
tab2.addEventListener('click',handleTab2)


function fetchCurrency() {
  fetch(`${url}?base${e.target}`)
}