const mongoose = require('mongoose');

const CorrectAnswerSchema = mongoose.CorrectAnswerSchema({
    respuestasCorrectas: {
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    encuesta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz'
    },
    pregunta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Questions'
    },
    respuesta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answers'
    },
    creador: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Usuario'
    },
    creado: {
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model('CorrectAnswer', CorrectAnswerSchema);