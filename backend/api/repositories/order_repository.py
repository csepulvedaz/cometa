import json
import logging

# Schemas
from api.schemas.order_schemas import Order, OrderBill, OrderStatus

# Constants
from api.constants.json_constants import ORDERS_FILE

logger = logging.getLogger("api")


def create_order(order: Order) -> Order:
    logger.info("Creating order")
    with open(ORDERS_FILE, 'r') as file:
        data = json.load(file)
        orders = data['orders']
        for i, existing_order in enumerate(orders):
            if existing_order['table'] == order.table:
                orders[i] = order.dict()
                break
        else:
            orders.append(order.dict())
        data['orders'] = orders
    with open(ORDERS_FILE, 'w') as file:
        json.dump(data, file, indent=4)
    return order

def get_order_by_table(table: int) -> OrderBill:
    logger.info(f"Getting order by table {table}")
    with open(ORDERS_FILE, 'r') as file:
        data = json.load(file)
        orders = data['orders']
        for order in orders:
            if order['table'] == table:
                return OrderBill(**order)
    return None

def pay_order_by_table(pay: OrderBill) -> OrderBill:
    logger.info(f"Paying order by table {pay.table}")
    with open(ORDERS_FILE, 'r') as file:
        data = json.load(file)
        orders = data['orders']
        for order in orders:
            if order['table'] == pay.table:
                new_total_paid = order['paid'] + pay.paid
                if new_total_paid < order['total']:
                    order['paid'] = new_total_paid
                else:
                    order['paid'] = order['total']
                    order['status'] = OrderStatus.PAID.value
                with open(ORDERS_FILE, 'w') as file:
                    json.dump(data, file, indent=4)
                return OrderBill(**order)
    return None

def clean_orders() -> None:
    logger.info("Cleaning orders")
    with open(ORDERS_FILE, 'w') as file:
        json.dump({"orders": []}, file, indent=4)