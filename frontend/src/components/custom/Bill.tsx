import { Button } from "@/components/ui/button";

// Constants
import { ORDER_BILL_CONFIG } from "@/constants/orderConstants";

// Services
import { payBill, getBill } from "@/services/orderServices";

type BillItemProps = {
  title: string;
  value: string;
};

type BillProps = {
  bill: any;
  setBill: any;
  isPayment: boolean;
};

const BillItem = ({ title, value }: BillItemProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="font-semibold">{title}</div>
      <div className="ml-auto font-semibold">{value}</div>
    </div>
  );
};

const Bill = ({ bill, setBill, isPayment }: BillProps) => {
  const isPaid = bill.status === "paid";

  const handleClick = async () => {
    if (isPayment && !isPaid) {
      try {
        await payBill({
          table: bill.table,
          paid: bill.total / bill.installments,
        });
        const res = await getBill(bill.table);
        setBill({ ...res, installments: bill.installments });
      } catch (err) {
        console.error(err);
      }
    } else {
      setBill(null);
    }
  };

  const buttonLabel = isPayment && !isPaid ? "Pagar" : "Volver";

  return (
    <div className="flex flex-col gap-4">
      {Object.keys(bill).map((key) => {
        const config = ORDER_BILL_CONFIG[key];
        const title = config.title;
        const value = config.builder(bill[key]);
        return <BillItem key={key} title={title} value={value} />;
      })}
      <Button onClick={handleClick} className="w-full">
        {buttonLabel}
      </Button>
    </div>
  );
};

export default Bill;
