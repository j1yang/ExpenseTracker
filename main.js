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


// Transaction add radio button clicked, display as active

const btnIn = document.querySelector('.transaction-in__rad');
const btnOut = document.querySelector('.transaction-out__rad');

btnIn.addEventListener('click', ()=>{
  active(btnIn);
  btnOut.classList.remove('active');
});

btnOut.addEventListener('click', ()=>{
  active(btnOut);
  btnIn.classList.remove('active');
});


// transaction type radio clicked, determine in or out

const transactionIn = document.querySelector('.transaction-in__rad');
const transactionOut = document.querySelector('.transaction-out__rad');
var transactionType ='';

//transaction in rad clicked
transactionIn.addEventListener('click',()=>{
  transactionType = 'in';
});
//transaction out rad clicked
transactionOut.addEventListener('click',()=>{
  transactionType = 'out';
});



// add button click
const btnAdd = document.querySelector('.add-transaction__add');
const txtTitle = document.querySelector('.txtTransaction__title');
const txtAmount = document.querySelector('.txtTransaction__amount');
const txtYear = document.querySelector('.transaction__year');
const txtMonth = document.querySelector('.transaction__month');
const txtDay = document.querySelector('.transaction__day');

let TRANSACTION_LIST = [];

btnAdd.addEventListener('click', ()=>{
  if(!txtTitle.value || !txtAmount.value){
    return;
  }

  if(transactionType === 'in'){
    console.log(`${txtYear.value}, ${txtMonth.value}, ${txtDay.value}, ${txtTitle.value}, ${txtAmount.value}`);
    let transaction = {
      year: txtYear.value,
      month: txtMonth.value,
      day: txtDay.value,
      title: txtTitle.value,
      amount: txtAmount.value
    }

    //push transaction
    TRANSACTION_LIST.push(transaction);

    //local storage update
    updateDatabase();
    //update screen
    updateScreen();



  }else if(transactionType === 'out'){
    
  }else{
    console.log('select transaction type.');
    return;
  }
});