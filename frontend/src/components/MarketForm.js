import React, { useState } from 'react';
import axios from 'axios';

const MarketForm = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const total = parseFloat(price) * parseFloat(quantity);

    const data = {
      productName,
      price,
      quantity,
      category,
      total,
    };

    try {
      await axios.post('http://localhost:5000/api/add', data);
      alert('Ürün başarıyla eklendi.');
      setProductName('');
      setPrice('');
      setQuantity('');
      setCategory('');
    } catch (error) {
      console.error('Ürün eklenirken bir hata oluştu.', error);
    }
  };

  return (
    <div className="container">
      <h1>Market Bilgi Formu</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="product-name">Ürün Adı:</label>
        <input
          type="text"
          id="product-name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
        <label htmlFor="price">Fiyat:</label>
        <input
          type="text"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <label htmlFor="quantity">Miktar:</label>
        <input
          type="text"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <label htmlFor="category">Kategori:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="" disabled>-- Kategori Seçin --</option>
          <option value="sağlık">Sağlık</option>
          <option value="eğitim">Eğitim</option>
          <option value="gıda">Gıda</option>
        </select>
        <button type="submit">Ekle</button>
        <button type="button" className="clear-btn" onClick={clearTable}>Temizle</button>
      </form>
    </div>
  );
};

export default MarketForm;

