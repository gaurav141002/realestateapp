import express from 'express';
import Property from '../models/Property.model.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { search } = req.query;
  const where = search
    ? { title: { [Op.like]: `%${search}%` } }
    : {};
  const props = await Property.findAll({ where });
  res.json(props);
});

router.get('/mine', async (req, res) => {
  const props = await Property.findAll({ where: { userId: req.user.id } });
  res.json(props);
});

router.post('/', async (req, res) => {
  const property = await Property.create({ ...req.body, userId: req.user.id });
  res.status(201).json(property);
});

router.delete('/:id', async (req, res) => {
  const prop = await Property.findByPk(req.params.id);
  if (!prop || prop.userId !== req.user.id) {
    return res.status(403).json({ message: 'Unauthorized' });
  }
  await prop.destroy();
  res.json({ message: 'Deleted' });
});

export default router;
