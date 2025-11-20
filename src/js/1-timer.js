// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

import iconFail from '../img/error.svg';

// обєкт параметрів
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        // вибираєм вибраний час
        const selectedTime = selectedDates[0].getTime();
        // і поточний час
        const nowTime = Date.now();

        // якщо вибраний час менше рівний поточному
        if (selectedTime <= nowTime) {
            refs.startBtn.disabled = true;
            userSelectedDate = null;

            // повертаєм з пакета ізітоаст метод еррор
            return iziToast.error({
                messageColor: "#FFFFFF",
                message: "Please choose a date in the future",
                backgroundColor: "#EF4040",
                iconUrl: iconFail,
                timeout: 5000,
                title: 'Error',
                titleColor: '#fff',
            })
        }
        // якщо ні то записуєм в юзер селектед дейт значення  в мс вибрану користувачем дату
        else {
            refs.startBtn.disabled = false;
            userSelectedDate = selectedDates[0];
        }
    },
};

// вибираєм ел з дом дерева
const refs = {
    startBtn: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
    field: document.querySelector('#datetime-picker'),
}


// новий екземпляр класу з пакету флетпікр
const createDatePicker = new flatpickr('#datetime-picker', options);
// кнопка  не актив
refs.startBtn.disabled = true;

const onStartHandle = evt => {
    refs.startBtn.disabled = true;

    // інтервал в 1с в якому щосекунди обробляється поточна дата і дата вибрана користувачем
    const timerId = setInterval(() => {
        const startTime = Date.now();
        const endTime = userSelectedDate.getTime();
        const timeDiff = endTime - startTime;
        refs.field.disabled = true;

// якщо значення обробки менше або рівне 0 то припиняєм виконання інтервалу і повертаєм інпут і кнопку в актив стан
        if (timeDiff <= 0) {
            clearInterval(timerId);

            refs.startBtn.disabled = false;
            refs.field.disabled = false;
            return;
        }
        convertedTime(convertMs(timeDiff));
    }, 1000)
}

// записуєм за допомогою контенттекст значення 
function convertedTime({ days, hours, minutes, seconds}){
    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
}

// добавляєм 0 якщо в рядку 1 символ  
function addLeadingZero(num) {
    return String(num).padStart(2, '0');
}

// оброблювач подій
refs.startBtn.addEventListener('click', onStartHandle);

// 00:00:00:00
let userSelectedDate = null;



// підрахунку значень
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
