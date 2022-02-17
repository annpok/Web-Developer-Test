import express from 'express'
import { readByBasketId, updateByBasketId } from '../helpers/basket-operations.js';
import { ObjectID } from 'mongodb';
import { db } from '../config/db.js'
import {deleteRecordById, findRecords} from "../helpers/crud.js";
const router = express.Router();


router.get('/',  async (req, res) => {
    const items = await findRecords(db, 'basket');
    const data = await items.toArray();
    res.send(data);
});

router.get('/:id',  async (req, res) => {
    const id = req.params.id;
    const query = { '_id': new ObjectID(id) };
    const item = await readByBasketId(db, query);
    res.send({ errors:item.errors, basket:item.basket });
  });

router.put('/:id',  async (req, res) => {
    const id = req.params.id;
    const query = { '_id': new ObjectID(id) };
    const basket = req.body;
    const item = await updateByBasketId(db, query, basket);
    res.send({ errors:item.errors, basket:item.basket });
  });

router.delete('/:id',  async (req, res) => {
    const id = req.params.id;
    const query = { '_id': new ObjectID(id) };
    const result = await deleteRecordById(db,'basket', query);
    res.send(result);
  });


export default router;