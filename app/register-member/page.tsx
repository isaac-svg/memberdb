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
import { db } from "@/models/db";
import { useLiveQuery } from "dexie-react-hooks";
import { convertImageToBase64 } from "@/lib/functions";
import WithAuth from "@/components/auth/withAuth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdultForm from "./adult-form";
import ChildrenForm from "./children-form";

type Props = {};

const RegisterMember = (props: Props) => {
  return (
    <section className="p-6 mb-14">
      <div className="py-6">
        <h1 className=" text-3xl text-muted-foreground font-semibold text-center">
          Register New Member
        </h1>
        <p className="text-xs text-center text-accent-foreground">
          Please fill out the form below to register a new member.
        </p>
      </div>
      <Tabs className="w-full" defaultValue="adult">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="adult">Adult</TabsTrigger>
          <TabsTrigger value="children">Children</TabsTrigger>
        </TabsList>
        <TabsContent value="adult">
          <AdultForm />
        </TabsContent>
        <TabsContent value="children">
          <ChildrenForm />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default RegisterMember;
