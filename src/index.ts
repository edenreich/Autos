import 'reflect-metadata';
import Koa from 'koa';
import body_parser from 'koa-bodyparser';
// import { createConnection } from 'typeorm';
import { config } from './config';
import { router as web } from './Routes/web';

// createConnection({
//     type: 'postgres',
//     ...config.db,
//     synchronize: true,
//     logging: ['warn', 'error'],
//     entities: ['dist/Models/**/*.js'],
// }).then(async _connection => {
//   const app = new Koa();

//   app.use(body_parser());
//   app.use(web.routes());

//   app.listen(config.port);
// });


const app = new Koa();

app.use(body_parser());
app.use(web.routes());

app.listen(config.port);
console.log(`server listening on port: ${config.port}`);
