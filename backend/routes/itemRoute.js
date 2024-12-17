import express from 'express';
import {createItem} from '../controllers/itemController.js';

const itemRouter = express.Router();

itemRouter.post('/:menuId/createitem',createItem);

export default itemRouter; 