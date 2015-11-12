import Slug from 'slug';
import _ from 'lodash';

const slugSettings = {
  lower: true
};

export function store(movie) {
  return new Promise((resolve, reject) => {
    movie.movie.meta.slug =  Slug(movie.movie.meta.title, slugSettings);

    resolve(movie);
  });
};