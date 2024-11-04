const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/get_product_data', async (req, res) => {
    const productCode = req.body.product_code;
    const url = `https://www.advice.co.th/product/${productCode}`;
    
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const imageUrl = $('img.product-image').attr('src');
        const specs = [];
        $('.spec-item').each((i, elem) => {
            specs.push({
                name: $(elem).find('.spec-name').text().trim(),
                value: $(elem).find('.spec-value').text().trim()
            });
        });

        res.json({ image_url: imageUrl, specs });
    } catch (error) {
        res.status(500).send('Error fetching product data');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
