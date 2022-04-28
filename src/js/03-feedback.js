var throttle = require('lodash.throttle');


const STORAGE_KEY = "feedback-form-state";
const formData = {};

const refs = {
    form: document.querySelector('.feedback-form'),
    inputEmail: document.querySelector('.feedback-form label input'),
    textarea: document.querySelector('.feedback-form label textarea')
}

populateForm();


refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onTextInput, 500));


function onFormSubmit(e) {
    e.preventDefault();
    e.target.reset();
    localStorage.removeItem(STORAGE_KEY);
    console.log(formData);
}

function onTextInput(e) {
    const name = e.target.name;
    const massage = e.target.value;

    formData[name] = massage;
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateForm() {
    const savedMassage = localStorage.getItem(STORAGE_KEY);

    if (savedMassage) {
        const { email, message } = JSON.parse(savedMassage);

        refs.inputEmail.value = email;
        refs.textarea.value = message;
    }
}