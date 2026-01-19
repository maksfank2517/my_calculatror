let currentMode = 'markup';

function update() {
    const resultEl = document.querySelector('.result');
    
    if (currentMode === 'markup') { // Оригинал: % наценки
        let initial = +document.querySelector('.initial-price').value;
        let final = +document.querySelector('.final-price').value;
        if (initial === 0 || isNaN(initial) || isNaN(final) || initial < 0 || final < 0) {
            resultEl.textContent = 'Ошибка';
            return;
        }
        let markup = ((final - initial) / initial) * 100;
        resultEl.textContent = Math.round(markup) + '%';
        
    } else if (currentMode === 'discount') { // Скидка: цена со скидкой
        let original = +document.querySelector('.original-price').value;
        let discount = +document.querySelector('.discount-percent').value;
        if (original === 0 || isNaN(original) || isNaN(discount) || original < 0 || discount < 0 || discount > 100) {
            resultEl.textContent = 'Ошибка';
            return;
        }
        let discounted = original * (1 - discount / 100);
        resultEl.textContent = discounted.toFixed(2) + ' руб.';
        
    } else if (currentMode === 'price-markup') { // Новая: цена + наценка %
        let base = +document.querySelector('.base-price').value;
        let markupPct = +document.querySelector('.markup-percent').value;
        if (base === 0 || isNaN(base) || isNaN(markupPct) || base < 0 || markupPct < 0) {
            resultEl.textContent = 'Ошибка';
            return;
        }
        let finalPrice = base * (1 + markupPct / 100);
        resultEl.textContent = finalPrice.toFixed(2) + ' руб.';
        
    } else if (currentMode === 'percent-of') { // Новая: процент от числа
        let part = +document.querySelector('.part-value').value;
        let total = +document.querySelector('.total-value').value;
        if (total === 0 || isNaN(part) || isNaN(total) || total < 0 || part < 0) {
            resultEl.textContent = 'Ошибка';
            return;
        }
        let percent = (part / total) * 100;
        resultEl.textContent = Math.round(percent) + '%';
    }
}

// Переключение (обновлено для всех кнопок)
document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.mode-btn.active').classList.remove('active');
        btn.classList.add('active');
        currentMode = btn.dataset.mode;
        
        // Скрыть все поля
        document.querySelectorAll('.calc-fields').forEach(field => {
            field.style.display = 'none';
        });
        
        // Показать нужные
        document.querySelector('.' + currentMode + '-fields').style.display = 'block';
        update();
    });
});

// Input обработчики для всех полей
document.addEventListener('input', (e) => {
    const fields = ['initial-price', 'final-price', 'original-price', 'discount-percent', 
                   'base-price', 'markup-percent', 'part-value', 'total-value'];
    if (fields.some(cls => e.target.classList.contains(cls))) {
        update();
    }
});

update();
