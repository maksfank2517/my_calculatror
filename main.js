function update() {
    let initial = +document.querySelector('.initial-price').value;
    let final = +document.querySelector('.final-price').value;

    if (initial === 0 || isNaN(initial) || isNaN(final) || initial < 0 || final < 0) {
        document.querySelector('.result').textContent = 'Ошибка';
        return;
    }

    let markup = ((final - initial) / initial * 100);
    document.querySelector('.result').textContent = Math.round(markup) + '%';
}

update()

document.querySelector('.initial-price').addEventListener('input', update)

document.querySelector('.final-price').addEventListener('input', update)