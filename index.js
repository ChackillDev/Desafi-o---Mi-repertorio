const express = require("express");
const app = express();

app.listen(3000, console.log(`http://localhost:3000`));

app.use(express.json());

const { saveSong, listSongs, putSong, deleteSong } = require("./conexion.js");

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/src/index.html");
});

app.post("/cancion", async (req, res) => {
    try {
        const song = req.body;
        const result = await saveSong(song);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    };
});

app.get("/canciones", async (req, res) => {
    try {
        const canciones = await listSongs();
        res.json(canciones);
    } catch (error) {
        res.status(500).send(error);
    }
})

app.put("/cancion/:id", async (req, res) => {
    try {
        let id  = req.params.id;
        let body = req.body;
        const idPut = await putSong(id,body);
        res.json(idPut);
    } catch (error) {
        res.status(500).send(error);
    }
})

app.delete("/cancion/:id", async (req, res) => {
  try {
      let id  = req.params.id;
      const idDelete = await deleteSong(id);
      res.json(idDelete);
  } catch (error) {
      res.status(500).send(error);
  }
})
