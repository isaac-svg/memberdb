"use client";

import { z } from "zod";

const titheSchema = z.object({
  titherName: z.string({ required_error: "Tither name name is required" }),
  amount: z.coerce.number({
    required_error: "Please provide the amount given",
  }),
  date: z.union([
    z.string(),
    z.number(),
    z.array(z.string()).readonly(),
    z.undefined(),
  ]),
  titherMobileNumber: z
    .string()
    .regex(
      /^0[235][0-9]{8}$/,
      "Mobile number must be a valid Ghanaian phone number (e.g. 059XXXXXXX)"
    )
    .optional(),
});

export default titheSchema;
