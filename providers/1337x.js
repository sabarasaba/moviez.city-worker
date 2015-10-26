import _ from 'lodash';
import Xray from 'x-ray';
import { sanitizeTitle } from '../utils/helpers';
import * as Consts from '../consts';

const x = Xray();

export function Process() {
  return new Promise((resolve, reject) => {

    x(Consts.LEETX_URI, '.trending-movie > .moive-detail', [{
      movie: x('.moive-info h3 a@href', {
        name: '.moive-detail .moive-info h3',
        metadata: x('.category-detail', {
          type: ' .list:nth-child(1) li:nth-child(2) span',
          size: '.list:nth-child(1) li:nth-child(4) span',
          seeders: '.list:nth-child(2) .green',
          leechers: '.list:nth-child(2) .red',
        }),
        links: x('.download-links', {
          magnet: '.magnet@href'
        })
      })
    }])(function(err, data) {
      if (err) {
        reject(err);
      }

      const result = _.chain(data)
        .filter(function(e) {
          const seeders = _.get(e, 'movie.metadata.seeders', false);

          return parseInt(seeders, 10) > 100;
        })
        .uniq('movie.name')
        .value();

      resolve(result);
    })

  });
};
