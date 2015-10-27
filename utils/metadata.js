import MovieDB from 'moviedb';
import omdb from 'omdb';
import _ from 'lodash';

const key = 'a48a3410482bc3874beb15185259a498';
const tmdbAPI = MovieDB(key);

let getTmdbData = function(name) {
  return new Promise((resolve, reject) => {
    tmdbAPI.searchMovie({query: name }, (err, res) => {
      const movieId = _.get(res, 'results[0].id', undefined);

      if (err || _.isUndefined(movieId)) {
        reject(err);
      }

      tmdbAPI.movieInfo({id: movieId}, (err, res) => {
        if (err) {
          reject(err);
        }

        resolve(res);
      });
    });
  });
};

let getOmdbData = function(name) {
  return new Promise((resolve, reject) => {
    omdb.get({ title: name }, true, function(err, movie) {
      if(err) {
        reject(err);
      }

      if(!movie) {
        reject('Movie not found');
      }

      resolve(movie);
    });
  });
};

export function FetchFor(movie) {
  return new Promise((resolve, reject) => {
    Promise.all([getTmdbData(movie.movie.name), getOmdbData(movie.movie.name)]).then((values) => {
      const dataTmdb = _.pick(values[0],
        'id',
        'imdb_id',
        'title',
        'backdrop_path',
        'poster_path',
        'original_language',
        'overview',
        'release_date',
        'runtime',
        'genres'
      );

      const dataOmdb = _.pick(values[0],
        'rated',
        'director',
        'actors',
        'imdb',
        'awards',
        'plot',
        'metacritic'
      );

      movie.movie.meta = _.extend({}, dataTmdb, dataOmdb);

      setTimeout(() => {
        resolve(movie);
      }, 10000);
    }).catch(err => {
      console.log(err);
      resolve(movie);
    });
  });
};
