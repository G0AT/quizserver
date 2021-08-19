const { ApolloServer } = require('apollo-server');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');
const conectarDB = require('./config/db');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: 'variables.env'});

//Conectar a base de datos
conectarDB();

//Servidor
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => {
        // Pasamos la autorización o un caracter vacío
        const token = req.headers['authorization'] || '';

        //Validación de existencia del token
        if(token){
            //Cacheo que ejecuta la verificación del token
            try {
                //transportamos los datos dentro del jwt remplazando la cabecera original, añadimos la palabra secreta para asegurar una conexión permitida
                const usuario = jwt.verify(token.replace('Bearer ', ''), process.env.SECRETA);

                //Retornamos los datos existentes en la constante del usuario
                return{
                    usuario
                }
            } catch (error) {
                // Atrapamos los errores que puedan existir
                console.log(error);
            }
        }
    }
});

//Iniciador del servidor
server.listen().then( ( {url} ) => {
    console.log(`Servidor ejecutandose en la url: ${url}`);
});