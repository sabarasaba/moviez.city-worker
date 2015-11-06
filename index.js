import JsonFile from 'jsonfile';
import Chalk from 'chalk';
import Bluebird from 'bluebird';
import _ from 'lodash';

import Providers from './providers';
import * as Imdb from './enhancers/imdb';
import * as Youtube from './enhancers/youtube';


Promise.all([Providers.LeetX.Process(), Providers.PirateBay.Process()]).then((values) => {
  const data = [].concat.apply([], values);

  Bluebird.map(data, Imdb.FetchFor, {concurrency: 10})
    .filter((el) => {
      return !_.isUndefined(el.movie.meta);
    })
    .map(Youtube.FetchFor)
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
