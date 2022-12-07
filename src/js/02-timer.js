
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


// const flatpickr = require("flatpickr");

const refs = {
    input: document.querySelector('#datetime-picker'),
    btnStart: document.querySelector('[data-start]'),
    day: document.querySelector('[data-days]'),
    hour: document.querySelector('[data-hours]'),
    minute: document.querySelector('[data-minutes]'),
    second: document.querySelector('[data-seconds]'),
}




let dateTime = null;
let intervalID = null;

// const chosedDate = selectedDates[0];
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < new Date()) {
            refs.btnStart.setAttribute('disabled', '');
            // window.alert('Please choose a date in the future');
            Notiflix.Report.failure(
  'no',
  'date',
  'close',
  {
    width: '360px',
    svgSize: '120px',
  },
);
            return
        }
        else {
            refs.btnStart.removeAttribute('disabled');
            dateTime = selectedDates[0];

        }
          
  },
};
flatpickr(refs.input, options);

refs.btnStart.addEventListener('click', onStart);


function onStart() {
    setInterval(() => {
        const disDate = dateTime - new Date();
        // console.log(dateTime - new Date());

        if (disDate < 0) {
            clearInterval(intervalID);
            return
        }
        
        const timeComponents = convertMs(disDate);
        // console.log(timeComponents);

        refs.day.textContent = timeComponents.days;
        refs.hour.textContent = timeComponents.hours;
        refs.minute.textContent = timeComponents.minutes;
        refs.second.textContent = timeComponents.seconds;
    }, 1000);


    
    
}



function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}


function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

