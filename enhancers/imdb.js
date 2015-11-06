import MovieDB from 'moviedb';
import omdb from 'omdb';
import Chalk from 'chalk';
import _ from 'lodash';

import * as Consts from '../utils/consts';

const tmdbAPI = MovieDB(Consts.TMDB_KEY);

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
        reject(name);
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

      const dataOmdb = _.pick(values[1],
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
      setTimeout(() => {
        console.log(`${Chalk.red('Error:')} no metadata for ${err}`);

        resolve(movie);
      }, 10000);
    });
  });
};
