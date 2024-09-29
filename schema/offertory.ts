"use client";

import { z } from "zod";

const offertorySchema = z.object({
  serviceType: z.string({ required_error: "Tither name name is required" }),
  amount: z.coerce.number({
    required_error: "Please provide the amount given",
  }),
  date: z.union([
    z.string(),
    z.number(),
    z.array(z.string()).readonly(),
    z.undefined(),
  ]),
});

export default offertorySchema;
