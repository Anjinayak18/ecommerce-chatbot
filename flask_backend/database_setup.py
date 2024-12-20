from app import db
from models import Product

# Create database tables
db.create_all()

# Populate with mock data
from mock_data import populate_mock_data
populate_mock_data()
