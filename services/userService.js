const UserRepository = require('../repositories/userRepository');

class UserService {
    async registerUser(userData) {
        const { cedula, usuario } = userData;

        // Verificar si ya existe un usuario con la misma cédula
        const existingUserBycedula = await UserRepository.findBycedula(cedula);
        if (existingUserBycedula) {
            throw new Error('La cédula ' +cedula + ' ya está registrada. Ingrese otra identificación');
        }

        // Verificar si ya existe un usuario con el mismo username
        const existingusuarioByusuario = await UserRepository.findByusuario(usuario);
        if (existingusuarioByusuario) {
            throw new Error('El nombre de usuario ya está en uso, ingrese uno diferente.');
        }

        // Si todo es correcto, proceder a registrar el usuario
        return UserRepository.createUser(userData);
    }

    async loginUser(userData) {
        const { contraseña, usuario } = userData;
        
        // Verificar si ya existe un usuario con el mismo username
        const existingusuarioByusuario = await UserRepository.findByusuario(usuario);
        console.log(existingusuarioByusuario)
        if (existingusuarioByusuario==null || existingusuarioByusuario.contraseña!==contraseña) {
            throw new Error('Error en usuario usuario o contraseña. Intente de nuevo');
        }
    }
}

module.exports = new UserService();
