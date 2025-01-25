document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.element');
    const elementDetails = document.getElementById('element-details');
    const searchInput = document.getElementById('search');

    elements.forEach(element => {
        element.addEventListener('click', () => {
            elements.forEach(el => el.classList.remove('selected'));
            element.classList.add('selected');
            const name = element.getAttribute('data-name');
            const symbol = element.getAttribute('data-symbol');
            const number = element.getAttribute('data-number');
            const group = element.getAttribute('data-group');
            elementDetails.innerHTML = `<strong>Name:</strong> ${name}<br>
                                        <strong>Symbol:</strong> ${symbol}<br>
                                        <strong>Atomic Number:</strong> ${number}<br>
                                        <strong>Group:</strong> ${group}`;
        });
    });

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        elements.forEach(element => {
            const name = element.getAttribute('data-name').toLowerCase();
            const symbol = element.getAttribute('data-symbol').toLowerCase();
            const number = element.getAttribute('data-number').toLowerCase();
            if (name.includes(query) || symbol.includes(query) || number.includes(query)) {
                element.style.display = 'flex';
            } else {
                element.style.display = 'none';
            }
        });
    });
});
