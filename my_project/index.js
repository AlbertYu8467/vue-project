const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
const path = require('path');
const root = path.join(__dirname, './dist')
const asyncFetch = require('./crawler.js');
const static = require('koa-static')(root, {
    index: 'index.html'
});

const app = new Koa();
const router = new Router();

app.use(views(root, {
    extension: 'html',
    // map: {
    //   html: ''
    // }
}));
asyncFetch();
setInterval(() => {
    asyncFetch();
}, 3600 * 1000)
router.get('/', async(ctx, next) => {
    await ctx.redirect('/home')
});
router.get('/:route', async(ctx, next) => {
    await ctx.render('index')
});

app
    .use(router.routes())
    .use(router.allowedMethods())
    .use(static);

app.listen('8000', function() {
    console.log('listening localhost:8000')
})