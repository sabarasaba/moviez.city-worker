import _ from 'lodash';
import Xray from 'x-ray';
import { sanitizeTitle, sanitizeSize, movieQuality } from '../utils/helpers';
import * as Consts from '../consts';

const x = Xray();

export function Process() {
  return new Promise((resolve, reject) => {

    x(Consts.PIRATEBAY_URI, '#main-content tr', [{
      movie: x('', {
        name: '.detName a',
        metadata: x('', {
          size: 'td:nth-child(2) font',
          seeders: 'td:nth-child(3)',
          leechers: 'td:nth-child(4)',
        }),
        links: x('', {
          magnet: 'td:nth-child(2) > a@href',
        })
      })
    }])(function(err, data) {
      if (err) {
        reject(err);
      }

      const result = _.chain(data)
        .filter(function(e) {
          return _.get(e, 'movie.name', false);
        })
        .map(function(e) {
          e.movie.metadata.type = movieQuality(e.movie.name);
          e.movie.name = _.startCase(sanitizeTitle(e.movie.name));
          e.movie.metadata.size = sanitizeSize(e.movie.metadata.size);

          return e;
        })
        .value();

      resolve(result);
    });

  });
};
