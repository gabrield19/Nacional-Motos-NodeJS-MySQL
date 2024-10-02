document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    console.log("iniciando validaciones");
    event.preventDefault();
    
    clearErrors();

    let nombrecompleto = document.getElementById('nombrecompleto').value;
    let cedula = document.getElementById('cedula').value;
    let email = document.getElementById('email').value;
    let celular = document.getElementById('celular').value;
    let usuario = document.getElementById('usuario').value;
    let contraseña = document.getElementById('contraseña').value;
    let contraseñaconfirmacion = document.getElementById('contraseñaconfirmacion').value;

    let isValid = true;

    if (!validatenombrecompleto(nombrecompleto)) {
        showError('nombrecompletoError', 'El nombre completo no debe contener caracteres especiales no permitidos.');
        alert("El nombre completo no debe contener caracteres especiales no permitidos");
        isValid = false;
    }

    if (!validatecedula(cedula)) {
        showError('cedulaError', 'El número de documento debe ser estrictamente un número.');
        alert("El número de documento debe ser estrictamente un número");
        isValid = false;
    }

    if (!validateEmail(email)) {
        showError('emailError', 'Ingrese un correo electrónico válido.');
        isValid = false;
    }

    if (!validatecelular(celular)) {
        showError('celularError', 'Ingrese un número de teléfono válido.');
        isValid = false;
    }

    if (!validateusuario(usuario)) {
        showError('usuarioError', 'El nombre de usuario no debe contener caracteres especiales.');
        isValid = false;
    }

    if (!validatecontraseña(contraseña)) {
        showError('contraseñaError', 'La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, un número y un carácter especial permitido.');
        isValid = false;
    }

    if (contraseña !== contraseñaconfirmacion) {
        showError('contraseñaconfirmacionError', 'Las contraseñas no coinciden.');
        isValid = false;
    }

    
    if (isValid) {
        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "nombrecompleto": nombrecompleto,
                    "cedula": cedula,
                    "email": email,
                    "celular": celular,
                    "usuario": usuario,
                    "contraseña": contraseña
                })
            });

            if (response.ok) {
                alert('Registro completado exitosamente.');
                document.getElementById('registrationForm').reset();
                resetStrengthBar();
            } else {
                const result = await response.json();
                alert(result.error);
            }
        } catch (error) {
            console.log('Error:', error);
            alert('Ocurrió un error al registrar el usuario, intente de nuevo.');
        }
    }
});


document.getElementById('contraseña').addEventListener('input', function() {
    let contraseña = document.getElementById('contraseña').value;
    let strengthBar = document.getElementById('contraseñaStrength');
    strengthBar.className = 'contraseña-strength'; 
    showError('contraseñaError', '');

    if (contraseña === '') {
        return;  
    }

    if (contraseña.length < 8) {
        strengthBar.classList.add('strength-weak');
        showError('contraseñaError', 'La contraseña debe tener al menos 8 caracteres.');
    } else {
        
        const hasUpperCase = /[A-Z]/.test(contraseña);
        const hasNumber = /\d/.test(contraseña);
        const hasSpecialChar = /[@$!%*?&.,:;]/.test(contraseña);

        if (hasUpperCase && hasNumber && hasSpecialChar) {
            if (contraseña.length >= 12) {
                strengthBar.classList.add('strength-strong');
                showError('contraseñaError', 'La contraseña es muy segura.');
            } else if (contraseña.length >= 10) {
                strengthBar.classList.add('strength-good');
                showError('contraseñaError', 'La contraseña es segura.');
            } else {
                strengthBar.classList.add('strength-fair');
                showError('contraseñaError', 'La contraseña es débil.');
            }
        } else {
            
            strengthBar.classList.add('strength-weak');
            showError('contraseñaError', 'La contraseña es débil. Debe incluir al menos una mayúscula, un número y un carácter especial.');
        }
    }
});


function resetStrengthBar() {
    let strengthBar = document.getElementById('contraseñaStrength');
    strengthBar.className = 'contraseña-strength'; 
    showError('contraseñaError', ''); 
}

function validatenombrecompleto(nombre) {
    let nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return nameRegex.test(nombre);
}

function validatecedula(cedula) {
    let cedulaRegex = /^[0-9]+$/;
    return cedulaRegex.test(cedula);
}

function validateEmail(email) {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatecelular(celular) {
    let celularRegex = /^[0-9]{10}$/;
    return celularRegex.test(celular);
}

function clearErrors() {
    let errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(function(el) {
        el.innerText = '';
    });
}

function showError(elementId, message) {
    document.getElementById(elementId).innerText = message;
}

function validateusuario(usuario) {
    let usuarioRegex = /^[a-zA-Z0-9_.-]+$/;
    return usuarioRegex.test(usuario);
}

function validatecontraseña(contraseña) {
    let contraseñaRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return contraseñaRegex.test(contraseña);
}