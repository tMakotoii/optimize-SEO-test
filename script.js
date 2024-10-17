// Находим все формы с классом quiz-form
const forms = document.querySelectorAll('.quiz-form');
let resultDivScore = document.getElementById('result-score');

let correctAnsCount = 0;
let isResultShown = false;

function getNoun(number, one, two, five) {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
        return `${ n } ${ five}`;
    }
    n %= 10;
    if (n === 1) {
        return `${ n } ${ one}`;
    }
    if (n >= 2 && n <= 4) {
        return `${ n } ${ two}`;
    }
    return `${ n } ${ five}`;
}

function getDescriptionText(point) {
    let descriptionSelector = document.getElementById(`point-${point}-description`)
    
    descriptionSelector.classList.remove('hidden')
}

forms.forEach((form, index) => {
    form.addEventListener('click', function(e) {
        // Проверяем, была ли нажата радиокнопка
        if (e.target.type === 'radio') {
            // Сброс состояния всех радиокнопок в форме
            form.querySelectorAll('input[type="radio"]').forEach(radio => {
                radio.disabled = false; // Восстановляем доступность всех радиокнопок
                radio.checked = false; // Сбрасываем состояние выбранного радиокнопки
            });

            // Устанавливаем состояние выбранного радиокнопки
            e.target.checked = true;

            form.querySelectorAll('input[type="radio"]').forEach(radio => {
                // Отключаем все радиокнопки, кроме выбранной
                if (radio !== e.target) {
                    radio.disabled = true;
                }
            });
            form.querySelectorAll('label').forEach(label => {
                label.classList.remove('selected', 'uncorrect');
            });

            // Добавляем классы в зависимости от значения радиокнопки
            if (e.target.value === 'correct') {
                e.target.nextElementSibling.classList.add('selected'); // Подсвечиваем label зеленым
                e.target.nextElementSibling.classList.add('score-marker');

                correctAnsCount++
                console.log(correctAnsCount)
                document.getElementById(`message${index * 2 + 1}`).classList.remove('hidden');
                document.getElementById(`message${index * 2 + 2}`).classList.add('hidden');
            } else {
                e.target.nextElementSibling.classList.add('uncorrect'); // Подсвечиваем label красным
                // Найдем и подсветим label радиокнопки с значением 'correct'
                const correctLabel = Array.from(form.querySelectorAll('input[type="radio"]')).find(radio => radio.value === 'correct').nextElementSibling;
                correctLabel.classList.add('selected'); // Подсвечиваем label зеленым

                document.getElementById(`message${index * 2 + 1}`).classList.add('hidden');
                document.getElementById(`message${index * 2 + 2}`).classList.remove('hidden');
            }
        }

        let selectedInputs = document.querySelectorAll('.selected').length;
    
        if (selectedInputs == forms.length && !isResultShown) {
            
            let score = document.querySelectorAll('.score-marker').length;
            let testResult = document.createElement('p');
            let descriptionResultWrapper = document.querySelector('.description-wrapper');
            let descriptionResult = document.createElement('div');

            testResult.innerHTML = `<b>Результат:</b> ${getNoun(score, 'балл', 'балла', 'баллов')} из ${forms.length}`;
            resultDivScore.appendChild(testResult);

            descriptionResultWrapper.appendChild(descriptionResult);
            testResult.classList.add('result-wrapper');
            
            getDescriptionText(score)

            isResultShown = true;
        }
    });
});