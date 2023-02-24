[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![CI](https://github.com/noctua84/nestjs-demo/actions/workflows/demo-ci.yml/badge.svg?branch=main)](https://github.com/noctua84/nestjs-demo/actions/workflows/demo-ci.yml)
## Description

This project is an experimental one with NestJS. Ultimately, it could develop into a template to start other applications with it.  
Currently, it is an application skeleton with the following features implemented and planned:
- [x] Metrics with Prometheus (default metrics)
- [x] Healthcheck with Terminus (certain endpoints and database)
- [x] Logging with Winston (server logs)
- [ ] Database with TypeORM (PostgreSQL)
- [ ] Migrations with TypeORM
- [ ] Database with Mongoose (MongoDB)
- [ ] Unit tests with Jest
- [ ] E2E tests with Jest
- [x] API documentation with Swagger
- [ ] Cache with Redis
- [ ] Authentication with Passport (JWT)
- [ ] Authorization with CASL
- [ ] Internationalization with NestJS I18n
- [ ] Configuration with NestJS Config
- [ ] Configuration schema, validation and defaults with Joi

The packages used are monitored by dependabot and with ncu (npm-check-updates) to keep them up to date.
Ncu is also used to update the package.json file with the latest versions of the packages during pipeline runs using `ncu --doctor -u`.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start
```
```bash
# watch mode
$ npm run start:dev
```
```bash
# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test
```
```bash
# e2e tests
$ npm run test:e2e
```
```bash
# test coverage
$ npm run test:cov
```

## License
Nest is [MIT licensed](LICENSE).  
This experimental is [MIT licensed](LICENSE).