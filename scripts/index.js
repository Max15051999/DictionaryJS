'use strict'

var url = 'https://dictionary-p8gg.onrender.com/';
var delayInput = document.getElementById('delay');
var delayMills = 1000;
var btn = document.getElementById('send');
var isSending = false;
var interval;

btn.addEventListener('click', () => {
    if (isSending) {
        isSending = false;
        btn.innerHTML = 'Start Sending';
        btn.style.background = 'gray';

        delayInput.disabled = false;

        clearInterval(interval);
    } else {
        delayMills = delayInput.value * 1000 * 60;

        if (delayMills === 0) {
            alert('Вы задали задержку между запросами');
            return;
        }

        isSending = true;
        btn.innerHTML = 'Stop Sending';
        btn.style.background = 'darkgreen';
        delayInput.disabled = true;

        interval = setInterval(() => {
                fetch(url, {mode: 'no-cors'})
                .then(response => {
                    if (!response.ok)
                        throw new Error('Ошибка HTTP: ' + response.status);
                    return true;
                  })
                  .then(data => {
                    console.log('OK');
                  }).catch(error => {
                    console.log(`ERROR: ${error}`);
                  });
        }, delayMills);
    }
});