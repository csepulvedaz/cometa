"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";
import { useToast } from "@/components/ui/use-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Bill from "@/components/custom/Bill";

// Services
import { getBill } from "@/services/orderServices";

const formSchema = z.object({
  table: z.coerce.number().min(1, "Mesa inválida"),
  installments: z.coerce.number().min(1, "Cantidad inválida"),
});

const BillForm = ({ isPayment }: any) => {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [bill, setBill] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      table: "",
      installments: 1,
    },
  });

  async function handleSubmit(data: any) {
    try {
      setLoading(true);
      console.log("form data: ", data);
      const res = await getBill(data.table);
      if (!res) {
        toast({
          title: "No hay información para esa mesa",
          variant: "destructive",
        });
      }
      if (isPayment) {
        res.installments = data.installments;
      }
      setBill(res);
      form.reset();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return bill ? (
    <Bill bill={bill} setBill={setBill} isPayment={isPayment} />
  ) : (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="table"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mesa</FormLabel>
              <FormControl>
                <Input placeholder="Ingrese el número de mesa" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isPayment && (
          <FormField
            control={form.control}
            name="installments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dividir la cuenta en:</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrege el número de pagos" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <ClipLoader size={25} color="#FFFFFF" /> : "Consultar"}
        </Button>
      </form>
    </Form>
  );
};

export default BillForm;
