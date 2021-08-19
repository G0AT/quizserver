const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});

const conectarDB = async () => {
    try {
        //Función asincrona para conectar a la base de datos
        await mongoose.connect(process.env.DB_MONGO, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useFindAndModify: false, 
            useCreateIndex:true
        }, (err) => {

            //Validación de error para eliminar mensaje de datos deprecados
            if (err) { 
                console.log(err) 
            } else { 
                console.log('Base de datos conectada') 
            }
        });

    } catch (error) {
        console.log('Hubo un error');
        console.log(error)
        process.exit(1);
    }
}

module.exports = conectarDB;