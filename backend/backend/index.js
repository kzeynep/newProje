const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/marketDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const marketSchema = new mongoose.Schema({
  productName: String,
  price: Number,
  quantity: Number,
  category: String,
  total: Number,
});

const Market = mongoose.model('Market', marketSchema);

app.post('/api/add', (req, res) => {
  const { productName, price, quantity, category, total } = req.body;
  const newProduct = new Market({
    productName,
    price,
    quantity,
    category,
    total,
  });

  newProduct.save((err) => {
    if (err) {
      res.status(500).send('Veritabanına ürün eklenirken bir hata oluştu.');
    } else {
      res.status(200).send('Ürün başarıyla eklendi.');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server başlatıldı: http://localhost:${PORT}`);
});
