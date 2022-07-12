

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
  const transactions = document.querySelector('.transactions__transaction');
  transactions.innerHTML = '';
  loadTransactions();
});

inFilter.addEventListener('click', ()=>{
  active(inFilter);
  disable([allFilter, outFilter]);
  filterTransaction('in');
});

outFilter.addEventListener('click', ()=>{
  active(outFilter);
  disable([inFilter, allFilter]);
  filterTransaction('out');
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



//add button click
//global variable
const btnAdd = document.querySelector('.add-transaction__add');
const txtTitle = document.querySelector('.txtTransaction__title');
const txtAmount = document.querySelector('.txtTransaction__amount');
const txtYear = document.querySelector('.transaction__year');
const txtMonth = document.querySelector('.transaction__month');
const txtDay = document.querySelector('.transaction__day');

let totalIn = 0, totalOut = 0, balance = 0;
let TRANSACTION_LIST = JSON.parse(localStorage.getItem('transactions'));

function clearInput(selctors){
  selctors.forEach((selector) => {
    selector.value = "";
  });
}

btnAdd.addEventListener('click', ()=>{
  if(!txtTitle.value || !txtAmount.value){
    return;
  }

  if(transactionType === 'in'){
    console.log(`${txtYear.value}, ${txtMonth.value}, ${txtDay.value}, ${txtTitle.value}, ${txtAmount.value}`);
    let transaction = {
      year: txtYear.value,
      month: txtMonth.value,
      date: txtDay.value,
      type: 'in',
      title: txtTitle.value,
      amount: txtAmount.value
    }

    if(TRANSACTION_LIST == null){
      TRANSACTION_LIST = [];
    }

    //push transaction
    TRANSACTION_LIST.push(transaction);

    //local storage update
    updateDatabase();

    //update screen
    updateScreen();
    disable([transactionIn,transactionOut]);

    location.reload();
    sectionAddTxn.classList.add('visible');

    //clear input
    clearInput([txtTitle, txtAmount, txtYear, txtMonth, txtDay]);

  }else if(transactionType === 'out'){
    console.log(`${txtYear.value}, ${txtMonth.value}, ${txtDay.value}, ${txtTitle.value}, ${txtAmount.value}`);
    let transaction = {
      year: txtYear.value,
      month: txtMonth.value,
      date: txtDay.value,
      type: 'out',
      title: txtTitle.value,
      amount: txtAmount.value
    }

    if(TRANSACTION_LIST == null){
      TRANSACTION_LIST = [];
    }

    //push transaction
    TRANSACTION_LIST.push(transaction);

    //local storage update
    updateDatabase();

    //update screen
    updateScreen();
    disable([transactionIn,transactionOut]);

    location.reload();

    //clear input
    clearInput([txtTitle, txtAmount, txtYear, txtMonth, txtDay]);

  }else{
    console.log('select transaction type.');
    return;
  }
});


function updateDatabase(){
  localStorage.setItem('transactions', JSON.stringify(TRANSACTION_LIST))
}



function updateScreen(){
  totalIn = parseFloat(calculateTotalByType('in'));
  totalOut = parseFloat(calculateTotalByType('out'));
  balance = Math.abs(totalIn - totalOut);

  const sign = (totalIn >= totalOut) ? '$' : '-$';
  //update display total
  let totalDisplay = document.querySelector('.display-total');
  totalDisplay.innerHTML = `<h2>${sign}${numberWithCommas(balance)}</h2>`

  //update home.total-in
  let totalInDisplay = document.querySelector('.display__in');
  let totalOutDisplay = document.querySelector('.display__out');

  totalInDisplay.innerHTML = `<h3>IN</h3>
                      <h2>+$${totalIn.toFixed(2)}</h2>`;

  //update home.total-out
  totalOutDisplay.innerHTML = `<h3>OUT</h3>
                      <h2>-$${totalOut.toFixed(2)}</h2>`;
}

function numberWithCommas(num) {
  return num.toLocaleString("en-US");
}

function calculateTotalByType(type){
  let total = 0;
  let transactions = JSON.parse(localStorage.getItem('transactions'));

  transactions.forEach(transaction => {
    if(transaction.type === type){
      total = parseFloat(total) + parseFloat(transaction.amount);
    }
  });

  return parseFloat(total).toFixed(2);
}


// Display Transactions
function showTransaction(title, amount, year, month, date, type){
  const colour = (type === 'in') ? 'green' : 'red';
  const sign = (type === 'in') ? '+' : '-';
  const script = `
  <div class="transaction">
    <div class="transaction__date">
      ${year}/${month}/${date}
    </div>
    <div class="transaction__title">
      ${title}
    </div>
    <div class="transaction__amount ${colour}">
      ${sign}$${amount}
    </div>`;
  
  const transactions = document.querySelector('.transactions__transaction');
  transactions.insertAdjacentHTML('afterbegin', script);
}

function loadTransactions(){
  let transactions = JSON.parse(localStorage.getItem('transactions'));

  if(transactions == null) return;
  transactions.forEach((transaction) => {
    showTransaction(transaction.title, transaction.amount, 
      transaction.year, transaction.month, transaction.date,
      transaction.type);
  });
}

// Transaction filters
function filterTransaction(type){
  if(TRANSACTION_LIST == null){
    return;
  }
  const transactions = document.querySelector('.transactions__transaction');
  transactions.innerHTML = '';
  TRANSACTION_LIST.forEach((transaction) =>{
    if(transaction.type == type){
      showTransaction(transaction.title, transaction.amount, transaction.year, 
        transaction.month, transaction.date, transaction.type);
    }
  });
}






// DOM onload
document.onload = init();

function init() {
  //Init screen
  updateScreen();
  loadTransactions();
}