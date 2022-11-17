import { getSession } from "next-auth/client";
import { hashPassword, verifyPassword } from "../../../lib/auth";
import { connectToDB } from "../../../lib/db";

const handler = async (req, res) => {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getSession({ req: req });
  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  const userEmail = session.user.email;

  const { oldPassword, newPassword } = req.body;

  const client = await connectToDB();
  const usersCollection = client.db().collection("users");
  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: "User not found!" });
    client.close();
    return;
  }

  const currentPassword = user.password;
  const passwordsMatch = await verifyPassword(oldPassword, currentPassword);
  if (!passwordsMatch) {
    res.status(403).json({ message: "Invalid password!" });
    client.close();
    return;
  }

  const hashedNewPassword = await hashPassword(newPassword);

  usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedNewPassword } }
  );

  client.close();
  console.log("At end");
  return res.status(200).json({ message: "Password updated!" });
};

export default handler;
