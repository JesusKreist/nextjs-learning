import { hashPassword } from "../../../lib/auth";
import { connectToDB } from "../../../lib/db";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    const { email, password } = data;

    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      return res.status(422).json({
        message: "Invalid input - email invalid or password too short!",
      });
    }

    const client = await connectToDB();
    const db = client.db();

    const hashedPassword = await hashPassword(password);

    const result = db.collection("users").insertOne({
      email: email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "Created user!" });
  }

  return;
};

export default handler;
