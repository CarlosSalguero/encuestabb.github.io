document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('predictionForm');
    const messageDiv = document.getElementById('message');
    const newPredictionButton = document.getElementById('newPredictionButton');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('nameInput').value.trim();
        const gender = form.elements['gender'].value;

        const confirmation = confirm(`¿Estás seguro de que será ${gender}?`);

        if (confirmation) {
            // Mostrar mensaje de agradecimiento
            messageDiv.classList.remove('hidden');

            // Enviar datos a Google Sheets
            const scriptURL = 'https://script.google.com/macros/s/AKfycbxKqydbGRZqJ0NQQE2Li5_7kq8X5OQg6sAC90vb0NmkR4HdJMweVNiLNcAselwKYz0h/exec';
            fetch(scriptURL, {
                method: 'POST',
                body: JSON.stringify({ name, gender }),
                headers: { 'Content-Type': 'application/json' },
            })
            .then(response => {
                console.log('Datos enviados correctamente:', response);
            })
            .catch(error => {
                console.error('Error al enviar los datos:', error);
            });

            // Limpiar el formulario y ocultarlo
            form.reset();
            form.classList.add('hidden');
        }
    });

    // Evento para el botón "Ingresar otro pronóstico"
    newPredictionButton.addEventListener('click', () => {
        // Mostrar el formulario y ocultar el mensaje
        form.classList.remove('hidden');
        messageDiv.classList.add('hidden');
    });
});
