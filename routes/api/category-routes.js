const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products

    try
    {
        const cData = await Category.findAll(
        {
            include:
            [
                {
                    model: Product
                }
            ]
        });
        if(cData)
        {
            res.status(200).json(cData);
        }
    }
    catch(err)
    {
        if(err)
        {
            res.status(500).json(err);
        }
    }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

    try
    {
        const cData = await Category.findByPK(req.params.id,
        {
            include:
            [
                {
                    model: Product
                }
            ]
        });

        if(!cData)
        {
            res.status(404).json({message: 'oops nothing here'});
        }
        else
        {
            res.status(200).json(cData);
        }
    }
    catch(err)
    {
        if(err)
        {
            res.status(500).json(err);
        }
    }
});

router.post('/', async (req, res) => {
  // create a new category
    try
    {
        const cData = await Category.create(req.body);
        res.status(200).json(cData);
    }
    catch(err)
    {
        if(err)
        {
            res.status(400).json(err);
        }
    }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
    try {
        const cData = await Category.update(req.body, 
            {
                where: 
                { 
                    id: req.params.id 
                }
            }
        );
        
        if (!cData) 
        {
            res.status(404).json({ message: 'oops nothing here.' });
        }
        else
        {
            res.status(200).json(cData);
        }
    } 
    catch(err) 
    {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    // delete a category by its `id` value
    try 
    {
        const cData = await Category.destroy(
            {
                where: 
                { 
                    id: req.params.id 
                }
            }
        );
        
        if (!cData) 
        {
            res.status(404).json({ message: 'No category with this id!' });
        }
        else
        {
            res.status(200).json(cData);
        }
        
    } 
    catch(err) 
    {
        res.status(500).json(err);
    }
});

module.exports = router;