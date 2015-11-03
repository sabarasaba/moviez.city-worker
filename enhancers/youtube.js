import Youtube from 'youtube-node';
import _ from 'lodash';

import * as Consts from '../utils/consts';

const youtube = new Youtube();
youtube.setKey(Consts.YOUTUBE_KEY);

let getYoutubeResults = function(name) {
  return new Promise((resolve, reject) => {
    youtube.search(name, 2, function(err, results) {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};


export function FetchFor(movie) {
  return new Promise((resolve, reject) => {
    getYoutubeResults(`${movie.movie.name} trailer`).then((data) => {
      movie.movie.meta.trailer = `https://www.youtube.com/watch?v=${_.get(data, 'items[0].id.videoId', 'M1djO19aSFQ')}`

      resolve(movie);
    }).catch(err => {
      resolve(movie);
    });
  });
};