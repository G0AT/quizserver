const mongoose = require('mongoose');

const QuestionsSchema = mongoose.Schema({
    pregunta: {
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    encuesta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz'
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

module.exports = mongoose.model('Questions', QuestionsSchema);