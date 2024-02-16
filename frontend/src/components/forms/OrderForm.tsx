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

// Services
import { createOrder } from "@/services/orderServices";

const formSchema = z.object({
  table: z.coerce.number().min(1, "Mesa inválida"),
  quantity: z.coerce.number().min(1, "Cantidad inválida"),
});

const OrderForm = () => {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      table: "",
      quantity: "",
    },
  });

  async function handleSubmit(data: any) {
    try {
      setLoading(true);
      console.log("form data: ", data);
      await createOrder(data);
      toast({
        title: "Orden creada exitosamente",
      });
      form.reset();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
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
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cantidad</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ingrese la cantidad de cervezas"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <ClipLoader size={25} color="#FFFFFF" /> : "Crear"}
        </Button>
      </form>
    </Form>
  );
};

export default OrderForm;
