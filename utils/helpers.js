import _ from 'lodash';

export function sanitizeTitle(title) {
  let result = title.toLowerCase();
  result = result.indexOf('2015') != -1 ? result.split('2015')[0] : result.split('2014')[0];

  return result.replace(/\s+/g, ' ').replace(/[.\s]+/g, ' ').trim();
};

export function sanitizeSize(str) {
  return str.split(', ')[1].replace('Size', '').replace('MiB', 'MB').replace('GiB', 'GB').trim();
};

export function movieQuality(title){
  if (title.toLowerCase().indexOf(' ts ')   != -1 ||
      title.toLowerCase().indexOf('dvdscr') != -1 ||
      title.toLowerCase().indexOf(' scr ')  != -1 ||
      title.toLowerCase().indexOf('tsrip')  != -1 ||
      title.toLowerCase().indexOf('camrip') != -1 ||
      title.toLowerCase().indexOf('fullcam')!= -1 ||
      title.toLowerCase().indexOf('hdcam')  != -1 ||
      title.toLowerCase().indexOf('scam')   != -1 ||
      title.toLowerCase().indexOf(' CAM ')  != -1)
      return 'Screener/Cam';

  if (title.toLowerCase().indexOf('brrip')  != -1 ||
      title.toLowerCase().indexOf('bdrip')  != -1 ||
      title.toLowerCase().indexOf('bluray') != -1 ||
      title.toLowerCase().indexOf('1080p')  != -1 ||
      title.toLowerCase().indexOf('720p')   != -1 ||
      title.toLowerCase().indexOf('bd rip') != -1)
      return 'blu-ray rip';

  return 'dvd rip';
}