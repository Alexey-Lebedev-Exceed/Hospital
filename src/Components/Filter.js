import React, { useState } from "react";
import { FormControl, TextField, Button} from '@material-ui/core';
import ButtonFilter from '../ButtonFilter.png';
import DeleteFilter from '../DeleteFilter.png';
import _ from 'underscore';
import axios from 'axios';


const Filter = ({ setEntryes, allEntrys, token }) => {
  const [open, setOpen] = useState(false);
  const [dateStart, setDateStart] = useState('2021-01-01T00:00');
  const [dateEnd, setDateEnd] = useState('2021-07-03T00:00');

  const filterNow = () => {
    const copyAllEntrys = allEntrys.concat();
    let filterAllEntrys = _.filter(copyAllEntrys, (item) => {return dateStart < item.date && item.date < dateEnd});
    setEntryes(filterAllEntrys);
  }

  const filterCancel = () => {
    setOpen(!open);
    axios.get('http://localhost:7000/entry', {
      headers: { authorization: token },
    }).then(res => {
      setEntryes(res.data)
    }).catch(err => {
      console.log(err.response)
    });
  }

  return(
    <div>
        <div>
          <p>Добавить фильтр по дате:</p>
          <img
          src={ButtonFilter}
          alt='fiter'
          onClick={() => setOpen(!open)}/>
        </div>
        <div>
          {
            open && (
              <FormControl >
              <TextField
                id="datetime-local"
                type="datetime-local"
                value={dateStart}
                label="С:"
                onChange={(e) => setDateStart(e.target.value)}
              />
              <TextField
                id="datetime-local"
                type="datetime-local"
                value={dateEnd}
                label="По:"
                onChange={(e) => setDateEnd(e.target.value)}
              />
              <Button
              variant="outlined"
              onClick={() => filterNow()}
              >Фильтровать</Button>
              <img
              src={DeleteFilter}
              alt='DeleteFilter'
              onClick={() => filterCancel()}/>
            </FormControl>
            )
          }
        </div>
    </div>
  )
}

export default Filter;