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
import { db, isRegistered } from "@/models/db";
import { useLiveQuery } from "dexie-react-hooks";
import { convertImageToBase64 } from "@/lib/functions";
import WithAuth from "@/components/auth/withAuth";
import DatePicker from "react-datepicker";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

type Props = {};

const ChildrenForm = (props: Props) => {
  const form = useForm<z.infer<typeof childrenFormSchema>>({
    resolver: zodResolver(childrenFormSchema),
    // defaultValues: {
    //   name: "Child Name", // Example child's name
    //   dob: "2015-07-15", // Example date of birth (YYYY-MM-DD)
    //   age: "8", // Example age
    //   gender: "Male", // Example gender
    //   nameOfMother: "Mother Name", // Example mother's name
    //   cell: "0241234567", // Example cell number (optional)
    //   nameOfFather: "Father Name", // Example father's name
    //   residentialAddress: "GA-183-4567", // Example GhanaPost GPS address
    //   mobileNumberOfGuidians: "0248765432", // Example mobile number of guardians (optional)
    //   contactPerson: "Aunt Alice", // Example contact person
    //   Remarks: "Child is very active in group discussions.", // Example remarks
    //   ghanaCardID: "GHA-987654321-0", // Example Ghana Card ID (optional)
    //   picture: null, // Assuming no picture is selected by default
    //   bibleStudyGroup: "hope",
    // },
  });
  const { toast } = useToast();

  const [image, setImage] = useState<File | undefined>(undefined);
  const members = useLiveQuery(() => db.child.toArray());
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [startDate, setStartDate] = useState<Date | null>();
  const [dateValue, setDateValue] = useState<string>("");
  const [dateError, setDateError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

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

    try {
      const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
      console.log(dateValue, "FULL HERE");

      if (!dateValue) {
        toast({
          title: "Error",
          variant: "destructive",
          description: "Date of birth is a required field",
        });
        setDateError(true);
        return;
      }
      if (!dateRegex.test(dateValue.toString())) {
        setDateError(true);
        toast({
          title: "Error",
          variant: "destructive",
          description: "Plase use this format dd/mm/yyyy for the date of birth",
        });
        return;
      }
      if (await isRegistered({ ...values, dob: dateValue }, "child"))
        throw new Error("User is already registered");

      if (image?.name) {
        const base64String = await convertImageToBase64(image);
        console.log(image.name);
        addMember({ ...values, picture: base64String, dob: dateValue });
        console.log({ ...values, picture: base64String });
      } else {
        addMember({ ...values, dob: dateValue });
      }

      // @ts-ignore
      form.reset({
        name: "",
        contactPerson: "",
        ghanaCardID: "",
        picture: "",
        dob: "",
        residentialAddress: "",
        Remarks: "",
        bibleStudyGroup: "",
        age: "",
        cell: "",
        gender: "",
        mobileNumberOfGuidians: "",
        nameOfFather: "",
        nameOfMother: "",
      });
      toast({
        title: "Member added to DB successfully",
        variant: "default",
        description: "You can click on the edit button to update the details",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        variant: "destructive",
        description: error.message,
      });
    }
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
                  <FormLabel
                    className={cn(
                      dateError ? "text-destructive block" : "block"
                    )}
                  >
                    Date of Birth
                  </FormLabel>
                  <FormControl className="flex w-full ">
                    {/* <Input type="text" {...field} onFocus={} /> */}
                    <DatePicker
                      // required={true}
                      onChangeRaw={() => setDateError(false)}
                      {...field}
                      className=" !flex h-9 !w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      placeholderText="dd/MM/yyyy"
                      selected={startDate}
                      dateFormat="dd/MM/yyyy"
                      onChange={(date) => {
                        setStartDate(date);
                        setDateValue(format(date!, "MM/dd/yyyy"));
                      }}
                      maxDate={new Date()}
                    />
                  </FormControl>
                  {/* <FormControl> */}
                  {/* <Input placeholder="2024-09-22" {...field} /> */}
                  {/* <CalenderFo */}
                  {/* <input type="date" /> */}
                  {/* </FormControl> */}
                  {dateError && (
                    <FormDescription className="text-[0.8rem] font-medium text-destructive">
                      {" "}
                      Date of birth is required and must be of the form
                      09/09/2000
                    </FormDescription>
                  )}
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
                      className="flex flex-row "
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
          <Button
            type="submit"
            onClick={() => {
              const dateRegex =
                /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
              console.log(dateValue, "FULL HERE");

              if (!dateValue) {
                console.log(dateValue, "EMPTY HERE");
                setDateError(true);
                return;
              }
              if (!dateRegex.test(dateValue.toString())) {
                setDateError(true);
                return;
              }
            }}
          >
            Add Member
          </Button>
        </form>
      </Form>
    </FormProvider>
  );
};

export default ChildrenForm;
