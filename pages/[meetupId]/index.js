import React from 'react';
import Head from 'next/head';

import { MongoClient, ObjectId } from 'mongodb';

import MeetUpDetail from '../../components/meetups/MeetUpDetail';

const MeetUpId = ({ meetUp }) => {
  return (
    <>
      <Head>
        <title>{meetUp.title} | React Meetup</title>
        <meta name="description" content={meetUp.description} />
      </Head>
      <MeetUpDetail
        title={meetUp.title}
        description={meetUp.description}
        image={meetUp.image}
        address={meetUp.address}
      />
    </>
  );
};

export async function getStaticPaths() {
  const client = new MongoClient(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wazyz.gcp.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  await client.connect();
  const db = client.db(process.env.DB_NAME);
  const collection = db.collection(process.env.DB_COLLECTION);
  const meetups = await collection.find({}).toArray();
  const data = meetups.map((meetup) => ({
    params: { meetupId: meetup._id.toString() },
  }));
  return {
    fallback: false,
    paths: data,
  };
}

export async function getStaticProps({ params }) {
  const client = new MongoClient(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wazyz.gcp.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  await client.connect();
  const db = client.db(process.env.DB_NAME);
  const collection = db.collection(process.env.DB_COLLECTION);
  const myId = new ObjectId(params.meetupId);
  const response = await collection.findOne({
    _id: myId,
  });
  return {
    props: {
      meetUp: {
        id: response._id.toString(),
        title: response.title,
        image: response.image,
        address: response.address,
        description: response.description,
      },
    },
  };
}

export default MeetUpId;
