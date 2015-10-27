import MovieDB from 'moviedb';
import omdb from 'omdb';
import _ from 'lodash';

const key = 'a48a3410482bc3874beb15185259a498';
const tmdbAPI = MovieDB(key);

let getTmdbData = function(name) {
  return new Promise((resolve, reject) => {
    tmdbAPI.searchMovie({query: name }, (err, res) => {
      if (err) {
        reject(err);
      }

      tmdbAPI.movieInfo({id: res.results[0].id}, (err, res) => {
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

export function FetchFor(title) {
  return new Promise((resolve, reject) => {
    Promise.all([getTmdbData(title), getOmdbData(title)]).then((values) => {
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

      const dataOmdb = _.pick(values[1],
        'rated',
        'director',
        'actors',
        'imdb',
        'awards',
        'plot',
        'metacritic'
      );

      const data = _.extend({}, dataTmdb, dataOmdb);

      resolve(data);
    }).catch(err => {
      reject(err);
    });
  });
};
