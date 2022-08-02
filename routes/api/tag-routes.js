const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Finds all tags
router.get('/', (req, res) => {
  Tag.findAll({
    include: {
      model: Product,
      attributes: ["product_name"]
    }
  }).then(data => res.json(data))
    .catch((err) => {
      console.log(err)
      res.status(500).json(err);
    })
});

// find a single tag by its `id`
router.get('/:id', (req, res) => {
  Tag.findOne({
    where: { id: req.params.id },
    include: {
      model: Product,
    },
  }).then(data => res.json(data))
    .catch((err) => {
      console.log(err)
      res.status(500).json(err);
    });
});

// create a new tag
router.post('/', (req, res) => {
  Tag.create({
    tag: req.body.category_name
  }).then(data => res.json(data))

    .catch((err) => {
      console.log(err)
      res.status(500).json(err);
    });
});



// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name,
    }
    ,
    { where: { id: req.params.id } },
  ).then(data => res.json(data))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err)
  }
  );

  if (!data) {

    res.status(404).json({ message: 'No Tag found with that id!' })
    return;
  }
  res.json(data)
})

<<<<<<< HEAD


=======
>>>>>>> 3a38e4bb431c783135980930ef05df70cf3b800e
// delete on tag by its `id` value
router.delete('/:id', (req, res) => {



  Tag.destroy({
    where: { id: req.params.id },

  }).then(data => {
    res.json(data)
    if (!data) {
      res.status(404).json({
        message: "There is No Tag with this Id!"
      });
    }
  })

    .catch((err) => {
      console.log(err);
      res.status(500).json(err)
    });
});

module.exports = router;