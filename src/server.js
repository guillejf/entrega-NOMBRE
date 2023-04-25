import express from "express";
const app = express();
const port = 3000;

let usuarios = [
  { id: 0, nombre: "guille", edad: 40 },
  { id: 0, nombre: "guille", edad: 41 },
  { id: 1, nombre: "ditto", edad: 0 },
];

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

//INICIO ENDPOINT USUARIOS
app.get("/usuarios", (req, res) => {
  const nombre = req.query.nombre;
  const edad = req.query.edad;

  if (!nombre || !edad) {
    return res.json(usuarios);
  }
  const usuariosEncontrados = usuarios.filter((u) => {
    if (u.nombre == nombre && u.edad == edad) {
      return u;
    }
  });
  return res.json(usuariosEncontrados);
});

app.get("/usuarios/:id", (req, res) => {
  const id = req.params.id;
  const usuarioEncontrado = usuarios.find((u) => u.id == id);
  if (usuarioEncontrado) {
    return res.json(usuarioEncontrado);
  } else {
    return res.json({
      error: "usuario no encontrado con el id " + id,
    });
  }
});
//FIN ENDPOINT USUARIOS
