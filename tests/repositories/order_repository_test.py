import unittest
from unittest.mock import patch, mock_open
from api.schemas.order_schemas import Order, OrderBill, OrderStatus
from api.constants.json_constants import ORDERS_FILE
from api.repositories.order_repository import create_order, get_order_by_table, pay_order_by_table, clean_orders

class TestOrderRepository(unittest.TestCase):
    @patch('builtins.open', new_callable=mock_open, read_data='{"orders": []}')
    def test_create_order(self, mock_file):
        order = Order(table=1, items=[{"name": "item1", "price": 10}], total=10, paid=0, status=OrderStatus.PENDING.value, quantity=1)
        result = create_order(order)
        self.assertEqual(result, order)
        mock_file.assert_called_with(ORDERS_FILE, 'w')

    @patch('builtins.open', new_callable=mock_open, read_data='{"orders": [{"table": 1, "items": [{"name": "item1", "price": 10}], "total": 10, "paid": 0, "status": "pending"}]}')
    def test_get_order_by_table(self, mock_file):
        result = get_order_by_table(1)
        expected = OrderBill(table=1, items=[{"name": "item1", "price": 10}], total=10, paid=0, status=OrderStatus.PENDING.value)
        self.assertEqual(result, expected)

    @patch('builtins.open', new_callable=mock_open, read_data='{"orders": [{"table": 1, "items": [{"name": "item1", "price": 10}], "total": 10, "paid": 0, "status": "pending"}]}')
    def test_pay_order_by_table(self, mock_file):
        pay = OrderBill(table=1, items=[{"name": "item1", "price": 10}], total=10, paid=10, status=OrderStatus.PAID.value)
        result = pay_order_by_table(pay)
        self.assertEqual(result, pay)
        mock_file.assert_called_with(ORDERS_FILE, 'w')

    @patch('builtins.open', new_callable=mock_open)
    def test_clean_orders(self, mock_file):
        clean_orders()
        mock_file.assert_called_with(ORDERS_FILE, 'w')

if __name__ == '__main__':
    unittest.main()