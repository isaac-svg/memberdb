"use client";

import { z } from "zod";

const childrenFormSchema = z.object({
  name: z
    .string({ required_error: "Member name is required" })
    .min(5, "Name must be at least 5 characters")
    .max(50, "Name must be at most 50 characters"),

  dob: z
    .string({ required_error: "Date of birth is required" })
    .max(10, "Date of birth must be in a valid format (YYYY-MM-DD)"),
  age: z.string({ required_error: "Age is required" }),

  gender: z.enum(["Male", "Female", "M", "F", "m", "f", "male", "female"], {
    required_error: "Gender is required",
  }),
  nameOfMother: z
    .string({ required_error: " name is required" })
    .min(5, "Name must be at least 5 characters")
    .max(50, "Name must be at most 50 characters"),
  cell: z.string(),
  nameOfFather: z
    .string({ required_error: " name is required" })
    .min(5, "Name must be at least 5 characters")
    .max(50, "Name must be at most 50 characters"),

  residentialAddress: z
    .string({ required_error: "Residential address is required" })
    .regex(
      /^[A-Z]{2}-\d{3,4}-\d{3,4}$/,
      "Residential address must be a valid GhanaPost GPS address (e.g., GA-183-4567)"
    ),
  mobileNumberOfGuidians: z.string({
    required_error: "Mobile number is required",
  }),
  contactPerson: z
    .string({ required_error: "Contact person is required" })
    .min(5, "Contact person must be at least 2 characters")
    .max(100, "Contact person must be at most 50 characters"),

  Remarks: z
    .string({ required_error: "Remarks are required" })
    .max(300, "Remarks must be at most 50 characters"),

  ghanaCardID: z.string(),

  picture: z.any(),
  bibleStudyGroup: z.enum([
    "love",
    "grace",
    "peace",
    "hope",
    "mercy",
    "joy",
    "",
  ]),
});

export default childrenFormSchema;
