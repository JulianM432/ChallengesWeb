const zod = require("zod");

const movieSchema = zod.object({
  title: zod.string({
    required_error: "Title movie is required",
    invalid_type_error: "Movie title must be a string",
  }),
  year: zod.number().int().min(1900).max(2030),
  director: zod.string(),
  duration: zod.number().int().positive({
    message: "duration must be > 0"
  }),
  rate: zod.number().min(0, {
    message: "rate must be > 0"
  }).max(10, {
    message: "rate must be < 10"
  }),
  poster: zod.string().url({
    message: "Poster must be a VALID url",
  }),
  genre: zod.array(
    zod.enum([
      "Action",
      "Adventure",
      "Comedy",
      "Drama",
      "Fantasy",
      "Horror",
      "Thriller",
      "Sci-Fi",
    ],{
        required_error: "Movie genre is required",
        invalid_type_error: "Movie genre must be an array of enum Genre"
    })
  )});

function validateMovie(object) {
  return movieSchema.safeParse(object);
}

function validatePartialMovie(object) {
    return movieSchema.partial().safeParse(object);
}

module.exports = {
  validateMovie,
  validatePartialMovie
};
