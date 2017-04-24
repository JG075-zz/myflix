var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var movieSchema = new Schema({
  title: { type: String, required: true },
  released: { type: String, required: true },
  rated: { type: String, required: true },
  runtime: { type: String, required: true },
  genre: { type: String, required: true },
  director: { type: String, required: true },
  writers: { type: String, required: true },
  actors: { type: String, required: true },
  plot: { type: String, required: true },
  language: { type: String, required: true },
  country: { type: String, required: true },
  poster: { type: String, required: true },
  ratings: {
    meta_score: { type: Number, min: 0, max: 100, required: true },
    imdb_rating: { type: Number, min: 0, max: 10, required: true },
    rotten_tomatoes: { type: Number, min: 0, max: 100, required: true },
  },
  imdb_id: { type: String, required: true },
  type: { type: String, required: true },
},
{
  timestamps: true
});

var Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
