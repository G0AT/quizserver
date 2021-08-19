const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });

//Creamos un token para tener una sesión
const crearToken = (usuario, secreta, expiresIn) => {
    // console.log(usuario);
    const { id, numero, nombre, apellidos } = usuario;

    return jwt.sign( { id, numero, nombre, apellidos }, secreta, { expiresIn } )
}

//Resolvers
const resolvers = {
    Query: {
        obtenerUsuario: async (_, {}, ctx) => {
            return ctx.usuario;
        }, 
        obtenerUsuarios: async () => {
            try {
                const usuario = await Usuario.find({});
                return usuario;
            } catch (error) {
                console.log(error);
            }
        },
        obtenerUsuarioId: async (_, { id }) => {
            // revisar si el producto existe o no
            const usuario = await Usuario.findById(id);

            if(!usuario) {
                throw new Error('Usuario no encontrado');
            }

            return usuario;
        }
    },
    Mutation: {
        nuevoUsuario: async (_, { input } ) => {
            const { numero, password } = input;
            
            // Revisar si el usuario ya esta registrado
            const existeUsuario = await Usuario.findOne({numero});
            if (existeUsuario) {
                throw new Error('El usuario ya esta registrado');
            }

            // Hashear su password
            const salt = await bcryptjs.genSalt(10);
            input.password = await bcryptjs.hash(password, salt);

            try {
                 // Guardarlo en la base de datos
                const usuario = new Usuario(input);
                usuario.save(); // guardarlo
                return usuario;
            } catch (error) {
                console.log(error);
            }
        },
        nuevoUsuarioInterno: async (_, { input } ) => {
            const { numero, password } = input;
            
            // Revisar si el usuario ya esta registrado
            const existeUsuario = await Usuario.findOne({numero});
            if (existeUsuario) {
                throw new Error('El usuario ya esta registrado');
            }

            // Hashear su password
            const salt = await bcryptjs.genSalt(10);
            input.password = await bcryptjs.hash(password, salt);

            try {
                // Guardarlo en la base de datos
                const usuario = new Usuario(input);
                usuario.save(); // guardarlo
                return usuario;
            } catch (error) {
                console.log(error);
            }
        },
        autenticarUsuario: async (_, {input}) => {
            const { numero, password } = input;
            // Si el usuario existe
            const existeUsuario = await Usuario.findOne({numero});
            if (!existeUsuario) { throw new Error('El usuario o la contraseña son incorrectos'); }
            
            if(existeUsuario.estatus === 'INACTIVO') {
                throw new Error('Su cuenta está inactiva, comuniquese con el administrador');
            }

            // Revisar si el password es correcto
            const passwordCorrecto = await bcryptjs.compare( password, existeUsuario.password );
            if(!passwordCorrecto) { throw new Error('El usuario o la contraseña son incorrectos'); }

            // Crear el token
            return { token: crearToken(existeUsuario, process.env.SECRETA, '1h' ) }
            
        }
    }
}

module.exports = resolvers;