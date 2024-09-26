import bcrypt from "bcryptjs";

// Hash the password
export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Verify the password
export const verifyPassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
