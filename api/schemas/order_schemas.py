from pydantic import BaseModel
from datetime import datetime
from enum import Enum

class OrderStatus(Enum):
    PENDING = 'pending'
    PAID = 'paid'

class Order(BaseModel):
    table: int # This is the table number
    quantity: int
    status: str = OrderStatus.PENDING.value
    total: float
    paid: float = 0
    created_at: str = datetime.now().isoformat()
    updated_at: str = datetime.now().isoformat()


class OrderCreate(BaseModel):
    table: int
    quantity: int

class OrderBill(BaseModel):
    table: int
    total: float
    paid: float
    status: str

class OrderPay(BaseModel):
    table: int
    paid: float
 