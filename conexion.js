// Conexión a BBDD Postgres
const { Pool } = require("pg");
const config = {
    host: "localhost",
    port: 5432,
    database: "repertorio",
    user: "postgres",
    password: "XXXXXXX" // Profe su clave acá
};
const pool = new Pool(config);

const saveSong = async (song) => {
    const values = Object.values(song);
    const consulta = {
      text: "insert into canciones (titulo, artista, tono) values ($1, $2, $3)",
      values,
    }
    const result = await pool.query(consulta);
    return result;
  };

  const listSongs = async () => {
    const result = await pool.query("SELECT * FROM canciones");
    return result.rows;
  }

  const putSong = async (id,body) => {

    const values = Object.values(body);
    const consulta = {
      text: `update canciones set (titulo, artista, tono) = values ($1, $2, $3) where id = ${id} returning *`,
      values,
    }
    const result = await pool.query(consulta);
    return result;
}

const deleteSong = async (id) => {

  const consulta = {
    text: `DELETE FROM canciones WHERE id = ${id}`
  }
  const result = await pool.query(consulta);
  return result;
}



module.exports = { saveSong, listSongs, putSong, deleteSong };
