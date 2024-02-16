import { formatCurrency } from "@/utils/formatUtils";

export const ORDER_STATUS: any = {
  pending: "Pendiente",
  paid: "Pagado",
};

export const ORDER_BILL_CONFIG: any = {
  table: {
    title: "Mesa",
    builder: (val: any) => val,
  },
  total: {
    title: "Total",
    builder: (val: any) => formatCurrency(val),
  },
  paid: {
    title: "Pagado hasta el momento",
    builder: (val: any) => formatCurrency(val),
  },
  status: {
    title: "Estado",
    builder: (val: any) => ORDER_STATUS[val],
  },
  installments: {
    title: "Nro de Pagos",
    builder: (val: any) => val,
  },
};
