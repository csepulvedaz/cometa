import { Button } from "@/components/ui/button";

// Constants
import { ORDER_BILL_CONFIG } from "@/constants/orderConstants";

type BillItemProps = {
  title: string;
  value: string;
};

type BillProps = {
  bill: any;
  setBill: any;
};

const BillItem = ({ title, value }: BillItemProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="font-semibold">{title}</div>
      <div className="ml-auto font-semibold">{value}</div>
    </div>
  );
};

const Bill = ({ bill, setBill }: BillProps) => {
  const handleOk = () => {
    setBill(null);
  };

  return (
    <div className="flex flex-col gap-4">
      {Object.keys(bill).map((key) => {
        const config = ORDER_BILL_CONFIG[key];
        const title = config.title;
        const value = config.builder(bill[key]);
        return <BillItem key={key} title={title} value={value} />;
      })}
      <Button onClick={handleOk} className="w-full">
        Ok
      </Button>
    </div>
  );
};

export default Bill;
