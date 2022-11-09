import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    if (
      !name ||
      name.trim() === "" ||
      !email ||
      email.trim() === "" ||
      !message ||
      !email.includes("@") ||
      !email.includes(".")
    ) {
      return res.status(422).json({ message: "Invalid input." });
    }

    const newMessage = {
      email,
      name,
      message,
    };

    let client;

    try {
      client = await MongoClient.connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Could not connect to database." });
    }

    const db = client.db();

    try {
      const result = await db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (error) {
      client.close();
      return res.status(500).json({ message: "Storing message failed." });
    }

    client.close();

    console.log(newMessage);

    res.status(201).json({ message: newMessage });
    return;
  }
};

export default handler;
