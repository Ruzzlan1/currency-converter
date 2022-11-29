let inCur, outCur;
const url = 'https://api.exchangerate.host/latest';
const activeBtn = document.querySelectorAll('.btn-active');
const btnIn = document.querySelectorAll('.input-select .btn-value');
const btnOut = document.querySelectorAll('.output-select .btn-value');
const curRateIn = document.querySelector('.input-area .currency-rate');
const curRateOut = document.querySelector('.output-area .currency-rate');
const inputIn = document.querySelector('.input-area .amount');
const inputOut = document.querySelector('.output-area .amount');
let curApiRateIn, curApiRateOut;

activeBtn.forEach((item, index) => {
    if (index == 0)
        inCur = item.value;
    if (index == 1)
        outCur = item.value;
});


const callApi = async (e) => {
    if (inCur == outCur) {
        curApiRateIn = 1;
        curApiRateOut = 1;
    }
    const resIn = await fetch(`${url}?base=${inCur}&symbols=${outCur}`);
    const resOut = await fetch(`${url}?base=${outCur}&symbols=${inCur}`);
    const dataIn = await resIn.json();
    const dataOut = await resOut.json();
    curApiRateIn = await Object.values(dataIn.rates)[0];
    curApiRateOut = await Object.values(dataOut.rates)[0];
    appendRate(e);
}


function appendRate(e) {
    curRateIn.textContent = `1 ${inCur} = ${curApiRateIn} ${outCur}`;
    curRateOut.textContent = `1 ${outCur} = ${curApiRateOut} ${inCur}`;
    if (e == 'output-select') {
        if (inputOut.value != '') {
            inputOut.value = +(inputIn.value.replaceAll(" ", "") * curApiRateIn).toFixed(6).substring(0, 13);
        } else {
            inputOut.value = '';
        }
    }
    if (e == 'input-select') {
        if (inputIn.value != '') {
            inputIn.value = +(inputOut.value.replaceAll(" ", "") * curApiRateOut).toFixed(6).substring(0, 13);
        } else {
            inputIn.value = '';
        }
    }
}
inputIn.addEventListener('keyup', (e) => {
    if (e.target.value.length < 14) {
        if (e.target.value == '') {
            inputOut.value = "";
        }
        inputOut.value = +(e.target.value.replaceAll(" ", "") * curApiRateIn).toFixed(6).substring(0, 13);
    }
});

inputOut.addEventListener('keyup', (e) => {
    if (e.target.value.length < 14) {
        if (e.target.value == '') {
            inputIn.value = '';
        }
        inputIn.value = +(e.target.value.replaceAll(" ", "") * curApiRateOut).toFixed(6).substring(0, 13);
    }
});

// call every event Listener in one function
eventListener();

function eventListener() {
    btnIn.forEach(item => item.addEventListener('click', changeCurIn));
    btnOut.forEach(item => item.addEventListener('click', changeCurOut));
}

function changeCurIn(e) {
    const activeBtnIn = document.querySelectorAll('.input-select .btn-active');
    activeBtnIn.forEach(item => item.classList.remove('btn-active'));
    e.target.classList.add('btn-active');
    inCur = e.target.value;
    callApi(e.target.parentElement.classList[1]);
}

function changeCurOut(e) {
    const activeBtnOut = document.querySelectorAll('.output-select .btn-active');
    activeBtnOut.forEach(item => item.classList.remove('btn-active'))
    e.target.classList.add('btn-active');
    outCur = e.target.value;
    callApi(e.target.parentElement.classList[1]);
}


