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
  Tag.create(req.body)
  
  .then(data => res.status(200).json(data))

    .catch((err) => {
      console.log(err)
      res.status(500).json(err);
    });
});



// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update(req.body,{ where: { id: req.params.id } })
  
  .then((data) => {
    console.log(data)

    if (!data) {

      res.status(404).json({ message: 'No Tag found with that id!' })
      return;
    }
    res.json(data)
  })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err)
    }
    );
})

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