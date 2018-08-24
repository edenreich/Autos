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


createConnection().then(async _connection => {
    const server = new Server(config);
    server.use(app).listen();
}).catch((e) => {
    console.log("Database Connection failed!");
});
