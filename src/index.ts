import 'reflect-metadata';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import { createConnection } from 'typeorm';
import { router as web } from './Http/Routes/web';
import { Server } from './Http/Server';

export const app = new Koa();

// Before Middlewares
app.use(bodyParser({
    onerror: (err, ctx) => {
        ctx.throw('Invalid JSON. please supply a valid one.', 422);
    }
}));
app.use(helmet());

// Application Routes
app.use(web.routes());

// After Middlewares
app.use(web.allowedMethods());

createConnection().then(async _connection => {
    const server = new Server;
    server.use(app).listen();
}).catch((err) => {
    if (process.env.APP_ENV === "testing" || process.env.APP_ENV === "local") {
        console.log("Database Connection failed!", err);
    } else {
        console.log("Database Connection failed!");
    }
});
