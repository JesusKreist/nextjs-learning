import Comment from "../../../database/models/comment";
import { isConnectedToMongo } from "../../../utils/connectMongo";

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
    const commentText = req.body.text;
    if (!commentText) {
      return res.status(422).json({ message: "Invalid text" });
    }

    const eventId = req.query.eventId;
    if (!eventId) {
      return res.status(422).json({ message: "Invalid event id" });
    }

    const commenterName = req.body.name;
    if (!commenterName) {
      return res.status(422).json({ message: "Invalid name" });
    }

    const commenterEmail = req.body.email;
    if (!commenterEmail) {
      return res.status(422).json({ message: "Invalid email address" });
    }

    const newComment = new Comment({
      text: commentText,
      eventId: eventId,
      createdAt: new Date(),
      email: commenterEmail,
      name: commenterName,
    });

    try {
      await newComment.save();
      res.status(201).json(newComment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  if (req.method === "GET") {
    const eventId = req.query.eventId;
    if (!eventId) {
      return res.status(422).json({ message: "Invalid event id" });
    }

    try {
      const comments = await Comment.find({ eventId: eventId });
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export default handler;
