import router from 'next/router';
import React from 'react';
import Head from 'next/head';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import { toast, ToastContainer } from 'react-nextjs-toast';

const NewMeetUp = () => {
  const onMeetUpHandler = async (requestBody) => {
    const response = await fetch('/api/meetup', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (data.status === 200) {
      toast.notify(data.message, {
        duration: 3,
        type: 'success',
        title: 'Notification',
      });
      setTimeout(() => {
        router.push('/');
        toast.remove();
      }, 3000);
    } else {
      toast.notify(data.message, {
        type: 'error',
        title: 'Notification',
      });
    }
  };

  return (
    <>
      <Head>
        <title>Add React Meetups</title>
        <meta
          name="description"
          content="Add your meetups and create amazing networking apportunities!"
        />
      </Head>
      <NewMeetupForm onAddMeetup={onMeetUpHandler} />
      <ToastContainer align={'right'} />
    </>
  );
};

export default NewMeetUp;
