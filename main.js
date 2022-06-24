const BtnAddTransaction = document.querySelector('.transactions__add-btn');
const sectionAddTxn = document.querySelector('#add-transaction');
BtnAddTransaction.addEventListener('click', ()=>{
  sectionAddTxn.classList.add('visible');
  scrollIntoView('#add-transaction');
  });

function scrollIntoView(selector){
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({behavior: 'smooth'});
}