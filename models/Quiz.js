const mongoose = require('mongoose');

const QuizSchema = mongoose.Schema({
    nombreEncuesta: {
        type:String,
        required:true,
        trim:true,
        unique:true
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

module.exports = mongoose.model('Quiz', QuizSchema);