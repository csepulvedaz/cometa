import { createRequest, throwResErrors } from "@/lib/axios";

type Order = {
  table: number;
  quantity: number;
};

type PayBill = {
  table: number,
  paid: number
}

export const createOrder = async (data: Order) => {
  try {
    const res = await createRequest().post("/orders/", data);
    return res.data;
  } catch (err) {
    throwResErrors(err);
  }
};

export const getBill = async (table: number) => {
  try {
    const res = await createRequest().get(`/orders/${table}`);
    return res.data;
  } catch (err) {
    throwResErrors(err);
  }
};

export const payBill = async (data: PayBill) => {
  try {
    const res = await createRequest().put("/orders/pay/", data);
    return res.data;
  } catch (err) {
    throwResErrors(err);
  }
};
