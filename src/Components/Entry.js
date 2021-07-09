import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Logo from '../Logo.png';
import DisplayingRecords from './DisplayingRecords';
import Sort from './Sort';
import Filter from './Filter';
import axios from 'axios';
import { InputLabel, MenuItem, FormControl, Select, TextField, Button} from '@material-ui/core';

const Entry = () => {
    let history = useHistory();
    const [allEntrys, setEntryes] = useState([]);
    const [directionEntrys, setDirectionEntries] = useState('');
    const [valueInputName, setName] = useState('');
    const [medicalMan, setMedicalMan] = useState('');
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

    const SortBy = (field, direction) => {
      const copyAllEntrys = allEntrys.concat();
      let sortAllEntrys;

      if(direction === 'descending'){
        sortAllEntrys = copyAllEntrys.reverse();
      } else {
        sortAllEntrys = copyAllEntrys.sort(
          (a, b) => a[field] > b[field] ? 1 : -1);
      }

      setEntryes(sortAllEntrys);
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
          <TextField
          id="outlined-basic"
          label="Ф.И.О.:"
          variant="outlined"
          value={valueInputName}
          onChange = {(e) => setName(e.target.value)}/>
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
        <Sort allEntrys={allEntrys} sortBy={SortBy} setDirectionEntries={setDirectionEntries}/>
      </div>
      <div>
        <Filter setEntryes={setEntryes} allEntrys={allEntrys} token={token}/>
      </div>
      <div>
          <DisplayingRecords allEntrys={allEntrys} setEntryes={setEntryes}/>
      </div>
    </div>
  );
}

export default Entry;