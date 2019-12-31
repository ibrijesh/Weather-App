console.log('Client Side Javascript');

fetch("https://puzzle.mead.io/puzzle").then((response) => {
    response.json().then((data) => {
        console.log(data);

    })
})

const weatherForm = document.querySelector('form');

const search = document.querySelector('input');

const messageOne = document.querySelector('#message-1');


const messageTwo = document.querySelector('#message-2');



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    console.log('Testing');

    console.log(location);

    messageOne.textContent = "";
    messageTwo.textContent = "Loading....";

    fetch("/weather?address=" + encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {

            if (data.error) {

                messageTwo.textContent = data.error;

                console.log(data.error);

            } else {

                messageOne.textContent = data.location;
                messageTwo.textContent = data.foreCast;
                console.log(data.location);
                console.log(data.foreCast);
            }

        })
    })



})