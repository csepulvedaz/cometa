from pydantic import BaseModel


class Stock(BaseModel):
    quantity: int