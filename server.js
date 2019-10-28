const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const PORT = process.env.PORT || 5000;
const {
    Product
} = require('./models/product')


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

// app.get('/', (req, res) => {
//     res.send(`vanvan`);
// })


app.get('/product', (req, res) => {
    Product.find().then((product) => {
        res.send({
            product
        });
    }, (e) => {
        res.status(400).send(e);
    });
});

app.post('/product', (req, res) => {
    var product = new Product({
        productID: Math.floor(Math.random() * 10000) + 1,
        price: req.body.price,
        name: req.body.name
    });

    // result = User.addUser(user);
    product.save().then((product) => {
        res.send(product);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/product/:productID', (req, res) => {
    var productID = req.params.productID;

    Product.findOne({
        productID: productID
    }).then((product) => {
        res.send(product);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.put('/product/:productID', (req, res) => {
    var query = {
        productID: req.params.productID
    };

    Product.findOneAndUpdate(query, {
        price: req.body.price,
        name: req.body.name
    }, {
        upsert: true
    }, (e, raw) => {
        if (e) {
            res.status(400).send('Invalid product supplied');
        }
        res.send(raw);
    });
});


app.delete('/product/:productID', (req, res) => {
    var query = {
        productID: req.params.productID,
    };
    Product.findOneAndRemove(query,
        (e, raw) => {
            if (e) {
                res.status(400).send('Invalid product supplied');
            }
            res.send(raw);
        });

});