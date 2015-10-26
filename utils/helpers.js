import _ from 'lodash';

export function sanitizeTitle(title) {
  let result = title.toLowerCase();
  result = result.indexOf('2015') != -1 ? result.split('2015')[0] : result.split('2014')[0];

  return result.replace(/\s+/g, ' ').replace(/[.\s]+/g, ' ').trim();
};