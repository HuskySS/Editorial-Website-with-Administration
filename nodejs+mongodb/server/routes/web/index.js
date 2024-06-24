module.exports = app => {
  const router = require("express").Router();
  const mongoose = require("mongoose");
  const Article = mongoose.model("Article");
  const Category = mongoose.model("Category");
  const Comment = mongoose.model("Comment");
  const Message = mongoose.model("Message");
  const User = mongoose.model("User");

  router.get("/articles/list", async (req, res) => {
    const data = await Article.find().sort({
      'createdAt': -1
    });
    res.send(data);
  });

  router.get("/articles/recent", async (req, res) => {
    const data = await Article.find()
      .sort({
        'createdAt': -1
      }).limit(4);
    res.send(data);
  });

  router.get('/articles/:pageNum', async (req, res) => {
    const currentPage = req.params.pageNum;
    const list = await Article.find().sort({
      'createdAt': -1
    }).skip((currentPage - 1) * 6).limit(6).populate('categories')
    const count = await Article.find().lean().countDocuments()
    const totalPage = Math.ceil(count / 6)
    res.send({
      list,
      totalArticles: count,
      totalPage,
      currentPage
    })
  })

  router.get('/archive', async (req, res) => {
    const data = await Article.aggregate([{
        $sort: {
          createdAt: -1
        }
      }, {
        $lookup: {
          from: 'categories',
          localField: 'categories',
          foreignField: '_id',
          as: 'newList'
        }
      },
      {
        $group: {
          _id: {
            $month: '$createdAt',
          },
          count: {
            $sum: 1
          },
          list: {
            $push: {
              _id: '$_id',
              title: '$title',
              categories: '$newList',
              createdAt: '$createdAt',
            }
          }
        }
      },
    ]).sort({
      '_id': -1,
    })
    res.send(data)
  })

  router.get('/tags', async (req, res) => {
    const data = await Category.aggregate([{
      $lookup: {
        from: 'articles',
        localField: '_id',
        foreignField: 'categories',
        as: 'tagsList'
      }
    }]).unwind('$tagsList').sort({
      'tagsList.createdAt': -1
    }).group({
      _id: "$name",
      count: {
        $sum: 1
      },
      list: {
        $push: {
          _id: '$_id',
          title: '$title',
          categories: '$tagsList',
          createdAt: '$createdAt',
        }
      }
    }).sort({
      'count': -1,
      '_id': -1
    })
    res.send(data)
  })

  router.get("/articles/list/:id", async (req, res) => {
    const data = await Article.findById(req.params.id).populate('categories');
    res.send(data);
  });

  router.post('/users', async (req, res) => {
    const data = await User.create(req.body)
    res.send(data)
  })
  router.get('/users', async (req, res) => {
    const data = await Users.find()
    res.send(data)
  })
  router.put('/users/:id', async (req, res) => {
    const data = await User.findByIdAndUpdate(req.params.id, req.body)
    res.send(data)
  })
  router.get('/users/:id', async (req, res) => {
    const data = await User.findById(req.params.id)
    res.send(data)
  })

  router.post('/email', async (req, res) => {
    sendEmail(req.body)
    res.send({
      ok: 'ok'
    })
  })

  router.post('/comments', async (req, res) => {
    const data = await Comment.create(req.body)
    await Article.findByIdAndUpdate(req.body.relateBlogId,
      {
        $inc: {
          msgs: 1
        }
      }
    )
    res.send(data)
  })
  router.get('/comments/:blogsId', async (req, res) => {
    const comments = await Comment.find().where({
      relateBlogId: req.params.blogsId
    })
    res.send(comments)
  })

  router.post('/messages', async (req, res) => {
    const data = await Message.create(req.body)
    res.send(data)
  })
  router.get('/messages', async (req, res) => {

    const messages = await Message.find()
    res.send(messages)
  })

  router.get('/time', async (req, res) => {
    let time = new Date().getTime()
    res.send({
      'data': time
    })
  })

  app.use("/web/api", router);
};