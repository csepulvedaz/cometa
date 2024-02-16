"use client";

import { useState } from "react";

// Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomCard from "@/components/custom/CustomCard";

// Forms
import OrderForm from "@/components/forms/OrderForm";
import BillForm from "@/components/forms/BillForm";

type Tab = {
  title: string;
  description: string;
  step: any;
  isPayment: boolean;
};

const TabSelector = ({ tabs, setStep }: any) => (
  <TabsList className="mb-7 grid auto-cols-fr grid-flow-col">
    {tabs.map((_: any, index: number) => {
      const key = `${index}`;
      return (
        <TabsTrigger key={key} value={key} onClick={() => setStep(index)}>
          {index + 1}
        </TabsTrigger>
      );
    })}
  </TabsList>
);

const TABS = [
  {
    title: "Crear Orden",
    description: "Ingrese el número de mesa y la cantidad de cervezas",
    step: OrderForm,
    isPayment: false,
  },
  {
    title: "Obtener Cuenta",
    description: "Ingrese el número de mesa para obtener detalles de la cuenta",
    step: BillForm,
    isPayment: false,
  },
  {
    title: "Pagar Cuenta",
    description: "Ingrese el número de mesa para pagar la cuenta",
    step: BillForm,
    isPayment: true,
  },
];

const RootPage = () => {
  const [step, setStep] = useState(0);

  return (
    <Tabs className="mb-5 w-1/4" value={`${step}`}>
      <TabSelector tabs={TABS} setStep={setStep} />
      {TABS.map((tab: Tab, index: number) => {
        const key = `${index}`;
        const Step = tab.step;
        return (
          <TabsContent key={key} value={key}>
            <CustomCard title={tab.title} description={tab.description}>
              <Step isPayment={tab.isPayment} />
            </CustomCard>
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export default RootPage;
