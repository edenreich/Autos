import 'reflect-metadata';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import { createConnection } from 'typeorm';
import { config } from './config';
import { router as web } from './Routes/web';
import { Server } from './Server';


const app = new Koa();
app.use(web.allowedMethods());
app.use(bodyParser());
app.use(helmet());
app.use(web.routes());

const server = new Server(config);
server.use(app).listen(config.port);

//@todo implement database connection.

// createConnection({
//     type: 'postgres',
//     ...config.db,
//     synchronize: true,
//     logging: ['warn', 'error'],
//     entities: ['dist/Models/**/*.js'],
// }).then(async _connection => {
//   const app = new Koa();

//   app.use(bodyParser());
//   app.use(web.routes());

//   app.listen(config.port);
// });
