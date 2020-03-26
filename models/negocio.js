'use strict';

// Dependencies
    const moment = require('moment');
    const Mongoose = require('mongoose');
    const Schema = Mongoose.Schema;

const negocioSchema = new Schema({
    nombre: String,
    activo: Boolean,
    ciudad: String,
    direccion: String,
    direccionb: String,
    domicilio: Boolean,
    email: String,
    horas: {
      startTime: String,
      endTime: String
    },
    horario: String,
    productos: String,
    revisado: Boolean,
    tags: [String],
    telefono: String,
    uniqueKey: String,
    whatsapp: String,
    date_created: { type: Date, default: moment.utc()}
});

// Exposing
    module.exports = Mongoose.model('negocio', negocioSchema);