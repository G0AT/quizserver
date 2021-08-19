const mongoose = require('mongoose');

const AnswersSchema = mongoose.AnswersSchema({
    respuestas: {
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
    creador: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Usuario'
    },
    creado: {
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model('Answers', AnswersSchema);