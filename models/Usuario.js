const mongoose = require('mongoose');

const UsuariosSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellidos: {
        type: String,
        required: true,
        trim: true
    },
    numero: {
        type: Number,
        required: true,
        trim: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    area: {
        type: String,
        required: true,
        trim: true,
        default: "AGENTE"
    },
    plaza: {
        type: String,
        required: true,
        trim: true,
        default: "MONTERREY"
    },
    estatus: {
        type: String,
        required: true,
        trim:true,
        default:"INACTIVO"
    },
    creado: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Usuario', UsuariosSchema);