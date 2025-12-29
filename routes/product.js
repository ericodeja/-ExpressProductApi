import express from "express";
import {
  initStorage,
  saveFile,
  readFile,
} from "../file-storage/fileServices.js";

const router = express.Router();
await initStorage();

let allProducts;
try {
  allProducts = JSON.parse(await readFile("product.txt"));
} catch (err) {
  allProducts = [];
}

//Create New Product
router.post("/", async (req, res) => {
  const title = req.body.title;
  const price = req.body.price;
  const newId = allProducts[allProducts.length - 1].id + 1;

  allProducts.push({ id: newId, title: title, price: price });

  res.status(200).json({ id: newId, title: title, price: price });
  await saveFile("product.txt", JSON.stringify(allProducts));
});

// Get Product
router.get("/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  if (id) {
    const product = allProducts.find((product) => product.id === id);

    if (product) {
      res.status(200).json(product);
    } else {
      const error = new Error(`Product with ${id} doesn't exist`);
      error.status = 400;
      return next(error);
    }
  }
  res.status(200).json(allProducts);
});

//Update products
router.put("/:id", async (req, res, next) => {
  const id = parseInt(req.params.id);
  const newTitle = req.body.title;
  const newPrice = parseInt(req.body.price);

  if (id) {
    const product = allProducts.find((product) => product.id === id);

    if (product) {
      if (newTitle) {
        product.title = newTitle;
      }
      if (newPrice && !isNaN(newPrice)) {
        product.price = newPrice;
      }
    } else {
      const error = new Error(`Product with ${id} doesn't exist`);
      error.status = 400;
      return next(error);
    }
    await saveFile("product.txt", JSON.stringify(allProducts));

    res.status(200).json(product);
  }
});

//Delete products
router.delete("/:id", async (req, res, next) => {
  const id = parseInt(req.params.id);
  const check = allProducts.find((product) => product.id === id);
  if (check) {
    const result = allProducts.filter((product) => product.id !== id);
    allProducts = result;
    await saveFile("product.txt", JSON.stringify(allProducts));
    res.status(200).json(result);
  } else {
    const error = new Error(`Product with ${id} doesn't exist`);
    error.status = 400;
    return next(error);
  }
});

export default router;
