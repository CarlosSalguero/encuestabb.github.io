// script.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('voteForm');
    const thankYouMessage = document.getElementById('thankYouMessage');
    const anotherVoteButton = document.getElementById('anotherVoteButton');
    const optionCards = document.querySelectorAll('.option-card');
    const nameInput = document.getElementById('nameInput');

    // Reemplaza 'TU_API_ENDPOINT_DE_SHEETDB' con tu endpoint de SheetDB
    const sheetdbEndpoint = 'https://sheetdb.io/api/v1/TU_API_ENDPOINT_DE_SHEETDB';

    // Resaltar la opción seleccionada
    optionCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remover la clase 'selected' de todas las tarjetas
            optionCards.forEach(c => c.classList.remove('selected'));
            // Agregar la clase 'selected' a la tarjeta clickeada
            card.classList.add('selected');
            // Marcar el input radio correspondiente
            card.querySelector('input[type="radio"]').checked = true;
        });
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Obtener los datos ingresados por el usuario
        const name = nameInput.value.trim();
        const gender = form.gender.value;

        if (!name) {
            alert('Por favor, ingresa tu nombre.');
            return;
        }

        // Crear el objeto de datos
        const data = {
            name: name,
            gender: gender,
            timestamp: new Date().toISOString()
        };

        console.log('Datos del voto:', data);

        // Enviar los datos a SheetDB
        fetch(sheetdbEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: data }),
        })
        .then(response => response.json())
        .then(result => {
            console.log('Éxito:', result);
            // Mostrar mensaje de agradecimiento
            form.classList.add('hidden');
            thankYouMessage.classList.remove('hidden');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ocurrió un error al enviar tus datos. Por favor, intenta nuevamente.');
        });
    });

    anotherVoteButton.addEventListener('click', () => {
        // Reiniciar el formulario
        form.reset();
        nameInput.value = '';
        optionCards.forEach(c => c.classList.remove('selected'));
        // Mostrar el formulario nuevamente
        form.classList.remove('hidden');
        thankYouMessage.classList.add('hidden');
    });
});
