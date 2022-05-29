import React from 'react';
import Head from 'next/head';
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
  const response = await fetch(`${process.env.HOSTNAME}/api/meetup`, {
    method: 'GET',
  });
  const data = await response.json();
  return {
    paths: data?.body?.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const response = await fetch(
    `${process.env.HOSTNAME}/api/${params.meetupId}`,
    {
      method: 'GET',
    }
  );
  const data = await response.json();
  return { props: { meetUp: data?.body } };
}

export default MeetUpId;
