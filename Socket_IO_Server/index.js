const Koa = require('koa');
const Router = require('koa-router');
const staticServer = require('koa-static');
const views = require('koa-views');
const path = require('path');
const cors = require('koa2-cors');
const app = new Koa();
const router = new Router();
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
		allowedHeaders: ['token'],
	},
});
app.use(cors());
app.use(
	views(path.join(__dirname, './view'), {
		extension: 'ejs',
	})
);
app.use(staticServer(__dirname, 'public'));

// socketIO

const connectList = [];

io.on('connection', (socket) => {
	/**
	 * 創建連接唯一代碼, 使 server 可以針對性寄送
	 */
	const connectId = new Date().getTime();
	socket.join(connectId);
	// 假裝是資料庫
	connectList.push(connectId);
	/**
	 * 每隔三秒鐘進行一次emit動作
	 * 而emit的內容是發佈一個news
	 * 內容為JSON物件，以time為key，value為emit當下的時間
	 */
	const loop = setInterval(function () {
		socket.emit('news', { time: new Date() });
		// 對自己以外的人通告自己在線
		connectList.forEach((id) => {
			connectId !== id && socket.in(id).emit('msg', connectId + '加入了');
		});
	}, 3000);

	socket.on('disconnect', function () {
		clearInterval(loop);
	});
	/**
	 * 接收client傳回的事件，並且於callback內接收該data做處理
	 */
	socket.on('my other event', function (data) {
		console.log('[my other event]' + data);
	});
});

// general API
router
	.get('/', (ctx) => {
		ctx.body = '這是 node socket io 的實作, 進入 test 頁面試用';
	})
	.get('/about', (ctx) => {
		ctx.body = '由 Leon Lin 於練習製作';
	})
	.get('/test', async (ctx) => {
		let title = 'socket IO demo';
		await ctx.render('socketIO', {
			title,
		});
	});
app.use(router.routes());
app.listen(3000);
server.listen(8080);
console.log('[demo] start-quick is starting at port 3000');
