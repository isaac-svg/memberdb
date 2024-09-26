import { hashPassword, verifyPassword } from "@/lib/auth";
import Dexie, { type EntityTable, Table } from "dexie";

// User interface
export interface User {
  id?: number;
  username: string;
  password: string;
}

// Member interface
export interface Member {
  id: number;
  name: string;
  bibleStudyGroup: "love" | "grace" | "peace" | "hope" | "mercy" | "joy";
  role: "elder" | "member" | "deacon";
  dob: string;
  gender: "Male" | "Female" | "M" | "F" | "m" | "f" | "male" | "female";
  cell: string;
  residentialAddress: string;
  mobile: string;
  maritalStatus: string;
  spouseName: string;
  numberOfChildren: string;
  numberOfOtherHouseholdMembers: string;
  occupation: string;
  contactPerson: string;
  Remarks: string;
  ghanaCardID: string;
  picture?: string;
}

export interface Child {
  id: number;
  name: string;
  dob: string;
  age: string;
  gender: "Male" | "Female" | "M" | "F" | "m" | "f" | "male" | "female";
  nameOfMother: string;
  nameOfFather: string;
  residentialAddress: string;
  mobileNumberOfGuidians: string;
  contactPerson: string;
  Remarks: string;
  ghanaCardID: string;
  picture?: string;
  bibleStudyGroup: "love" | "grace" | "peace" | "hope" | "mercy" | "joy" | "";
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
  appState: Table<AppState, string>; // Typing for tracking signup state
};

// Schema declaration
db.version(1.25).stores({
  child:
    "++id, name, dob, age, gender, nameOfMother, nameOfFather, residentialAddress, mobileNumberOfGuidians, contactPerson, Remarks, ghanaCardID, picture, bibleStudyGroup",
  chmembers:
    "++id, name, mobile, ghanaCardID, occupation, numberOfOtherHouseholdMembers, gender, bibleStudyGroup, residentialAddress, cell, Remarks, maritalStatus, contactPerson, spouseName, picture, numberOfChildren, dob, role", // primary key "id"
  users: "++id, username, password", // primary key "id"
  appState: "key", // single key-value store to track signup state
});

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
