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

const RootPage = () => {
  const [step, setStep] = useState(0);
  const tabs = [
    {
      title: "Crear Orden",
      description: "Ingrese el número de mesa y la cantidad de cervezas",
      step: OrderForm,
    },
    {
      title: "Obtener Cuenta",
      description:
        "Ingrese el número de mesa para obtener detalles de la cuenta",
      step: BillForm,
    },
    {
      title: "Pagar Cuenta",
      description: "",
      step: () => <div>Ordenes</div>,
    },
  ];

  return (
    <Tabs className="mb-5 w-1/4" value={`${step}`}>
      <TabSelector tabs={tabs} setStep={setStep} />
      {tabs.map((tab: Tab, index: number) => {
        const key = `${index}`;
        const Step = tab.step;
        return (
          <TabsContent key={key} value={key}>
            <CustomCard title={tab.title} description={tab.description}>
              <Step />
            </CustomCard>
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export default RootPage;
