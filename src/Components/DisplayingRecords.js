import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@material-ui/core';
import EditImg from '../edit.png';
import DeleteImg from '../delete.png';
import Edit from './Edit';
import Remove from './Remove';

const DisplayingRecords = ({allEntrys, setEntryes}) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [tempItem, setTempItem] = useState('');

  const clickDelete = (item) => {
    setTempItem(item);
    setOpenDelete(true);
  }

  const clickEdit = (item) => {
    setTempItem(item);
    setOpenEdit(true);
  }

  const handleClose = () => {
    setOpenEdit(false);
    setOpenDelete(false);
  };
  
  return (
    <div>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Имя</TableCell>
              <TableCell align="right">Врач</TableCell>
              <TableCell align="right">Дата</TableCell>
              <TableCell align="right">Жалобы</TableCell>
              <TableCell align="right"> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allEntrys.map((item, index) => 
              <TableRow key={`entry-${index}`}>
                <TableCell>{item.name}</TableCell>
                <TableCell align="right">{item.doctor}</TableCell>
                <TableCell align="right">{item.date}</TableCell>
                <TableCell align="right">{item.complaints}</TableCell>
                <TableCell align="right">
                  <img
                  src={EditImg}
                  alt={EditImg}
                  onClick={() => clickEdit(item)}
                  ></img>
                  <img
                  src={DeleteImg}
                  alt={DeleteImg}
                  onClick={() => clickDelete(item)}
                  ></img>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {openEdit && <Edit flag={openEdit} item={tempItem} setTempItem={setTempItem} onCloseModal={handleClose} setEntryes={setEntryes}/>}
      {openDelete && <Remove flag={openDelete} item={tempItem} onCloseModal={handleClose} setEntryes={setEntryes}/>}
    </div>
  )
}

export default DisplayingRecords;