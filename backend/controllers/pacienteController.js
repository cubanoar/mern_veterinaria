import Paciente from '../models/Paciente.js';
import { check, validationResult } from 'express-validator';

const agregarPaciente = async (req, res) => {
  try {
    const paciente = new Paciente(req.body);
    paciente.veterinario = req.veterinario._id;
    const pacienteGuardado = await paciente.save();
    res.json({ success: true, data: pacienteGuardado });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, msg: 'Ocurrio un error' });
  }
};

const obtenerPacientes = async (req, res) => {
  const pacientes = await Paciente.find({
    veterinario: req.veterinario._id,
  }).exec();
  res.json({ success: true, data: pacientes });
};

const obtenerPaciente = async (req, res) => {
  const { id } = req.params;

  try {
    const paciente = await Paciente.findById(id);

    //Lo pasamos a toString para la comparacion
    if (
      paciente.veterinario._id.toString() !== req.veterinario._id.toString()
    ) {
      return res
        .status(404)
        .json({ success: false, error: 'Ocurrio un error' });
    }
    res.json({ success: true, data: paciente });
  } catch (error) {
    return res.status(404).json({ success: false, error: 'Ocurrio un error' });
  }
};

const actualizarPaciente = async function (req, res) {
  const { id } = req.params;

  try {
    const paciente = await Paciente.findById(id).exec();

    //Debemos convertir a String para comparar
    if (
      paciente.veterinario._id.toString() !== req.veterinario._id.toString()
    ) {
      return res.json({ success: false, msg: 'Ocurrio un error' });
    }
    paciente.nombre = req.body.nombre || paciente.nombre;
    paciente.propietario = req.body.propietario || paciente.propietario;
    paciente.email = req.body.email || paciente.email;
    paciente.telefono = req.body.telefono || paciente.telefono;
    paciente.fecha = req.body.fecha || paciente.fecha;
    paciente.sintomas = req.body.sintomas || paciente.sintomas;

    await paciente.save();

    return res.json({ success: true, msg: 'Paciente actualizado' });
  } catch (error) {
    return res.status(404).json({
      success: false,
      msg: 'Ocurrio un error',
      error: error.message,
    });
  }
};

const eliminarPaciente = async (req, res) => {
  const { id } = req.params;

  try {
    const paciente = await Paciente.findById(id).exec();
    //Debemos convertir a String para comparar
    if (
      paciente.veterinario._id.toString() !== req.veterinario._id.toString()
    ) {
      return res.json({ success: false, msg: 'Ocurrio un error' });
    }

    await paciente.deleteOne();

    return res.json({ success: true, msg: 'Paciente eliminado' });
  } catch (error) {
    return res.status(404).json({
      success: false,
      msg: 'Ocurrio un error',
      error: error.message,
    });
  }
};

export {
  agregarPaciente,
  obtenerPacientes,
  obtenerPaciente,
  actualizarPaciente,
  eliminarPaciente,
};
