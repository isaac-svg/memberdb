"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import formSchema from "@/schema/form";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Child, db, Member } from "@/models/db";
import { useSearchParams } from "next/navigation";
import { printMember } from "@/components/sections/member-print";
import { convertImageToBase64 } from "@/lib/functions";
import { useToast } from "@/components/hooks/use-toast";
import { useLiveQuery } from "dexie-react-hooks";
import { Textarea } from "@/components/ui/textarea";
import { PrinterIcon } from "lucide-react";
import WithAuth from "@/components/auth/withAuth";
import childrenFormSchema from "@/schema/children";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const MemberPage = () => {
  const searchParams = useSearchParams();
  const ID = searchParams.get("id");
  const [disabled, setDisabled] = useState<boolean>(true);
  const [image, setImage] = useState<File | undefined>(undefined);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();

  const [defaulVal, setDefaultVal] = useState<Child>({
    bibleStudyGroup: "grace",
    name: "",
    contactPerson: "",
    dob: "",
    gender: "F",
    ghanaCardID: "",
    id: 1,
    Remarks: "",
    residentialAddress: "",
    age: "",
    mobileNumberOfGuidians: "",
    nameOfFather: "",
    nameOfMother: "",
    picture: "",
  });

  const member = useLiveQuery(() => db.table("child").get(Number(ID)), [ID]);

  const form = useForm<z.infer<typeof childrenFormSchema>>({
    resolver: zodResolver(childrenFormSchema),
    defaultValues: defaulVal,
  });

  const { reset } = form;

  useEffect(() => {
    if (member) {
      reset(member);
    }
  }, [member, reset]);

  const onSubmit = async (values: z.infer<typeof childrenFormSchema>) => {
    if (image) {
      const base64String = await convertImageToBase64(image);
      await db
        .table("chmembers")
        .update(Number(ID), { ...values, picture: base64String });
    } else {
      await db.table("chmembers").update(Number(ID), values);
    }
    toast({
      title: "Member updated successfully",
      description: "Changes have been saved.",
    });
  };

  if (!member)
    return (
      <div className="flex justify-center items-center h-screen w-full">
        {/* You can use any spinner/loading component or text here */}
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600"></div>
        <span className="ml-2">Loading...</span>
      </div>
    );

  return (
    <section className="w-full mr-auto">
      <div className="flex justify-between items-center border-b px-4 py-2">
        <Button variant="outline">Member Details</Button>
        <Button variant="outline" onClick={() => setDisabled(!disabled)}>
          {disabled ? "Edit" : "Cancel"}
        </Button>
      </div>
      <div className="mx-auto mt-6 w-full max-w-xl">
        <div className="flex gap-3 justify-between p-2 rounded-sm items-center border">
          <div className="flex gap-3 items-center">
            <Avatar className="w-20 h-20">
              <AvatarImage src={member?.picture ?? "/images/placeholder.svg"} />
              <AvatarFallback>
                {member?.name?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p>{member?.name}</p>
              <p>{member?.residentialAddress}</p>
            </div>
          </div>
          <Button
            onClick={() => printMember(member)}
            size="sm"
            className="h-7 gap-1"
            variant="outline"
          >
            {" "}
            <PrinterIcon className="h-3.5 w-3.5" />{" "}
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Print
            </span>
          </Button>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 mx-auto max-w-xl border  py-8 px-4 rounded-md"
          >
            <div className="flex gap-2 w-full flex-col sm:flex-row">
              <FormField
                control={form.control}
                disabled={disabled}
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
                disabled={disabled}
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
                disabled={disabled}
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
                disabled={disabled}
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
                disabled={disabled}
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
                disabled={disabled}
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
                disabled={disabled}
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
                disabled={disabled}
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
                disabled={disabled}
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
                disabled={disabled}
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
                disabled={disabled}
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
                disabled={disabled}
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
                disabled={disabled}
                name="bibleStudyGroup"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Bible Study Group</FormLabel>
                    <FormControl>
                      {/* <Input placeholder="Deacon" {...field} /> */}
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row  space-x-1"
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
                disabled={disabled}
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
            {!disabled && (
              <Button type="submit" onClick={() => console.log("first")}>
                Update Member
              </Button>
            )}
          </form>
        </Form>
      </div>
    </section>
  );
};

const MemberPageWrapper = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen w-full">
          {/* You can use any spinner/loading component or text here */}
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600"></div>
          <span className="ml-2">Loading...</span>
        </div>
      }
    >
      <MemberPage />
    </Suspense>
  );
};

export default MemberPageWrapper;
