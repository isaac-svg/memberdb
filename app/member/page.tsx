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
import { db, Member } from "@/models/db";
import { useSearchParams } from "next/navigation";
import { printMember } from "@/components/sections/member-print";
import { convertImageToBase64 } from "@/lib/functions";
import { useToast } from "@/components/hooks/use-toast";
import { useLiveQuery } from "dexie-react-hooks";
import { Textarea } from "@/components/ui/textarea";
import { PrinterIcon } from "lucide-react";
import WithAuth from "@/components/auth/withAuth";

const MemberPage = () => {
  const searchParams = useSearchParams();
  const ID = searchParams.get("id");
  const [disabled, setDisabled] = useState<boolean>(true);
  const [image, setImage] = useState<File | undefined>(undefined);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();

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

  const member = useLiveQuery(
    () => db.table("chmembers").get(Number(ID)),
    [ID]
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaulVal,
  });

  const { reset } = form;

  useEffect(() => {
    if (member) {
      reset(member);
    }
  }, [member, reset]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
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

        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 mx-auto py-8 px-4"
          >
            <div className="flex gap-2">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Isaac Sakyi"
                        disabled={disabled}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="dob"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="2024-09-22"
                        disabled={disabled}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-2">
              <FormField
                name="gender"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Input placeholder="M/F" disabled={disabled} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="mobile"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="0591514584"
                        disabled={disabled}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-2">
              <FormField
                name="residentialAddress"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Residential Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="GA-183-456"
                        disabled={disabled}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="occupation"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Occupation</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Farmer"
                        disabled={disabled}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-2">
              <FormField
                name="maritalStatus"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Marital Status</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Married/Single"
                        disabled={disabled}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="spouseName"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Spouse Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Raymond Smith"
                        disabled={disabled}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-2">
              <FormField
                name="numberOfChildren"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Number of Children</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="2"
                        disabled={disabled}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="numberOfOtherHouseholdMembers"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Other Household Members</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="2"
                        disabled={disabled}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-2">
              <FormField
                name="ghanaCardID"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Ghana Card ID</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="GHA-XXXXXXXXX-X"
                        disabled={disabled}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="picture"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Upload Photo</FormLabel>
                    <FormControl>
                      <input
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        ref={fileRef}
                        disabled={disabled}
                        onChange={(e) => setImage(e.target?.files?.[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-2">
              <FormField
                name="role"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Member"
                        disabled={disabled}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="cell"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Cell</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Love"
                        disabled={disabled}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-2">
              <FormField
                name="bibleStudyGroup"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Bible Study Group</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Grace"
                        disabled={disabled}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-2 flex-col">
              <FormField
                name="contactPerson"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Contact Person</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Jordan Paul is my uncle and you can reach out him om 02444444444444"
                        disabled={disabled}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="Remarks"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Remarks</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="No remarks"
                        disabled={disabled}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {!disabled && <Button type="submit">Update</Button>}
          </form>
        </FormProvider>
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

export default WithAuth(MemberPageWrapper);
