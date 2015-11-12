import JsonFile from 'jsonfile';
import Chalk from 'chalk';
import Bluebird from 'bluebird';
import _ from 'lodash';

import Providers from './providers';
import * as Store from './utils/store';
import * as Imdb from './enhancers/imdb';
import * as Youtube from './enhancers/youtube';
import * as Slug from './enhancers/slug';


Promise.all([Providers.LeetX.Process(), Providers.PirateBay.Process()]).then((values) => {
  const data = [].concat.apply([], values);

  Bluebird.map(data, Imdb.fetchFor, {concurrency: 10})
    .filter((el) => {
      const hasAllMeta = _.get(el.movie, 'meta.rated', null);

      return !_.isUndefined(el.movie.meta) && !_.isNull(hasAllMeta);
    })
    .map(Youtube.fetchFor)
    .map(Slug.store)
    .map(Store.saveMovie)
    .then((movies) => {
      JsonFile.writeFile('./data/bulk.json', movies, {spaces: 2}, function(err) {
        if (err) {
          console.log(Chalk.red('Error storing data on disk'));
          console.log(err);
        }

        console.log(`${Chalk.green('Done')} - ${movies.length} movies fetched`);
      });
    }).catch(err => {
      console.log(Chalk.red('Error while scraping imdb metadata from apis'));
      console.log(err);
    });
}).catch(err => {
  console.log(Chalk.red('Error while scraping data from providers'));
  console.log(err);
});
