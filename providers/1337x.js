import _ from 'lodash';
import Xray from 'x-ray';

import { sanitizeTitle } from '../utils/helpers';
import * as Consts from '../utils/consts';

const x = Xray();

export function Process() {
  return new Promise((resolve, reject) => {

    x(Consts.LEETX_URI, '.trending-movie > .moive-detail', [{
      movie: x('.moive-info h3 a@href', {
        name: '.moive-detail .moive-info h3',
        download: x('.category-detail', {
          type: ' .list:nth-child(1) li:nth-child(2) span',
          size: '.list:nth-child(1) li:nth-child(4) span',
          seeders: '.list:nth-child(2) .green',
          leechers: '.list:nth-child(2) .red'
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
        .filter((e) => {
          const seeders = _.get(e, 'movie.download.seeders', false);

          return parseInt(seeders, 10) > 100;
        })
        .map((e) => {
          e.movie.download.magnet = e.movie.links.magnet;

          delete e.movie.links;

          return e;
        })
        .uniq('movie.name')
        .value();

      resolve(result);
    })

  });
};
