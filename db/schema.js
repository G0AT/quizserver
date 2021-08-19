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

    #Querys
    type Query {
        obtenerUsuario: Usuario
        obtenerUsuarios: [Usuario]
        obtenerUsuarioId(id: ID!): Usuario
    }

    type Mutation {
        nuevoUsuario(input:UsuarioInput):Usuario
        nuevoUsuarioInterno(input: UsuarioInternoInput): Usuario
        autenticarUsuario(input:AutenticarInput): Token
    }
`;

module.exports = typeDefs;