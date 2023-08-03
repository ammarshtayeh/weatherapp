import React, { useState } from 'react';
import Modal from 'react-modal';
import DisplayHourly from '../DisplayHourly/DisplayHourly';
import classes from './DisplayDaily.module.css';

const customStyles = {
  content: {
    width: '40%',
    height: '50%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    border: '5px solid gray',
    color: 'white',
    backgroundImage: 'linear-gradient(to right, pink, lightblue)'
  }
};

const DisplayDaily = (props) => {
  const [modalOpened, setModalOpened] = useState(false);

  const toggleModal = () => {
    setModalOpened(!modalOpened);
  };

  return (
    <div>
      <div onClick={toggleModal} className={classes.card}>
        <div style={{ paddingLeft: '30%' }}>
          <img src={props.mySrc} alt="Weather Icon" />
        </div>
        <div className={classes.myText}>{props.info}</div>
        <div className={classes.myText}>{props.day}</div>
      </div>

      <Modal
        style={customStyles}
        ariaHideApp={false}
        isOpen={modalOpened}
        onRequestClose={toggleModal}
        contentLabel="Modal with image"
      >
        <DisplayHourly data={props.wdats} />
      </Modal>
    </div>
  );
};

export default DisplayDaily;
