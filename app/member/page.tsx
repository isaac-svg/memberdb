"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { copyFile, BaseDirectory } from "@tauri-apps/api/fs";

type Props = {};
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { db, Member } from "@/models/db";
import { useRouter, useSearchParams } from "next/navigation";

const page = (props: Props) => {
  const [file, setFile] = useState();
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values");
    console.log(values, file);
  }
  const [disabled, setDisAbled] = useState<boolean>(true);
  const [member, setMember] = useState<Member | undefined>(undefined);
  // const { id } = router.query;
  const searchParams = useSearchParams();
  const ID = searchParams.get("id");
  console.log(ID, "ID");

  type idType = string | number | symbol;
  type memberData = Partial<Member>;
  // const data: memberData = member!;
  const others = member!;
  console.log(others);
  const [defaulVal, setDefaultVal] = useState<Member>({
    bibleStudyGroup: "grace",
    name: "",
    cell: "",
    contactPerson: "",
    dob: "",
    gender: "F",
    ghanaCardID: "",
    id: 1,
    maritalStatus: "",
    mobile: "",
    numberOfChildren: "",
    numberOfOtherHouseholdMembers: "",
    occupation: "",
    Remarks: "",
    residentialAddress: "",
    role: "deacon",
    spouseName: "",
  });
  useEffect(() => {
    setDefaultVal(others);
    console.log("2");
  }, [others]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaulVal,
  });

  const { reset } = form;

  useEffect(() => {
    if (ID) {
      const fetchMember = async () => {
        try {
          const memberData = await db.chmembers.get(Number(ID));
          setMember(memberData);
          console.log(memberData);

          // Reset the form values with the fetched member data
          if (memberData) {
            reset(memberData);
          }
        } catch (error) {
          console.error("Failed to fetch member:", error);
        }
      };
      fetchMember();
    }
  }, [ID, reset]);
  if (!ID) return "EMPTY";

  console.log("data", others);
  return (
    <section className="w-full mr-auto">
      <div className="flex justify-between items-center border-b  px-4 py-2">
        <Button variant="outline"> Member Details</Button>
        <Button
          variant="outline"
          onClick={() => {
            setDisAbled(!disabled);
          }}
        >
          {" "}
          {disabled ? "Edit" : "Cancel"}
        </Button>
      </div>
      <div className="mx-auto mt-6 w-full ">
        <div className="mx-auto gap-3 p-2 rounded-sm justify-between items-center flex w-full h-fit border max-w-xl">
          <div className="flex items-center gap-3">
            <Avatar className=" w-20 h-20">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>
                {defaulVal?.name?.slice(0, 2).toLocaleUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p>{defaulVal?.name}</p>
              <p>{defaulVal?.residentialAddress}</p>
            </div>
          </div>
          <Button
            onClick={() => {
              setDisAbled(false);

              window.print();
              setDisAbled(true);
            }}
          >
            Print
          </Button>
        </div>

        <FormProvider {...form}>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4 mx-auto max-w-xl  border-0 py-8 px-4 rounded-md mr-auto"
            >
              <div className="flex gap-2 w-full flex-col sm:flex-row">
                <FormField
                  disabled={disabled}
                  defaultValue={others?.name}
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
                  disabled={disabled}
                  defaultValue={others?.dob}
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
                  disabled={disabled}
                  defaultValue={others?.gender}
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
                  disabled={disabled}
                  defaultValue={others?.mobile}
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
                  disabled={disabled}
                  defaultValue={others?.residentialAddress}
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
                  disabled={disabled}
                  defaultValue={others?.name}
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
                  disabled={disabled}
                  defaultValue={others?.name}
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
                  disabled={disabled}
                  defaultValue={others?.name}
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
                  disabled={disabled}
                  defaultValue={others?.name}
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
                  disabled={disabled}
                  defaultValue={others?.name}
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
                  disabled={disabled}
                  defaultValue={others?.name}
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
                  defaultValue={others?.name}
                  name="picture"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Upload Photo</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept=".jpg, .jpeg, .png"
                          disabled={disabled}
                          defaultValue={others?.name}
                          // value={file}
                          // onChange={(e)=> setFile(e.target.value as unknown)}
                          // placeholder="GHA-XXXXXXXXX-X"
                          // {...field}
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
                  defaultValue={others?.name}
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
                  defaultValue={others?.name}
                  name="contactPerson"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Contact Person</FormLabel>
                      <FormControl>
                        <Input placeholder="Love" {...field} />
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
                  defaultValue={others?.name}
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
                  Update
                </Button>
              )}
            </form>
          </Form>
        </FormProvider>
      </div>
    </section>
  );
};

export default page;
