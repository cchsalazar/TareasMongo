// cli.js
const mongoose = require('mongoose');
const tareasController = require('./tareasController');

mongoose.connect('mongodb://localhost/tareasmongo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        const command = process.argv[2];

        if (command === 'add') {
            const descripcion = process.argv[3];
            if (!descripcion) {
                console.error('Descripción es un campo requerido para agregar una tarea.');
                process.exit(1);
            }
            tareasController.agregarTarea(descripcion)
                .then((tarea) => {
                    console.log('Tarea agregada:', tarea);
                    process.exit(0);
                })
                .catch((error) => {
                    console.error('Error al agregar la tarea:', error);
                    process.exit(1);
                });
        } else if (command === 'list') {
            tareasController.listarTareas()
                .then((tareas) => {
                    console.log('Lista de tareas:');
                    tareas.forEach((tarea, index) => {
                        console.log(`${index + 1}. ID: ${tarea.id}, Descripción: ${tarea.descripcion}, Completado: ${tarea.completado}`);
                    });
                    process.exit(0);
                })
                .catch((error) => {
                    console.error('Error al obtener la lista de tareas:', error);
                    process.exit(1);
                });
        } else if (command === 'complete') {
            const tareaId = process.argv[3];

            if (!tareaId || isNaN(parseInt(tareaId, 10))) {
                console.error('ID es un campo requerido y debe ser un número para completar una tarea.');
                process.exit(1);
            }

            tareasController.completarTarea(tareaId)
                .then((tarea) => {
                    if (!tarea) {
                        console.log('Tarea no encontrada');
                    } else {
                        console.log('Tarea marcada como completada:', tarea);
                    }
                    process.exit(0);
                })
                .catch((error) => {
                    console.error('Error al marcar la tarea como completada:', error);
                    process.exit(1);
                });
        } else {
            console.log('Comando no válido. Usos válidos: "add", "list", "complete".');
            process.exit(1);
        }
    })
    .catch((error) => {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1);
    });
