$(document).ready(function() {
    // Reemplaza con tu endpoint de SheetDB
    const sheetDBEndpoint = 'https://sheetdb.io/api/v1/uqvya4tsk9owo';

    const form = $('#predictionForm');
    const messageDiv = $('#message');
    const newPredictionButton = $('#newPredictionButton');

    // Función para actualizar los estilos de selección
    function updateSelectionStyles() {
        // Remover clases previas
        $('.option-card img').removeClass('selected-boy selected-girl');

        // Obtener el valor seleccionado
        const selectedGender = $('input[name="gender"]:checked').val();

        if (selectedGender === 'Niño') {
            // Añadir clase al elemento seleccionado
            $('input[name="gender"]:checked').siblings('img').addClass('selected-boy');
        } else if (selectedGender === 'Niña') {
            $('input[name="gender"]:checked').siblings('img').addClass('selected-girl');
        }
    }

    // Llamar a la función cuando se cambia la selección
    $('input[name="gender"]').on('change', updateSelectionStyles);

    form.on('submit', function(event) {
        event.preventDefault();

        const name = $('#nameInput').val().trim();
        const gender = $('input[name="gender"]:checked').val();

        // Validar que se haya ingresado un nombre
        if (!name) {
            alert('Por favor, ingresa tu nombre antes de enviar.');
            return;
        }

        const confirmation = confirm(`¿Estás seguro de que será ${gender}?`);

        if (confirmation) {
            // Mostrar mensaje de agradecimiento
            messageDiv.removeClass('hidden');

            // Enviar datos a SheetDB vía POST
            $.ajax({
                url: sheetDBEndpoint,
                method: 'POST',
                data: {
                    data: {
                        name: name,
                        gender: gender,
                        timestamp: new Date().toLocaleString()
                    }
                },
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

            // Remover estilos de selección
            $('.option-card img').removeClass('selected-boy selected-girl');
        }
    });

    // Evento para el botón "Ingresar otro pronóstico"
    newPredictionButton.on('click', function() {
        // Mostrar el formulario y ocultar el mensaje
        form.removeClass('hidden');
        messageDiv.addClass('hidden');
    });
});
