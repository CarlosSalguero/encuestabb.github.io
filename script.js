document.addEventListener('DOMContentLoaded', () => {
    // Reemplaza con tu endpoint de SheetDB
    const sheetDBEndpoint = 'https://sheetdb.io/api/v1/TU_API_ENDPOINT_DE_SHEETDB';

    const form = document.getElementById('predictionForm');
    const messageDiv = document.getElementById('message');
    const newPredictionButton = document.getElementById('newPredictionButton');

    // Función para actualizar los estilos de selección
    function updateSelectionStyles() {
        // Remover clases previas
        document.querySelectorAll('.option-card img').forEach(img => {
            img.classList.remove('selected-boy', 'selected-girl');
        });

        // Obtener el valor seleccionado
        const selectedGender = document.querySelector('input[name="gender"]:checked');

        if (selectedGender) {
            const imgElement = selectedGender.closest('.option-card').querySelector('img');
            if (selectedGender.value === 'Niño') {
                imgElement.classList.add('selected-boy');
            } else if (selectedGender.value === 'Niña') {
                imgElement.classList.add('selected-girl');
            }
        }
    }

    // Llamar a la función cuando se cambia la selección
    document.querySelectorAll('input[name="gender"]').forEach(input => {
        input.addEventListener('change', updateSelectionStyles);
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('nameInput').value.trim();
        const genderInput = form.elements['gender'].value;

        // Validar que se haya ingresado un nombre
        if (!name) {
            alert('Por favor, ingresa tu nombre antes de enviar.');
            return;
        }

        const confirmation = confirm(`¿Estás seguro de que será ${genderInput}?`);

        if (confirmation) {
            // Mostrar mensaje de agradecimiento
            messageDiv.classList.remove('hidden');

            // Crear el objeto de datos
            const data = {
                name: name,
                gender: genderInput,
                timestamp: new Date().toLocaleString()
            };

            // Enviar datos a SheetDB vía fetch
            fetch(sheetDBEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: data })
            })
            .then(response => response.json())
            .then(responseData => {
                console.log('Datos enviados correctamente:', responseData);
            })
            .catch(error => {
                console.error('Error al enviar los datos:', error);
            });

            // Limpiar el formulario y ocultarlo
            form.reset();
            form.classList.add('hidden');

            // Remover estilos de selección
            document.querySelectorAll('.option-card img').forEach(img => {
                img.classList.remove('selected-boy', 'selected-girl');
            });
        }
    });

    // Evento para el botón "Ingresar otro pronóstico"
    newPredictionButton.addEventListener('click', () => {
        // Mostrar el formulario y ocultar el mensaje
        form.classList.remove('hidden');
        messageDiv.classList.add('hidden');
    });
});
