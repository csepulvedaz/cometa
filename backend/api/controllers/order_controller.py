from fastapi import APIRouter

# Schemas
from api.schemas.order_schemas import Order, OrderCreate, OrderBill, OrderPay

# Repositories
from api.repositories import order_repository, stock_repository

# Constants
from api.constants.beer_constants import PRICE
from api.constants.error_constants import (
    ORDER_CREATION_ERROR,
    INVALID_QUANTITY_ERROR,
    INVALID_ORDER_TABLE_ERROR,
    INVALID_PAID_AMOUNT_ERROR,
    ORDER_BILL_GETTING_ERROR,
    ORDER_PAYING_ERROR,
    ORDER_CLEANING_ERROR,
    INSUFFICIENT_STOCK_ERROR
)

router = APIRouter(prefix="/orders", tags=["Orders"])


@router.post("/", response_model=Order)
def create_order(order: OrderCreate):
    if order.quantity < 1:
        INVALID_QUANTITY_ERROR.raise_exception()
    if order.table < 1:
        INVALID_ORDER_TABLE_ERROR.raise_exception()
    if not stock_repository.check_stock(order.quantity):
        INSUFFICIENT_STOCK_ERROR.raise_exception()
    try:
        new_order = Order(table=order.table, quantity=order.quantity, total=order.quantity * PRICE)
        return order_repository.create_order(new_order)
    except Exception as e:
        ORDER_CREATION_ERROR.raise_exception(exception=e)


@router.get("/", response_model=OrderBill)
def get_order_bill(table: int):
    if table < 1:
        INVALID_ORDER_TABLE_ERROR.raise_exception()
    try:
        return order_repository.get_order_by_table(table)
    except Exception as e:
        ORDER_BILL_GETTING_ERROR.raise_exception(exception=e)


@router.put("/pay", response_model=OrderBill)
def pay_order_bill(pay: OrderPay):
    if pay.table < 1:
        INVALID_ORDER_TABLE_ERROR.raise_exception()
    if pay.paid < 1:
        INVALID_PAID_AMOUNT_ERROR.raise_exception()
    try:
        return order_repository.pay_order_by_table(pay)
    except Exception as e:
        ORDER_PAYING_ERROR.raise_exception(exception=e)
    
@router.delete("/clean", response_model=str)
def clean_orders():
    try:
        order_repository.clean_orders()
        return "Orders cleaned"
    except Exception as e:
        ORDER_CLEANING_ERROR.raise_exception(exception=e)
