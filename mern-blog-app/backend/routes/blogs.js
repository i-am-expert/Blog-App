const router = require('express').Router();
let Blog = require('../models/blog');

router.get('/', (req, res) => {
    Blog.find()
    .then(blogs => res.json(blogs))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.post('/add', (req, res) => {
    const author = req.body.author;
    const title = req.body.title;
    const description = req.body.description;
    
    const newBlog = new Blog({
        author,
        title,
        description
    });

    newBlog.save()
    .then(() => res.json('Blog added!'))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.get('/:id', (req, res) => {
    Blog.findById(req.params.id)
    .then(blog => res.json(blog))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.delete('/:id', (req, res) => {
    Blog.findByIdAndDelete(req.params.id)
    .then(() => res.json('Blog deleted!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/update/:id', (req, res) => {
    Blog.findById(req.params.id)
    .then(blog => {
        blog.author = req.body.author;
        blog.title = req.body.title;
        blog.description = req.body.description;

        blog.save()
        .then(() => res.json('Blog Updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;