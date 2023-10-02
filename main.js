let langOption = document.querySelectorAll('select');
let fromText = document.querySelector('.fromText');
let transText = document.querySelector('.toTranslate');
let fromVoice = document.querySelector('.from');
let toVoice = document.querySelector('.to');
let cpyBtn = document.querySelector('.bx-copy');
let countValue = document.querySelector('.code_length');

langOption.forEach((select, index) => {
    for (let countryCode in language) {
        let selected = '';

        if ((index === 0 && countryCode === "en-GB") || (index === 1 && countryCode === "hi-IN")) {
            selected = 'selected';
        }

        let option = `<option value="${countryCode}" ${selected}>${language[countryCode]}</option>`;
        select.insertAdjacentHTML('beforeend', option);
    }
});

fromText.addEventListener('input', function() {
    let content = fromText.value;
    let fromContent = langOption[0].value;
    let transContent = langOption[1].value;

    let transLINK = `https://api.mymemory.translated.net/get?q=${content}&langpair=${fromContent}|${transContent}`;

    fetch(transLINK)
        .then(response => response.json())
        .then(data => {
            transText.value = data.responseData.translatedText;
        })
        .catch(error => {
            console.error('Translation error:', error);
        });
});

fromVoice.addEventListener('click', function() {
    let fromTalk;
    fromTalk = new SpeechSynthesisUtterance(fromText.value);
    fromTalk.lang = langOption[0].value;
    speechSynthesis.speak(fromTalk);
})

toVoice.addEventListener('click', function() {
    let fromTalk;
    fromTalk = new SpeechSynthesisUtterance(transText.value);
    fromTalk.lang = langOption[1].value;
    speechSynthesis.speak(fromTalk);
})

cpyBtn.addEventListener('click', function() {
    navigator.clipboard.writeText(transText.value);
})

fromVoice.addEventListener('keyup', function() {
    countValue.innerHTML = `${fromText.value.length}`;
});