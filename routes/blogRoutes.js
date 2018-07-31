import requireLogin from '../middlewares/requireLogin';
import Blog from '../models/Blog';
// const Blog = model('Blog');
import redis from 'redis';
import util from 'util';
const redisURL = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisURL);
client.get = util.promisify(client.get);

export default function (app) {
	app.get('/api/blogs/:id', requireLogin, async (req, res) => {
		const blog = await Blog.findOne({
			_user: req.user.id,
			_id: req.params.id
		});
		res.send(blog);
	});
	app.get('/api/blogs', requireLogin, async (req, res) => {

		//Check if we have any cache data related to query is present or not
		const cachedBlog = await client.get(req.user.id);

		//if present then return it from cache
		if(cachedBlog) {
			console.log('SERVING FROM CACHE');
			return res.send(JSON.parse(cachedBlog));
		}

		const blogs = await Blog.find({ _user: req.user.id });

		//if not present in cache then we set it in cache
		client.set(req.user.id, JSON.stringify(blogs));

		console.log('SERVING FROM MONGODB');
		res.send(blogs);
	});
	app.post('/api/blogs', requireLogin, async (req, res) => {
		const { title, content } = req.body;
		const blog = new Blog({
			title,
			content,
			_user: req.user.id
		});
		try {
			await blog.save();
			res.send(blog);
		}
		catch (err) {
			res.send(400, err);
		}
	});
}
