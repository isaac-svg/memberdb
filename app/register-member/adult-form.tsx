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
import formSchema from "@/schema/form";
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
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarComponent } from "@/components/ui/calender";
import { Year } from "@/components/date-picker";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

type Props = {};

const AdultForm = (props: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { toast } = useToast();

  const [image, setImage] = useState<File | undefined>(undefined);
  const members = useLiveQuery(() => db.chmembers.toArray());
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [startDate, setStartDate] = useState<Date | null>();
  const [dateValue, setDateValue] = useState<string>("");

  const [dateError, setDateError] = useState<boolean>(false);
  async function addMember(values: z.infer<typeof formSchema>) {
    try {
      // Add the new friend!
      const nen = await db.chmembers.add({
        ...values,
      });
      console.log({ ...values }, "VALUES");
      console.log(nen, "-", members);
    } catch (error) {
      // setStatus(`Failed to add ${name}: ${error}`);
    }
  }
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values");

    try {
      if (await isRegistered(values, "adult"))
        throw new Error("User is already registered");
      if (image?.name) {
        const base64String = await convertImageToBase64(image);
        console.log(image.name);
        addMember({ ...values, picture: base64String });
        console.log({ ...values, picture: base64String });
      } else {
        addMember({ ...values, dob: dateValue });
      }
      form.reset();
      toast({
        title: "Member added to DB successfully",
        variant: "default",
        description: "You can click on the edit button to update the details",
      });
    } catch (error: any) {
      console.log(error);
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
                  <FormDescription></FormDescription>
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
              name="mobile"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Phone Number</FormLabel>
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
              name="residentialAddress"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Address</FormLabel>
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
              name="occupation"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Occupation</FormLabel>
                  <FormControl>
                    <Input placeholder="Farmer" {...field} />
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
              name="maritalStatus"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Marital Status</FormLabel>
                  <FormControl>
                    <Input placeholder="Married/Single" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="spouseName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Spouse Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Raymond Smith" {...field} />
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
              name="numberOfChildren"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Number of Children</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="2" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numberOfOtherHouseholdMembers"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Number of other household members</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="2" {...field} />
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
              name="role"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    {/* <Input placeholder="Deacon" {...field} /> */}
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-row  flex-wrap"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="elder" />
                        </FormControl>
                        <FormLabel className="font-normal">Elder</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="deacon" />
                        </FormControl>
                        <FormLabel className="font-normal">Deacon</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="member" />
                        </FormControl>
                        <FormLabel className="font-normal">Member</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                      className="flex flex-row  flex-wrap"
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

export default AdultForm;
