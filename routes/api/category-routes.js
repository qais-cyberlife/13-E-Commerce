const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
router.get('/', (req, res) => {
  Category.findAll({
    include: [
      Product
    ],
  }).then(data => res.json(data))
    // be sure to include its associated Products
    .catch((err) => {
      console.log(err)
      res.status(500).json(err);
    });

});

// find one category by its `id` value
router.get('/:id', (req, res) => {
  Category.findOne({
    where: { id: req.params.id },
    include: {
      model: Product,
      attributes: ["category_id"]
    }
  }).then(data => res.json(data))

    .catch((err) => {
      console.log(err)
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  }).then(data => res.json(data))

    .catch((err) => {
      console.log(err)
      res.status(500).json(err);
    });
});


// update a category by its `id` value
router.put('/:id', (req, res) => {

  Category.update({ category_name: req.body.category_name }, { where: { id: req.params.id } })
    .then(data => res.json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err)
    });

  if (!data) {
    res.status(404).json({
      message: 'No Category found with that id!'
    })
    return;
  }
  res.json(data)
})



// delete a category by its `id` value
router.delete('/:id', (req, res) => {

  Category.destroy({
    where: { id: req.params.id },

  }).then(data => {
    res.json(data)
    if (!data) {
      res.status(404).json({
        message: "There is No Category with this Id!"
      });
    }
  })

    .catch((err) => {
      console.log(err);
      res.status(500).json(err)
    });
});

module.exports = router;
