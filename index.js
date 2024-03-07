const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/BMW_Model", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const productScheme = new mongoose.Schema({
    marka: String,
    model: String,
    type_engine: String,
    color: String,
    price: String,
    quantity: String
});

const Product = mongoose.model("Product", productScheme);


app.get("/products", (req, res) => {
    Product.find({})
     .then((products) => {
        res.json(products);
     })
     .catch((err) => {
        console.error(err);
        res.status(500).send("Something wrong");
     });
});

app.get("/products/:id", (req, res) => {
    const productId = req.params.id;
    Product.findById(productId)
     .then((product) => {
        if (product) {
            res.json(product);
        } else {
            res.status(404).send("Not found");
        }
     })
     .catch((err) => {
        console.error(err);
        res.status(500).send("Something wrong");
     });
});

app.post('/products', (req, res) => {
    const { marka, model, type_engine, color, price, quantity } = req.body;
  
    const newProduct = new Product({
        marka, 
        model, 
        type_engine,
        color, 
        price,
        quantity
    });
  
    newProduct.save()
      .then(savedProduct => {
        res.json(savedProduct);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send("Something wrong");
      });
});

app.put('/products/:id', (req, res) => {
    const productId = req.params.id;
    const updatedProduct = req.body;

    Product.findByIdAndUpdate(productId, updatedProduct)
        .then(() => {
            res.send("Product updated successfully");
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Something wrong");
        });
});

app.delete('/products/:id', (req, res) => {
    const productId = req.params.id;

    Product.findByIdAndDelete(productId)
        .then(() => {
            res.send("Product deleted successfully");
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Something wrong");
        });
});

app.listen(8000, () => {
    console.log("Server started in: http://localhost:8000")
})