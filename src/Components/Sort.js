
import React, { useState } from 'react';
import { makeStyles, withStyles, InputLabel, FormControl, NativeSelect, InputBase } from '@material-ui/core';


const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const Sort = ({ allEntrys, sortBy, setDirectionEntries }) => {
  const classes = useStyles();
  const [sort, setSort] = useState('');
  const [direction, setDirection] = useState('');

  const handleChange = (event) => {
    setSort(event.target.value);
    sortBy(event.target.value, direction);
  };

  const handleChangeDirection = (event) => {
    setDirectionEntries(event.target.value);
    setDirection(event.target.value)
    sortBy(sort, event.target.value);
  };

  const flagDirection = () => {
    if(sort !== '_id' && sort){
      return(
        <FormControl className={classes.margin}>
        <InputLabel htmlFor="demo-customized-select-native">Направление:</InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          value={direction}
          onChange={handleChangeDirection}
          input={<BootstrapInput/>}
        >
          <option aria-label="None" value="descending" />
          <option value='ascending'>По возростанию </option>
          <option value='descending'>По убыванию</option>
        </NativeSelect>
      </FormControl>
      )
    } 
  }
  return (
    <div>
      <div>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="demo-customized-select-native">Сортировать по:</InputLabel>
          <NativeSelect
            id="demo-customized-select-native"
            value={sort}
            onChange={handleChange}
            input={<BootstrapInput />}
          >
            <option aria-label="None" value="_id" />
            <option
            value='name'
            >Имени</option>
            <option
            value='doctor'
            >Врачу</option>
            <option
            value='date'
            >Дате</option>
          </NativeSelect>
        </FormControl>
      </div>
      <div>{flagDirection()}</div>
    </div>  
  );
}

export default Sort;