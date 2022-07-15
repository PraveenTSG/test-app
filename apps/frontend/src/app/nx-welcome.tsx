import { Button, Grid, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, getAllUsers, selectAllUser } from './redux/user.slice';
import { useNavigate } from 'react-router-dom';

function NxWelcome({ title }: { title: string }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');

  const handleClick = () => {
    const details = {
      name: name,
      age: age,
      address: address,
    };
    // alert(`${name}, ${age}, ${address}`);
    dispatch(fetchUser({ details }));
  };
  // console.log('Users', users ?? {});
  return (
    <Box>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            id="outlined-basic"
            label="Age"
            variant="outlined"
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            id="outlined-basic"
            label="Address"
            variant="outlined"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </Grid>
        <Grid item>
          <Grid container spacing={2}>
            <Grid item>
              <Button variant="contained" onClick={handleClick}>
                Save
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={() => {
                  setName('');
                  setAddress('');
                  setAge('');
                }}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => {
              navigate('/table');
            }}
          >
            View Users
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default NxWelcome;
