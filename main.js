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


//when on of filters clicked, activate filter.
function active(selector){
  selector.classList.add('active');
};

function disable(selectors){
  selectors.forEach(element => {
    element.classList.remove('active');
  });
};


const allFilter = document.querySelector('.filter-all');
const inFilter = document.querySelector('.filter-in');
const outFilter = document.querySelector('.filter-out');

allFilter.addEventListener('click', ()=>{
  active(allFilter);
  disable([inFilter, outFilter]);
});

inFilter.addEventListener('click', ()=>{
  active(inFilter);
  disable([allFilter, outFilter]);
});

outFilter.addEventListener('click', ()=>{
  active(outFilter);
  disable([inFilter, allFilter]);
});


