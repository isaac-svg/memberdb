import { hashPassword, verifyPassword } from "@/lib/auth";
import { generateUUID } from "@/lib/functions";
import formSchema from "@/schema/form";
import offertorySchema from "@/schema/offertory";
import titheSchema from "@/schema/tithe";
import Dexie, { type EntityTable, Table } from "dexie";
import { z } from "zod";

// User interface
export interface User {
  id?: number;
  username: string;
  password: string;
}

// Member interface
export interface Member {
  id: string;
  name: string;
  bibleStudyGroup: string;
  role: string;
  dob?: string;
  gender: string;
  cell: string;
  residentialAddress: string;
  mobile: string;
  maritalStatus: string;
  spouseName?: string;
  numberOfChildren: string;
  numberOfOtherHouseholdMembers: string;
  occupation: string;
  contactPerson: string;
  Remarks: string;
  ghanaCardID: string;
  picture?: string;
  titheId: string[];
}

export interface Tithe {
  id: string;
  memberId: string;
  amount: number;
  date?: string | number | readonly string[] | undefined;
}
export interface Offertory {
  id: string;
  date?: string | number | readonly string[] | undefined;
  amount: number;
  serviceType: string;
}
export interface Child {
  id: string;
  name: string;
  dob: string;
  age: string;
  gender: string;
  nameOfMother: string;
  nameOfFather: string;
  residentialAddress: string;
  mobileNumberOfGuidians?: string;
  contactPerson: string;
  Remarks: string;
  ghanaCardID?: string;
  picture?: string;
  bibleStudyGroup: string;
}

// Interface to track signup state
interface AppState {
  key: string;
  isSignedUp: boolean;
}

// Extend Dexie with the app's schema
const db = new Dexie("ChurchDataBase") as Dexie & {
  chmembers: EntityTable<Member, "id">;
  child: EntityTable<Child, "id">;
  users: Table<User, number>; // Typing for the "users" table
  appState: Table<AppState, string>;
  offertory: Table<Offertory, "id">;
  tithe: Table<Tithe, "id">;
};

// Schema declaration
db.version(1.28).stores({
  child:
    "++id, name, dob, age, gender, nameOfMother, nameOfFather, residentialAddress, mobileNumberOfGuidians, contactPerson, Remarks, ghanaCardID, picture, bibleStudyGroup",
  chmembers:
    "&id, name, mobile, ghanaCardID, occupation, numberOfOtherHouseholdMembers, gender, bibleStudyGroup, residentialAddress, cell, Remarks, maritalStatus, contactPerson, spouseName, picture, numberOfChildren, dob, role", // primary key "id"
  users: "++id, username, password",
  appState: "key",
  tithe: "&id, amount, date, memberId",
  offertory: "&id, date, amount, serviceType",
});

export async function addMember(values: z.infer<typeof formSchema>) {
  const nen = await db.chmembers.add({
    ...values,
    id: generateUUID(),
    titheId: [],
  });
}
export async function addTithe(
  values: z.infer<typeof titheSchema>,
  memberId: string
) {
  const titheId = await db.tithe.add({
    id: generateUUID(),
    ...values,
    memberId,
  });
  const member = await db.chmembers.get(memberId);

  if (member) {
    const updatedTitheIds = member.titheId
      ? [...member.titheId, titheId]
      : [titheId];

    await db.chmembers.update(memberId, { titheId: updatedTitheIds });
    console.log("Member updated with new tithe ID:", updatedTitheIds);
  }
}

export async function addOffertory(values: z.infer<typeof offertorySchema>) {
  console.log(values, "add Offertory");
  const a = await db.offertory.add({
    id: generateUUID(),
    ...values,
  });
  console.log(a);
}
// Function to add a new user
export const addUser = async (username: string, password: string) => {
  const user = await getUser(username);
  if (user) throw new Error("Username not valid place change the username");
  const passwordHash = await hashPassword(password); // Hash the password before storing
  await db.users.add({ username, password: passwordHash });
  await db.appState.add({ isSignedUp: true, key: username });
  localStorage.setItem(
    "authState",
    JSON.stringify({ isSignedUp: true, key: username })
  );
};

// Function to get a user by username
export async function getUser(username: string): Promise<User | undefined> {
  return await db.users.get({ username });
}
export async function getMember(username: string): Promise<Member | undefined> {
  return await db.chmembers.get({ name: username });
}

// Function to check if a user has signed up
export const isUserSignedUp = async (): Promise<boolean> => {
  // const state = await db.appState.get("isSignedUp");
  // return state ? state.isSignedUp : false;
  const state = localStorage.getItem("authState");
  if (!state) return false;
  const authState = JSON.parse(state);
  return authState.isSignedUp;
};

// Function to mark the app as signed up
export const setUserSignedUp = async () => {
  await db.appState.put({ key: "isSignedUp", isSignedUp: true });
};

// Function to check if a user has not been registered already
export const isRegistered = async (
  data: Partial<Child | Member>,
  userType: "adult" | "child"
) => {
  let user;

  console.log("i am here in isRegistered", data);
  if (userType === "adult") {
    user = await db.chmembers
      .where("name")
      .equals(data.name!)
      .and(
        (member) =>
          member.dob === data.dob! && member.ghanaCardID === data.ghanaCardID
      )
      .first();
  }

  if (userType === "child") {
    user = await db.child
      .where("name")
      .equals(data.name!)
      .and(
        (child) =>
          child.dob === data.dob! &&
          data.residentialAddress === child.residentialAddress
      )
      .first();
  }
  console.log(user, "user");
  // Return true if user exists, false otherwise
  return !!user;
};
// Function to verify a user login
export const verifyUser = async (
  username: string,
  password: string
): Promise<boolean> => {
  const user = await getUser(username);
  if (!user) return false;

  const isValidPassword = await verifyPassword(password, user.password);
  return isValidPassword;
};

export { db };
