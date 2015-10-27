import Providers from './providers';
import * as Metadata from './utils/metadata';
import JsonFile from 'jsonfile';
import Chalk from 'chalk';
import Bluebird from 'bluebird';


Promise.all([Providers.LeetX.Process(), Providers.PirateBay.Process()]).then((values) => {
  const data = [].concat.apply([], values);

  Bluebird.map(data, Metadata.FetchFor, {concurrency: 10}).then((movies) => {
    JsonFile.writeFile('./data/bulk.json', movies, {spaces: 2}, function(err) {
      if (err) {
        console.log(Chalk.red('Error storing data on disk'));
        console.log(err);
      }

      console.log(`${Chalk.green('Done')} - ${movies.length} movies fetched`);
    });
  }).catch(err => {
    console.log(Chalk.red('Error while scraping metadata from apis'));
    console.log(err);
  });
}).catch(err => {
  console.log(Chalk.red('Error while scraping data from providers'));
  console.log(err);
});
