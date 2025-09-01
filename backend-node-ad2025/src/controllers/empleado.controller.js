import empleadoServices from "../services/empleado.services.js";

export default {
  async create(req, res) {
    try {
      const result = await empleadoServices.createEmpleado(req.body);
      res.status(200).json({
        message: 'success',
        result
      })
    } catch (error) {
      res.status(500).json({
        error: error.message
      })
    }
  },

  async update(req, res) {
    try {
      // revisar si es params o body
      const { id } = req.params;
      const result = await empleadoServices.updateEmpleado(id, req.body);
      res.status(200).json({
        message: 'success',
        result
      })
    } catch (error) {
      res.status(500).json({
        error: error.message
      })
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await empleadoServices.deleteEmpleado(id);
      res.status(200).json({
        message: 'success',
        result
      })
    } catch (error) {
      res.status(500).json({
        error: error.message
      })
    }
  },

  async getAll(req, res) {
    try {
      const result = await empleadoServices.getAll();
      res.status(200).json({
        message: 'success',
        result
      })
    } catch (error) {
      res.status(500).json({
        error: error.message
      })
    }
  },

  async login(req, res) {
    try {
      const {usuario, password} = req.body
      const result = await empleadoServices.login(usuario, password);
      res.status(200).json({
        token: result.token,
        message: 'success'
      });
    } catch (error) {
      res.status(500).json({
        error: error.message
      })
    }
  }
}