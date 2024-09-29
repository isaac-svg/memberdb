"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import titheSchema from "@/schema/tithe";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
type Props = {};

const AddTithe = (props: Props) => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    //   weekday: "long",
    year: "numeric",
    month: "long",
    //   day: "numeric",
  });
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const form = useForm<z.infer<typeof titheSchema>>({
    resolver: zodResolver(titheSchema),
  });

  const handleSubmit = async (values: z.infer<typeof titheSchema>) => {
    console.log(values);
  };
  return (
    <div className="my-8">
      <header className="mb-8 mx-auto  text-center">
        <h1 className="text-3xl font-bold text-muted-foreground mb-2">
          Add tithe for {currentDate}
        </h1>
        <p className="text-gray-600">{currentTime}</p>
      </header>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4 mx-auto max-w-xl border  py-8 px-4 rounded-md"
        >
          <div className="flex gap-2 w-full flex-col sm:flex-row">
            <FormField
              control={form.control}
              name="titherName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Name of tither</FormLabel>
                  <FormControl>
                    <Input placeholder="Isaac Sakyi" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel> Amount</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="355.59" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-2 w-full flex-col sm:flex-row">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" placeholder="Isaac Sakyi" {...field} />
                  </FormControl>
                  <FormDescription>
                    Add date if this type was not paid this month
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="titherMobileNumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel> Mobile Number - optional</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="0591514584" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            onClick={() => {
              console.log("I am here");
            }}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddTithe;
