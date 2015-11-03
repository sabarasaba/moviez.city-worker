import Youtube from 'youtube-node';
import _ from 'lodash';

const key = 'AIzaSyBBmqAzH3YVm8C1G2aWWMMoiKRWotaowqM';

const youtube = new Youtube();
youtube.setKey(key);

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
      resolve(`https://www.youtube.com/watch?v=${_.get(data, 'items[0].id.videoId', 'M1djO19aSFQ')}`);
    }).catch(err => {
      resolve('');
    });
  });
};