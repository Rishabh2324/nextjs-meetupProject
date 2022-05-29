import React from 'react';
import classes from './MeetUpDetail.module.css';

const MeetUpDetail = ({ title, description, image, address }) => {
  return (
    <section className={classes.detail}>
      <img src={image}></img>
      <h1>{title}</h1>
      <h5>{address}</h5>
      <p>{description}</p>
    </section>
  );
};

export default MeetUpDetail;
