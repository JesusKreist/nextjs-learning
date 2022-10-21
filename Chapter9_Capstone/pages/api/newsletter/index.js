import { isConnectedToMongo } from "../../../utils/connectMongo";
import Subscriber from "../../../database/models/subscriber";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
const handler = async (req, res) => {
  const isMongoConnected = await isConnectedToMongo();
  if (!isMongoConnected) {
    res.status(500).json({ message: "Error connecting to database" });
    return;
  }

  if (req.method === "POST") {
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes("@")) {
      return res.status(422).json({ message: "Invalid email address." });
    }

    const subscriber = new Subscriber({
      emailAddress: userEmail,
      createdAt: new Date(),
    });

    try {
      await subscriber.save();
      res.status(201).json(subscriber);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  res.json({ message: "Hello from the API" });
};

export default handler;
