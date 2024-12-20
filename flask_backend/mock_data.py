from models import Product
from app import db
import random

def populate_mock_data():
    categories = ['Electronics', 'Books', 'Textiles']
    for i in range(100):
        product = Product(
            name=f'Product {i+1}',
            description=f'Description of product {i+1}',
            price=random.uniform(10, 500),
            category=random.choice(categories)
        )
        db.session.add(product)
    db.session.commit()

populate_mock_data()
