'use strict';

// Dependencies
  const moment = require('moment');
  const Mongoose = require('mongoose');
  const Schema = Mongoose.Schema;

const contactSchema = new Schema({
  nombre: String,
  email: String,
  mensaje: String,
  date_created: { type: Date, default: moment.utc()}
});

// Exposing
  module.exports = Mongoose.model('contact', contactSchema);