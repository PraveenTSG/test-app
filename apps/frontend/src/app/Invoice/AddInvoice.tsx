import { Button, Grid, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { createInvoice } from '../redux/invoice.slice';

function AddInvoice() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [price, setPrice] = useState('');

  const handleClick = () => {
    const details = {
      price: price,
      userId: 1,
    };
    // alert(`${name}, ${age}, ${address}`);
    dispatch(createInvoice({ details }));
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
            label="Price"
            variant="outlined"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </Grid>

        <Grid item>
          <Grid container spacing={0.5}>
            <Grid item>
              <Button variant="contained" onClick={handleClick}>
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AddInvoice;
