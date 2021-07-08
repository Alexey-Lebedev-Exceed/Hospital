import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button, Backdrop, Fade, InputLabel, MenuItem, FormControl, Select, TextField } from '@material-ui/core';
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

const Edit = ({flag, item, setTempItem, onCloseModal, setEntryes}) => {
  const classes = useStyles();
  const [tempValueInputName, setTempName] = useState(item.name);
  const [tempMedicalMan, setTempMedicalMan] = useState(item.doctor);
  const [tempValueInputDate, setTempDate] = useState(item.date);
  const [tempValueInputComplaints, setTempComplaints] = useState(item.complaints);

  const onSaveEntry = async (e) => {
    if(!tempValueInputName || !tempMedicalMan || !tempValueInputDate || !tempValueInputComplaints) {
      alert("Недопустимое значение магазина");
    } else {
      let {_id} = item;
      await axios.patch('http://localhost:7000/entry/changeEntry', {
        _id,
        name: tempValueInputName,
        doctor: tempMedicalMan,
        date: tempValueInputDate,
        complaints: tempValueInputComplaints
      }).then(res => {
        setEntryes(res.data);
        setTempItem('')
        onCloseModal();
      })
    }
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
          <FormControl>
            <TextField
            id="outlined-basic"
            label="Ф.И.О.:"
            variant="outlined"
            value={tempValueInputName}
            name='name'
            onChange = {(e) => setTempName(e.target.value)}
            />
            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
              Врач:
            </InputLabel>
            <Select
              labelId="demo-simple-select-placeholder-label-label"
              id="demo-simple-select-placeholder-label"
              value={tempMedicalMan}
              name='doctor'
              onChange = {(e) => setTempMedicalMan(e.target.value)}
              displayEmpty
            >
              <MenuItem value="">
                <em>Выберете лечащего врача:</em>
              </MenuItem>
              <MenuItem value='Врачов Врач Врачевич'>Врачов Врач Врачевич</MenuItem>
              <MenuItem value='Докторов Доктор Докторович'>Докторов Доктор Докторович</MenuItem>
              <MenuItem value='Медиков Медик Медикович'>Медиков Медик Медикович</MenuItem>
            </Select>
            <TextField
              id="datetime-local"
              label="Введите дату приема:"
              type="datetime-local"
              value={tempValueInputDate}
              name='date'
              onChange = {(e) => setTempDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="outlined-required"
              label="Жалобы:"
              variant="outlined"
              value={tempValueInputComplaints}
              name='complaints'
              onChange = {(e) => setTempComplaints(e.target.value)}
            />
            <Button onClick={onCloseModal}>Cancel</Button>
            <Button onClick= {() => onSaveEntry()}>Save</Button>
          </FormControl>
        </div>
      </Fade>
      </Modal>
    </div>
  );
}
export default Edit;