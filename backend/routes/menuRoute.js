import express from 'express';
import {createMenu,getMenu,getAllMenu} from '../controllers/menuController.js';

const menuRouter = express.Router();

menuRouter.get('/getAllMenu',getAllMenu);
menuRouter.get('/:menuId',getMenu);
menuRouter.post('/createmenu',createMenu);


export default menuRouter;