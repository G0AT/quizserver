const { gql } = require('apollo-server');

//Schema
const typeDefs = gql`

    type Usuario {
        id:ID
        nombre: String
        apellidos: String
        numero: Int
        password: String
        area: Area
        plaza: Plaza
        estatus: EstatusUsuario
        creado: String
    }

    enum EstatusUsuario {
        ACTIVO
        INACTIVO
    }

    enum Area {
        AGENTE
        ADMINISTRADOR
    }

    enum Plaza {
        GUADALAJARA
        HERMOSILLO
        MONTERREY
        PUEBLA
        QUERETARO
        TIJUANA
    }

    type Token {
        token: String
    }

    type Encuesta {
        id:ID
        nombreEncuesta: String
        creador: ID
        creado: String
    }

    type Preguntas {
        id:ID
        pregunta: String
        encuesta: ID
        creador: ID
        creado: String
    }

    type Respuesta {
        id:ID
        respuestas: String
        encuesta: ID
        pregunta: ID
        creador: ID
        creado: String
    }

    type RespuestaCorrecta {
        id:ID
        respuestasCorrectas: String
        encuesta: ID
        pregunta: ID
        creador: ID
        creado: String
    }

    #Inputs para mutations
    input UsuarioInput {
        nombre: String!
        apellidos: String!
        numero: Int!
        password: String!
        area: String!
        plaza: String!
        estatus: String!
    }

    input UsuarioInternoInput {
        nombre: String!
        apellidos: String!
        numero: Int!
        password: String!
        area: String!
        plaza: String!
        estatus: String!
    }

    input AutenticarInput {
        numero: Int!
        password: String!
    }

    input EncuestaInput {
        nombreEncuesta: String!
        creador:ID!
    }

    input PreguntasInput {
        pregunta: String
        encuesta:ID!
        creador:ID!
    }

    input RespuestaInput {
        respuestas: String!
        encuesta:ID!
        pregunta:ID!
        creador:ID!
    }

    input RespuestaCorrectaInput {
        respuestasCorrectas: String!
        encuesta:ID!
        pregunta:ID!
        creador:ID!
    }

    #Querys
    type Query {
        #usuarios
        obtenerUsuario: Usuario
        obtenerUsuarios: [Usuario]
        obtenerUsuarioId(id: ID!): Usuario

        #Encuesta
        obtenerEncuesta: [Encuesta]
        obtenerEncuestaId(id:ID!): Encuesta

        #Preguntas
        obtenerPreguntas: [Preguntas]
        obtenerPreguntasId(id:ID!): Preguntas

        #Respuestas
        obtenerRespuesta: [Respuesta]
        obtenerRespuestaId(id:ID!): Respuesta

    }

    type Mutation {
        #Usuarios
        nuevoUsuario(input:UsuarioInput):Usuario
        nuevoUsuarioInterno(input: UsuarioInternoInput): Usuario
        autenticarUsuario(input:AutenticarInput): Token

        #Encuestas
        nuevaEncuesta(input:EncuestaInput):Encuesta

        #Preguntas
        nuevaPregunta(input:PreguntasInput):Preguntas

        #Respuestas
        nuevaRespuesta(input:RespuestaInput):Respuesta

        #RespuestasCorrectas
        nuevaRespuestaCorrecta(input:RespuestaCorrectaInput):RespuestaCorrecta
    }
`;

module.exports = typeDefs;