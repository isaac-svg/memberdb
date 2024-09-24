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

type Props = {};

const page = (props: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // id: "10",
      // bibleStudyGroup: "grace",
      // role: "member",
      name: "Efua Addo",
      dob: "1975-09-14",
      gender: "Female",
      cell: "Joy",
      residentialAddress: "GA-183-456",
      mobile: "0234455667",
      maritalStatus: "Married",
      spouseName: "Kwame Addo",
      numberOfChildren: "5",
      numberOfOtherHouseholdMembers: "2",
      occupation: "Chef",
      contactPerson: "Ama Addo",
      Remarks: "Cooks for the church",
      ghanaCardID: "GHA-778899001-1",
      // picture: "https://example.com/photo10.jpg",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values");
    console.log(values);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
  }

  const { toast } = useToast();

  return (
    <section className="p-6">
      <div className="py-6">
        <h1 className=" text-3xl text-muted-foreground font-semibold text-center">
          Register New Member
        </h1>
        <p className="text-xs text-center text-accent-foreground">
          Please fill out the form below to register a new member.
        </p>
      </div>
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
                      <Input
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        // placeholder="GHA-XXXXXXXXX-X"
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
                        className="flex flex-col space-y-1"
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
                            <RadioGroupItem value="grace" />
                          </FormControl>
                          <FormLabel className="font-normal">Grace</FormLabel>
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
    </section>
  );
};

export default page;
