/*
let str = `
  One: 'Hi Mary.' Two:'Oh, hi.'
One: 'How are you doing?'
Two: 'I'm doing alright. How about you?'
    One:'Not too bad. The weather is great isn't it?'
    Two:'Yes. It's absolutely beautiful today.'
One: 'I wish it was like this more frequently.'
Two: 'Me too.'
One: 'So where are you going now?'
Two: 'I'm going to meet a friend of mine at the department store.'
One: 'Going to do a little shopping?'
Two: 'Yeah, I have to buy some presents for my parents.'
One: 'What's the occasion?'
    Two: 'It's their anniversary.'
One: 'That's great. Well, you better get going. You don't want to be late.'
Two: 'I'll see you next time.'
One: 'Sure. Bye.'
`;

const pattern = /([^a-z?.]')|('[^a-z?])/gi;
console.log(str.replace(pattern, '"'));
*/

class Form {
  constructor (formSelector) {
    this.form = formSelector;
    this.values = {};
    this.patterns = {
      name: /[a-z,А-яЁё]/gi,
      phone: /\+7\(\d{3}\)\d{3}-\d{4}/g,
      email: /([\w\d.-]{4,20})@(\w{4,8}).(\w{2,6})/,
    };
    this.init();
  }

  #getFormElem () {
    return document.querySelector(this.form);
  }

  #getInputsElem () {
    return this.#getFormElem().querySelectorAll('.form__input');
  }

  #getInputsValue () {
    const inputs = this.#getInputsElem();
    for (const input of inputs) {
      this.values[input.id.substr(4).toLowerCase()] = input.value;
    }
  }

  #checkValid (field, value, type) { //принимает поле и тип поля для проверки
    if (this.patterns[type].test(value)) {
      field.style.borderColor = 'green';
    } else {
      field.style.borderColor = 'red';
    }
    const returnToDefault = setTimeout(() => {
      field.style.borderColor = 'black';
      clearTimeout(returnToDefault);
    }, 5000);
  }

  #setSubmitHandler () {
    const form = this.#getFormElem();
    form.addEventListener('submit', evt => {
      evt.preventDefault();
      this.#getInputsValue();
      for (const value in this.values) {
        this.#checkValid(form.querySelector(this.form + `__${value}`), this.values[value], value);
      }
    });
  }

  init () {
    this.#setSubmitHandler();
  }
}

const validForm = new Form('.form');

/*
const form = document.querySelector('.form');
const formName = form.querySelector('.form__name');
const formTel = form.querySelector('.form__tel');
const formEmail = form.querySelector('.form__email');
// +7(953)463-5675 my_mail@mail.ru

const formBtn = document.querySelector('#form-submit');
formBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  checkValidation(formName.value, formTel.value, formEmail.value);
});

function checkValidation (name, tel, email) {
  // проверка имени
  if (!(/[a-zа-яА-Я]/gi.test(name)) || '') {
    formName.style.borderColor = 'red';
  } else {
    formName.style.borderColor = 'green';
  }
  // проверка телефона
  if (!(/([+][\d]{1})([(][\d]{3})([)])([\d]{3})([-])([\d]{4})/g).test(tel) || '') {
    formTel.style.borderColor = 'red';
  } else {
    formTel.style.borderColor = 'green';
  }
  // проверка почты
  if (!(/([\w.-]{5,20})([@])([\w]{4,10}.)([\w]{2,6})/).test(email) || '') {
    formEmail.style.borderColor = 'red';
  } else {
    formEmail.style.borderColor = 'green';
  }

  const returnToDefault = setTimeout(() => {
    [formName, formTel, formEmail].forEach(elem => {
      elem.style.borderColor = 'black';
      clearTimeout(returnToDefault);
    });
  }, 5000);
}
*/
