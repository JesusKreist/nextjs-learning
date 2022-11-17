import { hash, genSalt, compare } from "bcryptjs";

export const hashPassword = async (password) => {
  const salt = await genSalt();
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
};

export const verifyPassword = async (password, hashedPassword) => {
  const isValid = await compare(password, hashedPassword);
  return isValid;
};
