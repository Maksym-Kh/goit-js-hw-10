// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

import iconFail from '../img/error.svg';

import iconSuccess from '../img/success.svg';

// вибираєм ел з дом дерева
const refs = {
    delayInput: document.querySelector('.delay-input'),
    fullFilledBtn: document.querySelector('[value="fulfilled"]'),
    rejectedBtn: document.querySelector('[value="rejected"]'),
    submitBtn: document.querySelector('.form-btn'),
    form: document.querySelector('.form'),
}

// колбек обробник подій
function onSubmitBtn(evt) {
    // виключаєм дефолт поведінку
    evt.preventDefault();

    // записуєм в змінні значення радіокнопки і інпуту 
    const delay = evt.currentTarget.elements.delay.value;
    const formStatus = evt.currentTarget.elements.state.value;

    //  оброблює те що повернула функ createPromise
    createPromise(delay, formStatus).then((result) => {
        // якщо фулфілд то повертаєм метод пакету ізітоаст саксес
                    return iziToast.success({
                                messageColor: "#FFFFFF",
                                message: `Fulfilled promise in ${result}ms`,
                                backgroundColor: "#59A10D",
                                iconUrl: iconSuccess,
                                timeout: 5000,
                                title: 'Success',
                                titleColor: '#fff',
            })
// якщо режектед то повертаєм метод пакету ізітоаст еррор
    }).catch((err) => {
                    return iziToast.error({
                                messageColor: "#FFFFFF",
                                message: `Rejected promise in ${err}ms`,
                                backgroundColor: "#EF4040",
                                iconUrl: iconFail,
                                timeout: 5000,
                                title: 'Error',
                                titleColor: '#fff',
            })
    });
}

//промісіфікація
function createPromise(delay, formStatus) {
    // повертаєм новий екземпляр класу проміс
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        //    якщо значення змінної фулфілд то через ресолв повертаєм значення затримки
        if (formStatus === 'fulfilled') {
            resolve(delay);

        }
        // якщо ні то повертаєм  через режект  значення затримки
        else {
            reject(delay);

}
            // скільки часу вибрав користувач
    }, delay)
    });
 
}
// оброблювач події сабміт на форму
refs.form.addEventListener('submit', onSubmitBtn);