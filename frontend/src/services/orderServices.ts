import { createRequest, throwResErrors } from "@/lib/axios";

type Order = {
  table: number;
  quantity: number;
};

export const createOrder = async (data: Order) => {
  try {
    const res = await createRequest().post("/orders/", data);
    return res.data;
  } catch (err) {
    throwResErrors(err);
  }
};

export const getTableBill = async (table: number) => {
  try {
    const res = await createRequest().get(`/orders/${table}`);
    return res.data;
  } catch (err) {
    throwResErrors(err);
  }
};
