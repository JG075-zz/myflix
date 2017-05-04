var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var movieSchema = new Schema({
  title: { type: String, required: true },
  year: { type: String, required: true },
  url: { type: String, require: true },
  released: { type: String, required: true },
  rated: { type: String, required: true },
  runtime: { type: String, required: true },
  genre: { type: String, required: true },
  director: { type: String, required: true },
  writer: { type: String, required: true },
  actors: { type: String, required: true },
  plot: { type: String, required: true },
  language: { type: String, required: true },
  country: { type: String, required: true },
  poster: { type: String, required: true },
  ratings: {
    meta_score: { type: String },
    imdb_rating: { type: String, required: true },
    rotten_tomatoes: { type: String },
  },
  imdb_id: { type: String, required: true },
  type: { type: String, required: true },
},
{
  timestamps: true
});

function modifyNewestUrl(existing, saving, next, err) {
  if (parseInt(existing.year) > parseInt(saving.year)) {
    existing.url = existing.title + '_' + existing.year;
    existing.save(function(err) {
      return next(err);
    });
  } else {
    saving.url = saving.url + '_' + saving.year;
    return next(err);
  }
}

movieSchema.pre('save', function(next) {
  var doc = this;
  Movie.find({ title: doc.title }, function(err, movies) {
    doc.url = doc.title.toLowerCase().replace(/ /g,"_");
    if (movies.length === 1) {
      return modifyNewestUrl(movies[0], doc, next, err);
    }
    return next(err);
  });
});

movieSchema.index({ title: 1, year: 1 }, { unique: true });

var Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
