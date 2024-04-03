const adviceIdElement = document.getElementById("adviceNum");
const quoteTextElement = document.getElementById("quote");
const button = document.getElementById('moreAdvice');
const form = document.getElementById('form');

let getAdvice = () => {
    fetch('https://api.adviceslip.com/advice')
        .then(response => response.json())
        .then(data => {
            adviceIdElement.innerText = `${data.slip.id}`;
            quoteTextElement.innerText = `"${data.slip.advice}"`;
        });
}

button.addEventListener('click', () => {
    // Start progress animation
    button.disabled = true;
    button.classList.add('loading');

    // Fetch advice
    getAdvice();

    // Stop progress animation after 2 seconds
    setTimeout(() => {
        button.disabled = false;
        button.classList.remove('loading');
    }, 2000);
});

getAdvice();

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (event.target[0].value === '') {
        return;
    }

    const id = event.target[0].value
    form.reset();


    fetch(`https://api.adviceslip.com/advice/${id}`)
        .then(response => response.json())
        .then(data => {
            adviceIdElement.innerText = `${data.slip.id}`;
            quoteTextElement.innerText = `"${data.slip.advice}"`;
        });
});