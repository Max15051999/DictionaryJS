'use strict'

var urlInput = document.getElementById('url');;
var delayInput = document.getElementById('delay');
var url = '';
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
        urlInput.disabled = false;

        clearInterval(interval);
    } else {
        url = urlInput.value.trim();
        delayMills = delayInput.value * 1000 * 60;

        if (url.length === 0) {
            alert('Вы не задали ссылку');
            return;
        }

        if (delayMills === 0) {
            alert('Вы не задали задержку между запросами');
            return;
        }

        isSending = true;
        btn.innerHTML = 'Stop Sending';
        btn.style.background = 'darkgreen';
        delayInput.disabled = true;
        urlInput.disabled = true;

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