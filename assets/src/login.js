const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

function blurHandler(event) {
  checkValidationOfInput(event);
}

function checkValidationOfInput(event) {
  var inputElement = event.target;
  switch (inputElement.id) {
    case 'email':
      if (
        inputElement.value.includes('@') &&
        inputElement.value.includes('.')
      ) {
        checkValidInput(inputElement);
      } else checkInvalidInput(inputElement);
      break;
    case 'password':
      if (inputElement.value.length < 6) {
        checkInvalidInput(inputElement);
      } else checkValidInput(inputElement);
      break;

    default:
      console.log('loi');
  }
}

function checkInvalidInput(inputElement) {
  inputElement.classList.add('form-input--error');
  var errorMessage = inputElement.parentElement.querySelector('.error-message');
  errorMessage.style.display = 'block';
}

function checkValidInput(inputElement) {
  inputElement.classList.remove('form-input--error');
  var errorMessage = inputElement.parentElement.querySelector('.error-message');
  errorMessage.style.display = 'none';

  for (var i = 0; i < inputElements.length; ++i) {
    inputElements[i].classList.remove('form-input--error');
  }
}

function inputHandler(event) {
  checkValidationOfInput(event);
  var errorForm = document.querySelector('.error');
  errorForm.style.display = 'none';
}

async function submitHandler(event) {
  event.preventDefault();
  const email = event.target.email.value;
  const password = event.target.password.value;
  const formData = {
    email,
    password,
  };
  try {
    const response = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const error = new Error('An error occurred while fetching the events');
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }
    const resData = await response.json();
    localStorage.setItem('token', resData.token);
    window.location.assign('./profile.html');
  } catch (error) {
    var errorForm = document.querySelector('.error');
    errorForm.innerText = error.info.message;
    errorForm.style.display = 'block';

    for (var i = 0; i < inputElements.length; ++i) {
      inputElements[i].classList.add('form-input--error');
    }
  }
}

const token = localStorage.getItem('token');
if (token) {
  window.location.assign('./profile.html');
}

var form = document.querySelector('.login-form form');
form.onsubmit = submitHandler;

var inputElements = document.querySelectorAll('.form-input');
var inputElementsLength = inputElements.length;
for (var i = 0; i < inputElementsLength; ++i) {
  inputElements[i].onblur = blurHandler;
  inputElements[i].oninput = inputHandler;
}

/**
 * JS toggle
 *
 * Cách dùng:
 * <button class="js-toggle" toggle-target="#box">Click</button>
 * <div id="box">Content show/hide</div>
 */
function initJsToggle() {
  console.log(123);
  $$('.js-toggle').forEach((button) => {
    const target = button.getAttribute('toggle-target');
    if (!target) {
      document.body.innerText = `Cần thêm toggle-target cho: ${button.outerHTML}`;
    }
    button.onclick = () => {
      if (!$(target)) {
        return (document.body.innerText = `Không tìm thấy phần tử "${target}"`);
      }
      const isHidden = $(target).classList.contains('hide');

      requestAnimationFrame(() => {
        $(target).classList.toggle('hide', !isHidden);
        $(target).classList.toggle('show', isHidden);
      });
    };
  });
}

window.addEventListener('template-loaded', initJsToggle());
