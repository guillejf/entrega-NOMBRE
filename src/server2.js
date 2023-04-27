import express from "express";
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function generateNewId() {
  return (Math.random() * 10000000000000).toFixed(0);
}

let usuarios = [
  { id: 6141957526164 + "", nombre: "guille", edad: 40 },
  { id: 6141957526165 + "", nombre: "monica", edad: 21 },
  { id: 6141957526166 + "", nombre: "ditto", edad: 0 },
];

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

//INICIO ENDPOINT USUARIOS
//GET TODOS LOS USUARIOS SIMPLE O CON FILTROS
app.get("/usuarios", (req, res) => {
  const nombre = req.query.nombre;
  const edad = req.query.edad;

  if (!nombre || !edad) {
    return res.status(200).json({
      status: "ok",
      message: "todos los usuarios",
      data: usuarios,
    });
  }
  const usuariosEncontrados = usuarios.filter((u) => {
    if (u.nombre == nombre && u.edad == edad) {
      return u;
    }
  });
  return res.status(200).json({
    status: "ok",
    message: "usuarios econtrados con sus parametros de busqueda",
    data: usuariosEncontrados,
  });
});

//GET DE UN USUARIO POR ID
app.get("/usuarios/:id", (req, res) => {
  const id = req.params.id;
  const usuario = usuarios.find((u) => u.id == id);
  if (usuario) {
    return res
      .status(200)
      .json({ status: "ok", message: "usuario enontrado", data: usuario });
  } else {
    return res.status(400).json({
      status: "error",
      message: "usuario no encontrado con el id " + id,
    });
  }
});

//DELETE DE UN USUARIO POR ID
app.post("/usuarios/", (req, res) => {
  if (!req.body.nombre) {
    return res
      .status(400)
      .json({ status: "error", message: "el nombre es obligatorio" });
  }
  const newUser = {
    id: generateNewId(),
    ...req.body,
  };
  usuarios.push(newUser);
  return res
    .status(201)
    .json({ status: "ok", message: "usuario creado con exito", data: newUser });
});

//MODIFICACION DE UN USUARIO POR ID
app.put("/usuarios/:id", (req, res) => {
  const userDataToUpdate = req.body;
  if (!req.body.nombre || req.body.id) {
    return res.status(400).json({
      status: "error",
      message: "chequea los datos obligatorios y no enviar id",
    });
  }
  const id = req.params.id;
  let indiceUsuarioEncontrado = usuarios.findIndex((u) => u.id == id);
  if (indiceUsuarioEncontrado == -1) {
    return res.status(400).json({
      status: "error",
      message: "usuario no encontrado con el id " + id,
    });
  }
  usuarios[indiceUsuarioEncontrado] = {
    ...usuarios[indiceUsuarioEncontrado],
    ...userDataToUpdate,
  };
  return res.status(200).json({
    status: "ok",
    message: "usuario editado con exito",
    data: usuarios[indiceUsuarioEncontrado],
  });
});

//DELETE DE UN USUARIO POR ID
app.delete("/usuarios/:id", (req, res) => {
  const id = req.params.id ?? -1;
  const usuario = usuarios.find((u) => u.id == id);
  if (usuario) {
    usuarios = usuarios.filter((u) => u.id != id);
    return res.status(200).json({ status: "ok", message: "usuario borrado" });
  } else {
    return res.status(400).json({
      status: "error",
      message:
        "usuario no encontrado, imposible borrar con el id indicado: " + id,
    });
  }
});
//FIN ENDPOINT USUARIOS
