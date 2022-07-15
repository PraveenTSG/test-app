import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { deleteUserById, getAllUsers, selectAllUser } from './redux/user.slice';
import { useNavigate } from 'react-router-dom';
import { Button, Grid } from '@mui/material';

export default function BasicTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(selectAllUser);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  // const deleteUser = (userID: any) => {
  //   deleteUserById(userID);
  // };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row: any) => (
            <TableRow
              key={row.name}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                cursor: 'pointer',
              }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.age}</TableCell>
              <TableCell align="right">{row.address}</TableCell>
              <TableCell align="right">
                <Grid
                  container
                  spacing={2}
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Grid item>
                    <Button
                      variant="contained"
                      onClick={() => {
                        navigate(`/user/${row.iduser}`);
                      }}
                    >
                      Update
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      onClick={() => {
                        // deleteUser(row.iduser);

                        dispatch(deleteUserById(row.iduser));
                        window.location.reload();
                      }}
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
