import { Button, Grid, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser } from './redux/user.slice';

export function NxWelcome({ title }: { title: string }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');

  const dispatch = useDispatch();

  const handleClick = () => {
    const details = {
      name: name,
      age: age,
      address: address,
    };
    // alert(`${name}, ${age}, ${address}`);
    dispatch(fetchUser({ details }));
  };

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
      </Grid>
    </Box>
  );
}

export default NxWelcome;
