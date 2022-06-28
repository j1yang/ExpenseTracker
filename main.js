// Btn add-transaction clicked, 
// scroll down to add transaction section
const BtnAddTransaction = document.querySelector('.transactions__add-btn');
const sectionAddTxn = document.querySelector('#add-transaction');
BtnAddTransaction.addEventListener('click', ()=>{
  sectionAddTxn.classList.add('visible');
  scrollIntoView('#add-transaction');
  });


// BtnClose click, close add-transaction section and 
// scroll up to transactions
const btnClose = document.querySelector('.add-transaction__close');
btnClose.addEventListener('click', ()=>{
  scrollIntoView('#transactions');
  sectionAddTxn.classList.remove('visible');
});

function scrollIntoView(selector){
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({behavior: 'smooth'});
}


// menu hamburger clicked, show navbar menu
const menuIcon = document.querySelector('.navbar__toggle-btn');
const navbarMenu = document.querySelector('#navbar');
menuIcon.addEventListener('click', ()=>{
  navbarMenu.classList.toggle('open');
});

