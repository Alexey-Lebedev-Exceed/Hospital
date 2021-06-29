import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Logo from '../Logo.png';
import DisplayingRecords from './DisplayingRecords';
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import moment from 'moment';

const App = () => {
    let history = useHistory();
    const [medicalMan, setMedicalMan] = useState('');
    const [allEntrys, setEntryes] = useState([]);
    const [valueInputName, setName] = useState('');
    const [valueInputDate, setDate] = useState('2021-01-01T00:00');
    const [valueInputComplaints, setComplaints] = useState('');

    const handleChange = (event) => {
      setMedicalMan(event.target.value);
    };

    const token = sessionStorage.getItem('token');

    useEffect(() => {
      const fetchData = () => {
        axios.get('http://localhost:7000/entry', {
          headers: { authorization: token },
        }).then(res => {
          setEntryes(res.data)
        }).catch(err => {
          console.log(err.response)
        });
      }
      fetchData();
    },[token]);
    console.log(allEntrys);


    const logOut = () => {
      sessionStorage.clear()
      history.push('/login')
    }

    const addNewEntrys = async () => {
      if(!valueInputName || !medicalMan || !valueInputDate || !valueInputComplaints){
        alert("Недопустимое значение одного из поля");
      } else {
        await axios.post('http://localhost:7000/entry', {
          name: valueInputName,
          doctor: medicalMan,
          date: valueInputDate,
          complaints: valueInputComplaints
        }, {
          headers: { authorization: token },
        }).then(res => {
          setName('');
          setMedicalMan('');
          setDate('2021-01-01T00:00');
          setComplaints('');
          setEntryes([ ...allEntrys, res.data]);
        });
      }
    }
  return (
    <div>
      <div>
        <img src={Logo} alt='imageLogo'/>
        <p>Приемы</p>
        <Button variant="outlined" onClick={() => logOut()}>Выход</Button>
      </div>
      <div>
        <FormControl >
          <TextField id="outlined-basic" label="Ф.И.О.:" variant="outlined" value={valueInputName} onChange = {(e) => setName(e.target.value)}/>
          <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            Врач:
          </InputLabel>
          <Select
            labelId="demo-simple-select-placeholder-label-label"
            id="demo-simple-select-placeholder-label"
            value={medicalMan}
            onChange={handleChange}
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
            value={valueInputDate}
            onChange = {(e) => setDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="outlined-required"
            label="Жалобы:"
            variant="outlined"
            value={valueInputComplaints}
            onChange = {(e) => setComplaints(e.target.value)}
          />
          <Button variant="outlined" onClick= {() => addNewEntrys()}>Добавить</Button>
        </FormControl>
      </div>
      <div>
          <DisplayingRecords allEntrys={allEntrys}/>
      </div>
    </div>
  );
}

export default App;