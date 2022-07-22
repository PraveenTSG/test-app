import { Button, Grid, TextField } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = () => {
    const details = {
      email: email,
      password: password,
    };
    //alert(`${email}, ${password}`);
    //dispatch(fetchUser({ details }));

    axios
      .post(process.env['NX_URL'] + 'auth/local/signin', details, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((data) => {
        const { access_token, refresh_token } = data.data;
        localStorage.setItem('token', access_token);
        localStorage.setItem('refresh', refresh_token);
      })
      .catch(function (error) {
        console.log(error.toJSON());
      });
  };

  // console.log('Users', users ?? {});
  return (
    <Box sx={{ marginTop: 20 }}>
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
            label="Email"
            type="email"
            variant="outlined"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            id="outlined-basic"
            label="Password"
            type="password"
            variant="outlined"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Grid>
        <Grid item>
          <Grid container spacing={0.5}>
            <Grid item>
              <Button variant="contained" onClick={handleClick}>
                Login
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Login;
