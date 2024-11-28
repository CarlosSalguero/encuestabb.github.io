$(document).ready(function() {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxKqydbGRZqJ0NQQE2Li5_7kq8X5OQg6sAC90vb0NmkR4HdJMweVNiLNcAselwKYz0h/exec'; // Reemplaza con tu URL
    const form = $('#predictionForm');
    const messageDiv = $('#message');
    const newPredictionButton = $('#newPredictionButton');

    form.on('submit', function(event) {
        event.preventDefault();

        const name = $('#nameInput').val().trim();
        const gender = $('input[name="gender"]:checked').val();

        const confirmation = confirm(`¿Estás seguro de que será ${gender}?`);

        if (confirmation) {
            // Mostrar mensaje de agradecimiento
            messageDiv.removeClass('hidden');

            // Serializar datos del formulario
            const data = form.serialize();

            // Enviar datos al script de Google Apps vía GET
            $.ajax({
                url: scriptURL + '?' + data,
                method: "GET",
                dataType: "json",
                success: function(response) {
                    console.log('Datos enviados correctamente:', response);
                },
                error: function(error) {
                    console.error('Error al enviar los datos:', error);
                }
            });

            // Limpiar el formulario y ocultarlo
            form[0].reset();
            form.addClass('hidden');
        }
    });

    // Evento para el botón "Ingresar otro pronóstico"
    newPredictionButton.on('click', function() {
        // Mostrar el formulario y ocultar el mensaje
        form.removeClass('hidden');
        messageDiv.addClass('hidden');
    });
});
