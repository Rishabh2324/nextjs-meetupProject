import React from 'react';
import Head from 'next/head';
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';

const HomePage = ({ meetUps }) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active react meetups!"
        />
      </Head>
      <MeetupList meetups={meetUps} />
    </>
  );
};

export const getStaticProps = async () => {
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
  const data = await collection.find({}).toArray();
  const meetUps = data?.map((meetup) => ({
    id: meetup._id.toString(),
    title: meetup.title,
    address: meetup.address,
    image: meetup.image,
    description: meetup.description,
  }));
  return {
    props: {
      meetUps: meetUps,
    },
  };
};

export default HomePage;
