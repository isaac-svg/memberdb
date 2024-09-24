"use client";

import { z } from "zod";

const formSchema = z.object({
  name: z
    .string({ required_error: "Member name is required" })
    .min(5, "Name must be at least 5 characters")
    .max(50, "Name must be at most 50 characters"),

  dob: z
    .string({ required_error: "Date of birth is required" })
    .max(10, "Date of birth must be in a valid format (YYYY-MM-DD)"),

  gender: z.enum(["Male", "Female", "M", "F", "m", "f", "male", "female"], {
    required_error: "Gender is required",
  }),

  cell: z.string(),

  residentialAddress: z
    .string({ required_error: "Residential address is required" })
    .regex(
      /^[A-Z]{2}-\d{3,4}-\d{3,4}$/,
      "Residential address must be a valid GhanaPost GPS address (e.g., GA-183-4567)"
    ),
  mobile: z
    .string({ required_error: "Mobile number is required" })
    .regex(
      /^0[235][0-9]{8}$/,
      "Mobile number must be a valid Ghanaian phone number (e.g. 059XXXXXXX)"
    ),

  maritalStatus: z
    .string({ required_error: "Marital status is required" })
    .min(2, "Marital status must be at least 2 characters")
    .max(50, "Marital status must be at most 50 characters"),

  spouseName: z.string(),

  numberOfChildren: z
    .string({ required_error: "This field is required" })
    .regex(/^\d+$/, "Number of household members must be a valid number"),

  numberOfOtherHouseholdMembers: z
    .string({ required_error: "Number of other household members is required" })
    .regex(/^\d+$/, "Number of household members must be a valid number"),
  occupation: z
    .string({ required_error: "Occupation is required" })
    .min(2, "Occupation must be at least 2 characters")
    .max(50, "Occupation must be at most 50 characters"),

  contactPerson: z
    .string({ required_error: "Contact person is required" })
    .min(5, "Contact person must be at least 2 characters")
    .max(100, "Contact person must be at most 50 characters"),

  Remarks: z
    .string({ required_error: "Remarks are required" })
    .max(300, "Remarks must be at most 50 characters"),

  ghanaCardID: z
    .string({ required_error: "Ghana Card ID is required" })
    .regex(
      /^GHA-\d{9}-\d$/,
      "Ghana Card ID must follow the format GHA-XXXXXXXXX-X"
    ),

  picture: z.any(),
  role: z.enum(["elder", "member", "deacon"], {
    required_error: "Gender is required",
  }),
  bibleStudyGroup: z.enum(["love", "grace", "peace", "hope", "mercy", "joy"]),
});

export default formSchema;
