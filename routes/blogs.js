import { Router } from 'express';
import Blog from '../models/Blogs.js';

const router = Router();

router.route('/')
    .get(async (req, res) => {
        try {
            const user = req.session.user;
            const blogPosts = await Blog.find().lean();
            const encodeURIComponentHelper = (str) => encodeURIComponent(str);

            return res.render('./blogs/allBlogs', {
                layout: 'main',
                title: 'Blogs | EcoHub',
                user: user,
                blogPosts,
                helpers: {
                    encodeURIComponent: encodeURIComponentHelper
                }
            });
        } catch (error) {
            return res.status(500).send('Internal Server Error');
        }
    });

router.route('/:title')
    .get(async (req, res) => {
        try {
            const user = req.session.user;
            const blog = await Blog.findOne({
                urlFormat: new RegExp(`^${req.params.title}$`, 'i')
            }).lean();

            if (!blog) {
                return res.status(404).send("Blog not found");
            }

            let formattedBody = blog.body
                .replace(/<\/ol><ol>/, '<ol>')
                .replace(/\n/g, '</p><p><br>')
                .replace(/<\/ol><ol>/g, '')
                .replace(/^<p>/, '')
                .replace(/<\/p>$/, '');

            formattedBody = formattedBody.trim();
            blog.formattedBody = formattedBody;

            return res.render('./blogs/blogDetails', { 
                layout: 'main',
                title: `${blog.title} | EcoHub`,
                user: user,
                blog 
            });
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    });

export default router;  