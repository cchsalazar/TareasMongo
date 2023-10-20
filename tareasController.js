// tareasController.js
const Tarea = require('./models');

async function getSiguienteTareaId() {
  const counter = await Tarea.findOne({}, {}, { sort: { id: -1 } });
  if (counter) {
    return counter.id + 1;
  } else {
    return 1;
  }
}

module.exports = {
  agregarTarea: async (descripcion) => {
    const id = await getSiguienteTareaId();
    const nuevaTarea = new Tarea({
      id,
      descripcion,
      completado: false,
    });
    return nuevaTarea.save();
  },

  listarTareas: () => {
    return Tarea.find();
  },

  completarTarea: (tareaId) => {
    return Tarea.findOneAndUpdate({ id: tareaId }, { completado: true }, { new: true });
  },
};
