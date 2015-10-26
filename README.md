# Worker for moviez.city

[![Build Status](https://travis-ci.org/sabarasaba/moviez.city-worker.svg)](https://travis-ci.org/sabarasaba/moviez.city-worker)

> This project provides a worker that crawls trending movies from 1337x.com and piratebay, dedupes them, remove low scores and low seeds and aggregates the movies metadata from tmdb and bulks the information in a postgres database.

### Getting Started

```shell
$ git clone -o upstream https://github.com/sabarasaba/moviez.city-worker worker && cd $_
$ npm install -g babel mocha     # Install babel and mocha globally
$ npm install                    # Install Node.js components listed in ./package.json
$ npm start                      # Starts the worker
```

### Testing

Run unit tests, powered by [Mocha](http://mochajs.org/) and [Chai](http://chaijs.com/):

```shell
$ npm test
```

### Support

Have feedback, feature request or need help? Create an issue !

### Copyright

Licensed under MIT License (MIT). See [LICENSE.txt](./LICENSE)