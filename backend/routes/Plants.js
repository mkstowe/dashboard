const express = require('express');
const router = express.Router();

const db = require("../db/dashboard");

// Get all plants
router.get("/", async (req, res) => {
    const plants = await db.getAllPlants();
    res.status(200).json(plants);
});

// Get plant by id
router.get("/:id", async (req, res, next) => {
    const plant = await db.getPlant(req.params.id);
    res.status(200).json({ plant });
})

// Create new plant
router.post('/', async (req, res) => {
    const plant = await db.createPlant(req.body);
    res.status(201).json({ plant });
})

// Update plant
router.patch('/:id', async (req, res) => {
    const plant = await db.updatePlant(req.params.id, req.body);
    res.status(200).json({ plant });
})

// Delete plant
router.delete('/:id', async (req, res) => {
    await db.deletePlant(req.params.id);
    res.status(204).json({ });
})


module.exports = router;
