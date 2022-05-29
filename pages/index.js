import React from 'react';
import Head from 'next/head';
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
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/meetup`,
    {
      method: 'GET',
    }
  );
  const data = await response.json();
  let meetUps = [];
  if (data.status === 200) {
    meetUps = data?.body?.map((meetup) => ({
      id: meetup._id.toString(),
      title: meetup.title,
      address: meetup.address,
      image: meetup.image,
      description: meetup.description,
    }));
  }
  return {
    props: {
      meetUps: meetUps,
    },
  };
};

export default HomePage;
