// models.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tareaSchema = new Schema({
  id: {
    type: Number,
    unique: true,
  },
  descripcion: String,
  completado: Boolean,
});

const Tarea = mongoose.model('Tarea', tareaSchema);

module.exports = Tarea;
