'use strict';

const Koa = require('koa');
const koaBody = require('koa-body');
const logger = require('koa-logger')
const config = require('./config')
const bir = require('@hyperone/regon');
const Router = require('koa-router');
const client = bir(config.PRODUCTION);

const app = new Koa();
const router = new Router();

router.use((ctx, next) => {
    const token = ctx.query['auth-token'] || ctx.request.headers['x-auth-token'];
    if (token && config.TOKENS.indexOf(token) >= 0) {
        return next();
    }
    return ctx.throw(401, 'Unauthorized');
});

router.get('/', async ctx => {
    ctx.body = {
        ...router.stack
            .map(route => ({ [route.path]: route.methods }))
    };
});
router.get('/nip/:id', async (ctx) => {
    const entity = await client.search_nip(ctx.params.id);
    ctx.body = await client.report(entity.regon14, entity.full_report);
});

router.get('/regon/:id', async (ctx) => {
    const entity = await client.search_regon(ctx.params.id);
    ctx.body = await client.report(entity.regon14, entity.full_report);
});

app
    .use(logger())
    .use(koaBody())
    .use(router.routes())
    .use(router.allowedMethods());


const main = async () => {
    await client.login(process.env.GUS_API_KEY);
    await new Promise(resolve => app.listen(process.env.PORT || 8080, function () {
        console.log('listening on', this.address());
        return resolve();
    }));
};

main().then(console.log).catch(err => {
    console.log(err)
    console.log(err.stack);
    process.exit(1);
})