from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ecommerce.db'
app.config['SECRET_KEY'] = 'mysecretkey'
jwt = JWTManager(app)
db = SQLAlchemy(app)

from models import Product  # Import models after defining them

@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    if username == 'user' and password == 'password':  # Simplified authentication
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token)
    return jsonify({"msg": "Bad username or password"}), 401

@app.route('/products/search', methods=['GET'])
@jwt_required()
def search_products():
    query = request.args.get('query', '')
    products = Product.query.filter(Product.name.contains(query)).all()
    return jsonify([{'id': p.id, 'name': p.name, 'description': p.description, 'price': p.price} for p in products])

@app.route('/chat/message', methods=['POST'])
@jwt_required()
def chat_message():
    user_message = request.json.get('message', '')
    # Simple mock response for product queries
    if "product" in user_message.lower():
        return jsonify({'reply': 'Sure! I can help you find products.'})
    return jsonify({'reply': 'Sorry, I didn’t understand that.'})

if __name__ == '__main__':
    app.run(debug=True)
