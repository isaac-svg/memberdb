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
import { Textarea } from "./ui/textarea";

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

  if (!member) return <div>Loading...</div>;

  return (
    <section className="w-full mr-auto">
      <div className="flex justify-between items-center border-b px-4 py-2">
        <Button variant="outline">Member Details</Button>
        <Button variant="outline" onClick={() => setDisabled(!disabled)}>
          {disabled ? "Edit" : "Cancel"}
        </Button>
      </div>
      <div className="mx-auto mt-6 w-full max-w-xl">
        <div className="flex gap-3 p-2 rounded-sm items-center border">
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
                  <FormItem>
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
                  <FormItem>
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
                  <FormItem>
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
                  <FormItem>
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
                  <FormItem>
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
                  <FormItem>
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
                  <FormItem>
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
                  <FormItem>
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
                  <FormItem>
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
                  <FormItem>
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
                  <FormItem>
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
                  <FormItem>
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
                name="contactPerson"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Person</FormLabel>
                    <FormControl>
                      <Input
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
                name="cell"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
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
                name="role"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
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
                name="bibleStudyGroup"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
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
            <div className="flex gap-2">
              <FormField
                name="Remarks"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
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

export default function MemberPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MemberPage />
    </Suspense>
  );
}
