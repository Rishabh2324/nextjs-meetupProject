import { ObjectId } from 'mongodb';
import nextConnect from 'next-connect';
import middleware from '../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  let doc = await req.db.collection(process.env.DB_COLLECTION);
  try {
    const {
      query: { meetupId },
    } = req;
    const myId = new ObjectId(meetupId);
    const response = await doc.findOne({
      _id: myId,
    });
    if (response.status >= 400) {
      return res.status(400).json({
        error: 'There was an error',
      });
    }
    return res.status(200).json({
      status: 200,
      body: response,
    });
  } catch (error) {
    return res.status(500).json({
      error: 'There was an error',
    });
  }
});

export default handler;
