import json

# Schemas
from api.schemas.stock_schemas import Stock

# Constants
from api.constants.json_constants import STOCK_FILE

def get_stock() -> Stock:
    with open(STOCK_FILE, 'r') as file:
        data = json.load(file)
        return Stock(**data)

def update_stock(quantity: int) -> Stock:
    with open(STOCK_FILE, 'w') as file:
        data = {'quantity': quantity}
        json.dump(data, file, indent=4)
        return Stock(**data)
    
def check_stock(quantity: int) -> bool:
    stock = get_stock()
    return stock.quantity >= quantity

def subtract_stock(quantity: int) -> Stock:
    stock = get_stock()
    new_quantity = stock.quantity - quantity
    if new_quantity < 0:
        raise ValueError("Insufficient stock")
    return update_stock(new_quantity)