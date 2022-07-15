import { Button, Grid, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchUser,
  getUserById,
  getUserDetails,
  updateUserById,
} from './redux/user.slice';
import { useParams, useNavigate } from 'react-router-dom';
import { defaultIfEmpty } from 'rxjs';

function User() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');

  const user = useSelector(getUserDetails);

  useEffect(() => {
    dispatch(getUserById(id));
  }, []);

  console.log('User Details', user);
  const handleClick = () => {
    const details = {
      name: name,
      age: age,
      address: address,
    };
    // alert(`${name}, ${age}, ${address}`);
    dispatch(updateUserById({ userId: `${id}`, details: details }));
    // setName('');
    // setAge('');
    // setAddress('');

    navigate('/table');
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
          <input
            style={{
              fontSize: 16,
              background: 'white',
              fontWeight: 500,
              borderRadius: 7,
              height: '30px',
              width: '300px',
            }}
            id="outlined-basic"
            //label="Age"
            // variant="outlined"
            defaultValue={user.name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
        </Grid>
        <Grid item>
          <input
            style={{
              fontSize: 16,
              background: 'white',
              fontWeight: 500,
              borderRadius: 7,
              height: '30px',
              width: '300px',
            }}
            id="outlined-basic"
            //label="Age"
            // variant="outlined"
            defaultValue={user.age}
            onChange={(e) => {
              setAge(e.target.value);
            }}
          ></input>
        </Grid>
        <Grid item>
          <input
            style={{
              fontSize: 16,
              background: 'white',
              fontWeight: 500,
              borderRadius: 7,
              height: '30px',
              width: '300px',
            }}
            id="outlined-basic"
            //label="Age"
            // variant="outlined"
            defaultValue={user.address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          ></input>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={handleClick}>
            Update
          </Button>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            onClick={() => {
              navigate('/');
            }}
          >
            Add User
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default User;
