from fastapi import status
from api.schemas.error_schemas import ErrorResponse

# Stock errors messages
STOCK_GETTING_ERROR = ErrorResponse(
    message="Error getting stock",
    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
)
STOCK_UPDATING_ERROR = ErrorResponse(
    message="Error updating stock",
    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
)
INSUFFICIENT_STOCK_ERROR = ErrorResponse(
    message="Insufficient stock",
    status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
)

# Order errors messages
ORDER_CREATION_ERROR = ErrorResponse(
    message="Error creating order",
    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
)
ORDER_BILL_GETTING_ERROR= ErrorResponse(
    message="Error getting order bill",
    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
)
ORDER_PAYING_ERROR= ErrorResponse(
    message="Error paying order bill",
    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
)
ORDER_CLEANING_ERROR= ErrorResponse(
    message="Error cleaning orders",
    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
)

# Data validation errors messages
VALIDATION_ERROR = ErrorResponse(
    message="One or more fields are missing or wrong",
    status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
)
INVALID_QUANTITY_ERROR = ErrorResponse(
    message="Quantity must be greater than 0",
    status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
)
INVALID_ORDER_TABLE_ERROR = ErrorResponse(
    message="Table number must be greater than 0",
    status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
)
INVALID_PAID_AMOUNT_ERROR = ErrorResponse(
    message="Paid amount must be greater than 0",
    status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
)