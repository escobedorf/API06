const Usuario = require('../models/usuarios.model');

// POST - Crear un usuario
exports.crearUsuario = async (req, res) => {
  const { nombre, usuario, email, clave } = req.body;
  try {
    if (!nombre || !usuario || !email || !clave) {
      return res.status(400).json({
        estado: 0,
        mensaje: "Solicitud incorrecta - Faltan parámetros (nombre, usuario, email y clave son obligatorios)"
      });
    }

    const usuarioExistente = await Usuario.findOne({ where: { usuario } });
    const emailExistente = await Usuario.findOne({ where: { email } });

    if (usuarioExistente || emailExistente) {
      return res.status(400).json({
        estado: 0,
        mensaje: "Usuario o correo electrónico ya existen en la base de datos"
      });
    }

    const usuarioCreado = await Usuario.create({ nombre, usuario, email, clave });
    return res.status(201).json({
      estado: 1,
      mensaje: "Usuario creado correctamente",
      usuario: usuarioCreado
    });
  } catch (error) {
    return res.status(500).json({
      estado: 0,
      mensaje: "Ocurrió un error desconocido",
      error: error.message
    });
  }
};

// GET - Obtener todos los usuarios
exports.obtenerTodosLosUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json({
      estado: 1,
      mensaje: "Usuarios encontrados",
      usuarios: usuarios
    });
  } catch (error) {
    res.status(500).json({
      estado: 0,
      mensaje: "Ocurrió un error desconocido",
      error: error.message
    });
  }
};

// GET - Un usuario por ID
exports.obtenerUsuarioPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({
        estado: 0,
        mensaje: "Usuario no encontrado"
      });
    }
    return res.status(200).json({
      estado: 1,
      mensaje: "Usuario encontrado correctamente",
      usuario: usuario
    });
  } catch (error) {
    res.status(500).json({
      estado: 0,
      mensaje: "Ocurrió un error desconocido",
      error: error.message
    });
  }
};

// Actualizar Usuario
exports.actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, usuario, email, clave } = req.body;

  try {
    const usuarioEncontrado = await Usuario.findByPk(id);
    if (usuarioEncontrado === null) {
      res.status(404).json({
        estado: 0,
        mensaje: "Usuario no encontrado"
      });
    } else {
      if (nombre === undefined || usuario === undefined || email === undefined || clave === undefined) {
        res.status(400).json({
          estado: 0,
          mensaje: "Faltan parámetros (nombre, usuario, email y clave son obligatorios)"
        });
      } else {
        // Verificar que 'usuario' es una cadena antes de asignarlo
        if (typeof usuario !== 'string') {
          res.status(400).json({
            estado: 0,
            mensaje: "El campo 'usuario' debe ser una cadena de texto"
          });
        } else {
          usuarioEncontrado.nombre = nombre;
          usuarioEncontrado.usuario = usuario; // Aquí se asigna el valor del campo 'usuario' desde req.body
          usuarioEncontrado.email = email;
          usuarioEncontrado.clave = clave;
          await usuarioEncontrado.save();
          res.status(200).json({
            estado: 1,
            mensaje: "Usuario actualizado correctamente",
            usuario: usuarioEncontrado
          });
        }
      }
    }
  } catch (error) {
    res.status(500).json({
      estado: 0,
      mensaje: "Ocurrió un error desconocido"
    });
  }
};



// Eliminar Usuario
exports.eliminarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({
        estado: 0,
        mensaje: "Usuario no encontrado"
      });
    }
    await usuario.destroy();
    return res.status(200).json({
      estado: 1,
      mensaje: "Usuario eliminado correctamente"
    });
  } catch (error) {
    res.status(500).json({
      estado: 0,
      mensaje: "Ocurrió un error desconocido",
      error: error.message
    });
  }
};
