import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button, Backdrop, Fade } from '@material-ui/core';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Remove = ({flag, item, onCloseModal, setEntryes}) => {
  const classes = useStyles();

  const removeEntry = async () => {
    await axios.delete(`http://localhost:7000/entry/delete?_id=${item._id}`,{
    }).then(res => {
      setEntryes(res.data);
      onCloseModal();
    })
  }
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={flag}
        onClose={onCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={flag}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Вы действительно хотите удалить прием?</h2>
            <Button onClick={onCloseModal}>Cancel</Button>
            <Button onClick={removeEntry}>Delete</Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default Remove;