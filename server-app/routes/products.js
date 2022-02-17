import express from 'express'
import { findRecords, readRecordById, updateRecordById, deleteRecordById } from '../helpers/crud.js';
import { ObjectID } from 'mongodb';
import { db } from '../config/db.js'
const router = express.Router();

router.get('/', async (req, res) => {
    const items = await findRecords(db, 'products');
    const data = await items.toArray();
    res.send(data);
  });

router.get('/:id',  async (req, res) => {
    const id = req.params.id;
    const query = { '_id':  new ObjectID(id) };
    const item = await readRecordById(db, 'products', query);
    res.send(item);
  });

router.put('/:id',  async (req, res) => {
    const id = req.params.id;
    const query = { '_id': new ObjectID(id) };
    const data = req.body;
    delete data._id;
    const result = await updateRecordById(db, 'products', query, data);
    res.send(result);
  });

router.delete('/:id',  async (req, res) => {
    const id = req.params.id;
    const query = { '_id': new ObjectID(id) };
    const item = await deleteRecordById(db, 'products', query);
    res.send(item);
  });


export default router;