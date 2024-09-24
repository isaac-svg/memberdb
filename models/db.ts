import Dexie, { type EntityTable } from "dexie";

interface Member {
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

const db = new Dexie("ChurchDataBase") as Dexie & {
  chmembers: EntityTable<
    Member,
    "id" // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1.1).stores({
  chmembers:
    "++id, name, mobile, ghanaCardID, occupation, numberOfOtherHouseholdMembers, gender, bibleStudyGroup, residentialAddress, cell, Remarks, maritalStatus, contactPerson,spouseName, picture, numberOfChildren, dob, role  ", // primary key "id" (for the runtime!)
});

export type { Member };
export { db };
