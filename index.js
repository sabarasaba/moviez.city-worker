import Providers from './providers';
import JsonFile from 'jsonfile';
import Chalk from 'chalk';

Promise.all([Providers.LeetX.Process(), Providers.PirateBay.Process()]).then((values) => {
  const data = [].concat.apply([], values);

  JsonFile.writeFile('./data/bulk.json', data, {spaces: 2}, function(err) {
    if (err) {
      console.log(Chalk.red('Error storing data on disk'));
      console.log(err);
    }

    console.log(`${Chalk.green('Done')} - ${data.length} movies fetched`);
  });
}).catch(err => {
  console.log(Chalk.red('Error while scraping data from providers'));
  console.log(err);
});
