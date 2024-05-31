import mysql from "mysql2/promise";

const config = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "mysql",
  database: "moviesdb",
};
const connection = await mysql.createConnection(config);

export class MovieModel {
  static async getAll({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase();
      const [genres] = await connection.query(
        "select id, name from genre where LOWER(name) = ?;",
        [lowerCaseGenre]
      );
      const [{ id }] = genres;
      // devolver las pelis con el id del genero con un query

      const [movies] = await connection.query(
        "select movie_id, genre_id from movie_genres where id = ?",
        id
      );
    }

    const [movies] = await connection.query(
      "select title, year, director, duration, poster, rate, BIN_TO_UUID(id) id from movie;"
    );
    return movies;
  }
  static async getByID({ id }) {
    const [movies] = await connection.query(
      `select title, year, director, duration, poster, rate, BIN_TO_UUID(id) id from movie where id = BIN_TO_UUID(?);`,
      [id]
    );
    if (movies.length === 0) return null;
    return movies[0];
  }
  static async create({ input }) {
    const {
      genre: genreInput,
      title,
      year,
      director,
      duration,
      poster,
      rate,
    } = input;
    try {
      const [resultUUID] = await connection.query("select UUID() uuid;");
      const [{ uuid }] = resultUUID;
      await connection.query(
        `INSERT INTO movie (id,title, year, director, duration, poster, rate) VALUES(BIN_TO_UUID("${uuid}"),?, ?, ?, ?,?,?)`,
        [title, year, director, duration, poster, rate]
      );
      const [movies] = await connection.query(
        "select title, year, director, duration, poster, rate, BIN_TO_UUID(id) id from movie where id = BIN_TO_UUID(?);",
        [uuid]
      );
      return movies[0];
    } catch (e) {
        throw new Error("Error creando la pelicula");
        
    }
  }
  static async delete({ id }) {}
  static async update({ id, input }) {}
}
