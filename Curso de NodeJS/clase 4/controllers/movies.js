import { MovieModel } from "../models/movies.js";
import { validateMovie, validatePartialMovie } from "../schemas/movies.js";

export class MovieController {
  static async getAll(req, res) {
    const { genre } = req.query;
    const movies = await MovieModel.getAll({ genre });
    res.json(movies);
  }
  static async getMovieById(req, res) {
    // Parametro dinamico (/:id) path-to-regexp
    const { id } = req.params;
    const movie = await MovieModel.getByID({id: id});
    if (movie) return res.json(movie);
    res.status(404).json({ message: "Movie not found" });
  }
  static async createMovie(req, res) {
    const result = validateMovie(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const newMovie = await MovieModel.create({ input: result.data });
    res.status(201).json(newMovie);
  }
  static async deleteMovie(req, res) {
    const { id } = req.params;
    const result = await MovieModel.delete({id});
    if (!result) {
      return res.status(404).json({ message: "Movie not found" });
    }
    return res.json({ message: "Movie deleted" });
  }
  static async updateMovie(req, res) {
    const result = validatePartialMovie(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const { id } = req.params;
    const updatedMovie = await MovieModel.update({id, input:result.data});
    return res.json(updatedMovie);
  }
}
