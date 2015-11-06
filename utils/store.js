import Youtube from 'youtube-node';
import _ from 'lodash';
import Chalk from 'chalk';

import Models from '../../server/src/models';

let dataSerializer = function(movie) {
  return _.extend(
    {},
    movie.movie.meta,
    {download: movie.movie.download}
  );
};

export function saveMovie(movie) {
  return new Promise((resolve, reject) => {
    const data = dataSerializer(movie);

    Models.Movie.create(data, {
      include: [ Models.Categories, Models.Actors ]
    }).then(resolve)
      .catch(err => {
        if (err.name === 'SequelizeUniqueConstraintError') {
          console.log(`${Chalk.magenta('Duplicated:')} ${data.title}`);
        }

        resolve(data);
      });
  });
};