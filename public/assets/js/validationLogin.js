document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    
    event.preventDefault();
    
    clearErrors();

    let usuario = document.getElementById('usuario').value;
    let contraseña = document.getElementById('contraseña').value;
    
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "usuario": usuario,
                    "contraseña": contraseña
                })
            });

            if (response.ok) {
                alert('Credenciales correctas. Bienvenido');
                               
                window.location.href = "/views/catalogo.html";
            } else {
                const result = await response.json();
                alert(result.error);
            }
        } catch (error) {
            console.log('Error:', error);
            alert('Ocurrió un error al iniciar sesión con sus credenciales. Intente otra vez');
        }
});
function clearErrors() {
    let errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(function(el) {
        el.innerText = '';
    });
}
