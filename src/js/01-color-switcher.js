

const refs = {
    body: document.querySelector('body'),
    btnStart: document.querySelector('[data-start]'),
    btnStop: document.querySelector('[data-stop]'),
}

let timerId = null;

refs.btnStart.addEventListener('click', onBtnStart);
refs.btnStop.addEventListener('click', onBtnStop);


function onBtnStart() {

    timerId = setInterval(changeColorBody, 500);

    function changeColorBody() {
        refs.btnStart.setAttribute('disabled', '');
        refs.body.style.backgroundColor = getRandomHexColor();
    
    }

    function getRandomHexColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }
}

function onBtnStop() {
    clearInterval(timerId);
    refs.btnStart.removeAttribute('disabled', '');

}

