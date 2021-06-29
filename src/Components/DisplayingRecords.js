import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const DisplayingRecords = ({allEntrys}) => {

  return (
    <div>
        {
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
              {allEntrys.map((item, index) => 
                  <TableBody key={`entry-${index}`}>
                    <TableRow>
                      <TableCell>{item.name}</TableCell>
                      <TableCell align="right">{item.doctor}</TableCell>
                      <TableCell align="right">{item.date}</TableCell>
                      <TableCell align="right">{item.complaints}</TableCell>
                      <TableCell align="right">'123'</TableCell>
                    </TableRow>
                  </TableBody>
              )}
          </Table>
          </TableContainer>
        }
    </div>
  )
}

export default DisplayingRecords;