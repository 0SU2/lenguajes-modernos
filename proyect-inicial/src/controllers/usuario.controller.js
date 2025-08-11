import db from './../firebase.js';

export const getUsuarios = async(req, res) => {
  const userCollection = await db.collection('usuarios').get();
  const usuarios = userCollection.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))
  res.json(usuarios);
};

export const addUsuario = async(req, res) => {
  const { nombre, apaterno, amaterno, direccion, email } = req.body;
  const userAdded = await db.collection('usuarios').add({
    nombre, apaterno, amaterno, direccion, email
  });
  res.json({ id: userAdded.id });
};

export const updateUsuario = async(req, res) => {
  try {
    const { id } = req.params;
    const datosUpdate = req.body;
    await db.collection('usuarios').doc(id).update(datosUpdate);
    res.json({
      status: 'success',
      id
    })
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
}

export const deleteUsuario = async(req, res) => {
  try {
    const { id } = req.params;
    await db.collection('usuarios').doc(id).delete();
    res.json({
      status: 'success',
    })
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
}