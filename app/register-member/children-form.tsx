"use client";

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
import childrenFormSchema from "@/schema/children";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/hooks/use-toast";
import { useRef, useState } from "react";
import { db } from "@/models/db";
import { useLiveQuery } from "dexie-react-hooks";
import { convertImageToBase64 } from "@/lib/functions";
import WithAuth from "@/components/auth/withAuth";

type Props = {};

const ChildrenForm = (props: Props) => {
  const form = useForm<z.infer<typeof childrenFormSchema>>({
    resolver: zodResolver(childrenFormSchema),
  });
  const { toast } = useToast();

  const [image, setImage] = useState<File | undefined>(undefined);
  const members = useLiveQuery(() => db.child.toArray());
  const fileRef = useRef<HTMLInputElement | null>(null);

  async function addMember(values: z.infer<typeof childrenFormSchema>) {
    try {
      // Add the new friend!
      const nen = await db.child.add({
        ...values,
      });
      console.log({ ...values }, "VALUES");
      console.log(nen, "-", members);
    } catch (error) {
      // setStatus(`Failed to add ${name}: ${error}`);
    }
  }
  async function onSubmit(values: z.infer<typeof childrenFormSchema>) {
    console.log("values");

    if (image?.name) {
      const base64String = await convertImageToBase64(image);
      console.log(image.name);
      addMember({ ...values, picture: base64String });
      console.log({ ...values, picture: base64String });
    } else {
      addMember(values);
    }

    toast({
      title: "Member added to DB successfully",
      variant: "default",
      description: "You can click on the edit button to update the details",
    });
  }
  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mx-auto max-w-xl border  py-8 px-4 rounded-md"
        >
          <div className="flex gap-2 w-full flex-col sm:flex-row">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Isaac Sakyi" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input placeholder="2024-09-22" {...field} />
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
              name="gender"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Input placeholder="M/F" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input placeholder="0591514584" {...field} />
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
              name="nameOfMother"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Name of mother</FormLabel>
                  <FormControl>
                    <Input placeholder="GA-183-456" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nameOfFather"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Name of father</FormLabel>
                  <FormControl>
                    <Input placeholder="Jordan Brown" {...field} />
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
              name="mobileNumberOfGuidians"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Mobile number of Guardian</FormLabel>
                  <FormControl>
                    <Input placeholder="02898989898" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="residentialAddress"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Residential Address</FormLabel>
                  <FormControl>
                    <Input placeholder="GA-123-123" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-2 w-full flex-col sm:flex-row"></div>
          <div className="flex gap-2 w-full flex-col sm:flex-row">
            <FormField
              control={form.control}
              name="ghanaCardID"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Ghana Card ID</FormLabel>
                  <FormControl>
                    <Input placeholder="GHA-XXXXXXXXX-X" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="picture"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Upload Photo</FormLabel>
                  <FormControl>
                    <input
                      ref={fileRef}
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => {
                        setImage(e.target?.files?.[0]);
                        const a = e.target?.files?.[0];
                        console.log(e.target?.files?.[0]);
                      }}
                    />
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
              name="cell"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Cell</FormLabel>
                  <FormControl>
                    <Input placeholder="Love" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactPerson"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Contact Person</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="John Peter is my father and you can contatc him on 0244444444"
                      {...field}
                    />
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
              name="bibleStudyGroup"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Bible Study Group</FormLabel>
                  <FormControl>
                    {/* <Input placeholder="Deacon" {...field} /> */}
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="joy" />
                        </FormControl>
                        <FormLabel className="font-normal">Joy</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="love" />
                        </FormControl>
                        <FormLabel className="font-normal">Love</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="peace" />
                        </FormControl>
                        <FormLabel className="font-normal">Peace</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="hope" />
                        </FormControl>
                        <FormLabel className="font-normal">Hope</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="grace" />
                        </FormControl>
                        <FormLabel className="font-normal">Grace</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="mercy" />
                        </FormControl>
                        <FormLabel className="font-normal">Mercy</FormLabel>
                      </FormItem>
                    </RadioGroup>
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
              name="Remarks"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Remarks</FormLabel>
                  <FormControl>
                    <Textarea placeholder="remarks" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" onClick={() => console.log("first")}>
            Add Member
          </Button>
        </form>
      </Form>
    </FormProvider>
  );
};

export default ChildrenForm;
