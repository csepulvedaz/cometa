import logging
from fastapi import APIRouter

# Schemas
from api.schemas.stock_schemas import Stock

# Repositories
from api.repositories import stock_repository

# Constants
from api.constants.error_constants import STOCK_GETTING_ERROR, STOCK_UPDATING_ERROR, INVALID_QUANTITY_ERROR

logger = logging.getLogger("api")
router = APIRouter(prefix="/stock", tags=["Stock"])


@router.get("/", response_model=Stock)
def get_stock():
    try:
        logger.info("Getting stock")
        return stock_repository.get_stock()
    except Exception as e:
        STOCK_GETTING_ERROR.raise_exception(exception=e)


@router.put("/", response_model=Stock)
def update_stock(quantity: int):
    if quantity < 0:
        INVALID_QUANTITY_ERROR.raise_exception()
    try:
        logger.info("Updating stock")
        return stock_repository.update_stock(quantity)
    except Exception as e:
        STOCK_UPDATING_ERROR.raise_exception(exception=e)
