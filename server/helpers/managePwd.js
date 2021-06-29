import bcrypt from 'bcryptjs';

export const hashedPassword = async (pwd) => await bcrypt.hash(pwd, 10);

export const validPassword = async (reqPassword, userPassword)  => await bcrypt.compare(reqPassword, userPassword)