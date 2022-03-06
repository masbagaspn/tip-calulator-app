const bill = document.getElementById('inp-bill');
const tipButtons = document.querySelectorAll('.btn-tip-select');
const tipCustom = document.getElementById('inp-tip');
const totalPeople = document.getElementById('inp-people');
const errorMessage = document.querySelector('.error-msg');
const results = document.querySelectorAll('.value');
const resetButton = document.querySelector('.btn-reset')

let billValue = 0.0;
let tipValue = 0.0;
let peopleValue = 1;

const validateFloat = s => {
    let rgx = /^[0-9]*\.?[0-9]*$/;
    return s.match(rgx)
} 

const validateInt = s => {
    let rgx = /^[0-9]*/;
    return s.match(rgx);
}

const handleClick = event => {
    tipButtons.forEach(btn => {
        btn.classList.remove('btn-active');

        if(event.target.innerHTML == btn.innerHTML){
            btn.classList.add('btn-active');
            tipValue = parseFloat(btn.innerHTML)/100;
        }
    })

    tipCustom.value = '';

    console.log(tipValue);
    calculateTip();
}

const setBillValue = () => {
    if(bill.value.includes(',')) bill.value.replace(',', '.');
    
    if(!validateFloat(bill.value)) bill.value = bill.value.substring(0, bill.value.length-1);

    billValue = parseFloat(bill.value) || 0;

    calculateTip();
}

const setTipCustomValue = () => {
    tipButtons.forEach(btn => btn.classList.remove('btn-active'));

    if(!validateInt(tipCustom.value)) tipCustom.value = tipCustom.value.substring(0, tipCustom.length - 1);

    tipValue = parseFloat(tipCustom.value/100);

    calculateTip();
}

const setPeopleValue = () => {
    if(!validateInt(totalPeople.value)) totalPeople.value = totalPeople.substring(0, totalPeople.value.length - 1);

    peopleValue = parseFloat(totalPeople.value);

    if(peopleValue <= 0){
        errorMessage.classList.add('show-error-message');
        setTimeout(() => {
            errorMessage.classList.remove('show-error-message');
        }, 3000);
    }

    calculateTip();
}

const calculateTip = () => {
    if(peopleValue > 0){
        let tipAmount = billValue * tipValue / peopleValue;
        let total = billValue * (tipValue + 1) / peopleValue;
        results[0].innerHTML = '$ ' + tipAmount.toFixed(2);
        results[1].innerHTML = '$ ' + total.toFixed(2);
    }
}

const reset = () => {
    bill.value = '';
    setBillValue();

    tipCustom.value = '';
    setTipCustomValue();

    totalPeople.value = '';
    peopleValue = 1;

    console.log(billValue);
    console.log(tipValue);
    console.log(peopleValue);

}

bill.addEventListener('input', setBillValue);
tipButtons.forEach(btn => btn.addEventListener('click', handleClick));
tipCustom.addEventListener('input', setTipCustomValue);
totalPeople.addEventListener('input', setPeopleValue);
resetButton.addEventListener('click', reset);

