const calc = require('../src/calc');

let output = document.getElementById('output');

document.addEventListener('submit', event => {
    event.preventDefault();

    let nums = Array.from(document.querySelectorAll('.input-number')).map(el => +el.value).sort();
    let exp = calc(nums, 24);

    output.removeAttribute('hidden');
    if (exp) {
        output.textContent = `${exp} 😜`;
        output.classList.remove('error');
    }
    else {
        output.textContent = 'No Result. 😭';
        output.classList.add('error');
    }

});