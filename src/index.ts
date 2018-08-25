import 'reflect-metadata';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import { createConnection } from 'typeorm';
import { router as web } from './Http/Routes/web';
import { Server } from './Http/Server';

const app = new Koa();
app.use(bodyParser());
app.use(web.routes());
app.use(web.allowedMethods());
app.use(helmet());

createConnection().then(async _connection => {
    const server = new Server;
    server.use(app).listen();
}).catch((e) => {
    console.log("Database Connection failed!");
});
