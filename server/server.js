import express, { json } from 'express';
import cors from 'cors';

import path from 'path';
import fs from 'fs/promises';

const data = JSON.parse(
   await fs.readFile(path.resolve('./server/products.json'), 'utf-8')
);

const server = express();

server.use(cors());
server.use(json());

server.get('/products', (req, res) => {
   res.send(Object.values(data.products));
});
server.post('/product', (req, res) => {
   const product = req.body;
   product.id = Math.floor(Math.random() * 100000000 + 7);
   data.products[product.id] = product;
   res.send();
});
server.put('/product/:id', (req, res) => {
   const newData = req.body;
   data.products[newData.id] = { ...data.products[newData.id], ...newData };
   res.send(data);
});
server.delete('/product/:id', (req, res) => {
   const id = req.params.id;
   if (id in data.products) {
      delete data.products[id];
   }
   res.send(req.params);
});

server.listen(8000);
