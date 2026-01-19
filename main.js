let currentMode = 'markup';

function update() {
    const resultEl = document.querySelector('.result');
    
    if (currentMode === 'markup') {
        let initial = +document.querySelector('.initial-price').value;
        let final = +document.querySelector('.final-price').value;
        
        if (initial === 0 || isNaN(initial) || isNaN(final) || initial < 0 || final < 0) {
            resultEl.textContent = 'Ошибка';
            return;
        }
        let markup = ((final - initial) / initial) * 100;
        resultEl.textContent = Math.round(markup) + '%';
    } else {
        let original = +document.querySelector('.original-price').value;
        let discount = +document.querySelector('.discount-percent').value;
        
        if (original === 0 || isNaN(original) || isNaN(discount) || original < 0 || discount < 0 || discount > 100) {
            resultEl.textContent = 'Ошибка';
            return;
        }
        let discounted = original * (1 - discount / 100);
        resultEl.textContent = discounted.toFixed(2) + ' руб.';
    }
}


document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.mode-btn.active').classList.remove('active');
        btn.classList.add('active');
        currentMode = btn.dataset.mode;
        
        document.querySelector('.markup-fields').style.display = currentMode === 'markup' ? 'block' : 'none';
        document.querySelector('.discount-fields').style.display = currentMode === 'discount' ? 'block' : 'none';
        update();
    });
});


document.addEventListener('input', (e) => {
    if (e.target.classList.contains('initial-price') || 
        e.target.classList.contains('final-price') || 
        e.target.classList.contains('original-price') || 
        e.target.classList.contains('discount-percent')) {
        update();
    }
});

update();
