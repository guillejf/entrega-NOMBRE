import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;

let usuarios = [
  { id: "0", nombre: "guille", edad: 40 },
  { id: "1", nombre: "carla", edad: 41 },
  { id: "2", nombre: "ditto", edad: 0 },
];

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

//INICIO ENDPOINT USUARIOS
app.get("/usuarios", (req, res) => {
  const nombre = req.query.nombre;
  const edad = req.query.edad;

  if (!nombre || !edad) {
    return res.status(200).json(usuarios);
  }
  const usuariosEncontrados = usuarios.filter((u) => {
    if (u.nombre == nombre && u.edad == edad) {
      return u;
    }
  });
  return res.status(200).json(usuariosEncontrados);
});

app.get("/usuarios/:id", (req, res) => {
  const id = req.params.id;
  const usuarioEncontrado = usuarios.find((u) => u.id == id);

  if (usuarioEncontrado) {
    return res.status(200).json(usuarioEncontrado);
  } else {
    return res.status(400).json({
      error: "usuario no encontrado con el id " + id,
    });
  }
});

//modificar
app.put("/usuarios/:id", (req, res) => {
  const datosNuevosUsuario = req.body;
  if (datosNuevosUsuario.id) {
    return res.status(400).json({
      error: "data incorrecta. por favor no intenta modificar el id",
    });
  }

  const id = req.params.id;
  const indiceEncontrado = usuarios.findIndex((u) => u.id == id);

  if (indiceEncontrado == -1) {
    return res.status(400).json({
      message: "usuario no encontrado con el id " + id,
    });
  }
  usuarios[indiceEncontrado] = {
    id: usuarios[indiceEncontrado].id,
    ...datosNuevosUsuario,
  };

  return res.status(201).json({ message: "usuario modificado!!" });
});

//borrar
app.delete("/usuarios/:id", (req, res) => {
  const id = req.params.id;
  const indiceEncontrado = usuarios.findIndex((u) => u.id == id);

  if (indiceEncontrado == -1) {
    return res.status(400).json({
      message: "imposible borrarlo. usuario no encontrado con el id " + id,
    });
  }

  usuarios = usuarios.filter((u) => u.id != id);
  return res.status(200).json({ message: "usuario eliminado" });
});

//crear
app.post("/usuarios", (req, res) => {
  const usuarioRecibido = req.body;
  usuarios.push({
    id: (Math.random() * 1000000000000).toFixed(0),
    ...usuarioRecibido,
  });
  return res.status(201).json({ message: "usuario creado!!" });
});
//FIN ENDPOINT USUARIOS
