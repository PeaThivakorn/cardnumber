from flask import Flask, jsonify, request
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

@app.route('/get_product_data', methods=['POST'])
def get_product_data():
    product_code = request.json.get('product_code')
    url = f'https://www.advice.co.th/product/{product_code}'
    headers = {'User-Agent': 'Your User-Agent Here'}
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')

    # ดึงข้อมูลสินค้า
    image_url = soup.find('img', class_='product-image')['src']
    specs = [{'name': item.find('div', class_='spec-name').text.strip(),
              'value': item.find('div', class_='spec-value').text.strip()}
             for item in soup.find_all('div', class_='spec-item')]

    return jsonify({'image_url': image_url, 'specs': specs})

if __name__ == '__main__':
    app.run(debug=True)
