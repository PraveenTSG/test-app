import { Params } from 'react-router-dom';
import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';

export const USER_FEATURE_KEY = 'user';

export interface UserState {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string;
  userDetails: any;
  allUsers: any;
  getUser: any;
}

//Add user
export const fetchUser = createAsyncThunk(
  'user/fetchStatus',
  async ({ details }: any) => {
    return axios.post(process.env['NX_URL'] + 'user/user-add', details, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }
);

//Get all user details
export const getAllUsers = createAsyncThunk(
  'user/getAllUsersStatus',
  async () => {
    return await axios.get(process.env['NX_URL'] + 'user/getUsers', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }
);

//Get user details by Id
export const getUserById = createAsyncThunk(
  'user/getUserStatus',
  async (id: any) => {
    return await axios.get(process.env['NX_URL'] + 'user/getUser/' + id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      // params: {
      //   id,
      // },
    });
  }
);

//Update user details by Id
export const updateUserById = createAsyncThunk(
  'user/fetchStatus',
  async ({ userId, details }: { userId: string; details: any }) => {
    // console.log('Details', details);
    console.log('Id', userId);
    return axios.patch(
      process.env['NX_URL'] + 'user/updateUser/' + userId,
      details,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        // Params: {
        //   id: userId,
        // },
      }
    );
  }
);

//Delete user details by Id
export const deleteUserById = createAsyncThunk(
  'user/getUserStatus',
  async (id: any) => {
    console.log('Deleted ID', id);
    return await axios.delete(process.env['NX_URL'] + 'user/deleteUser/' + id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      // params: {
      //   id,
      // },
    });
  }
);

export const initialUserState: UserState = {
  loadingStatus: 'not loaded',
  error: 'null',
  userDetails: [],
  allUsers: [],
  getUser: {},
};

export const userSlice = createSlice({
  name: USER_FEATURE_KEY,
  initialState: initialUserState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      ////////////////Add User////////////////////
      .addCase(fetchUser.pending, (state: UserState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state: UserState, action) => {
        state.loadingStatus = 'loaded';
        state.userDetails = (action.payload as any).data;
      })
      .addCase(fetchUser.rejected, (state: UserState) => {
        state.loadingStatus = 'error';
      })
      ////////////////Get All Users////////////////////
      .addCase(getAllUsers.pending, (state: UserState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(getAllUsers.fulfilled, (state: UserState, action) => {
        state.loadingStatus = 'loaded';
        state.allUsers = (action.payload as any).data.users;
      })
      .addCase(getAllUsers.rejected, (state: UserState) => {
        state.loadingStatus = 'error';
      })
      ////////////////Get User by Id////////////////////
      .addCase(getUserById.pending, (state: UserState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(getUserById.fulfilled, (state: UserState, action) => {
        state.loadingStatus = 'loaded';
        state.getUser = (action.payload as any).data.user;
      })
      .addCase(getUserById.rejected, (state: UserState) => {
        state.loadingStatus = 'error';
      });
    //     //////////////Update User by Id////////////////////
    //     .addCase(updateUserById.pending, (state: UserState) => {
    //       state.loadingStatus = 'loading';
    //     })
    //     .addCase(updateUserById.rejected, (state: UserState) => {
    //       state.loadingStatus = 'error';
    //     })
    //     //////////////Delete User by Id////////////////////
    //     .addCase(deleteUserById.pending, (state: UserState) => {
    //       state.loadingStatus = 'loading';
    //     })
    //     .addCase(deleteUserById.rejected, (state: UserState) => {
    //       state.loadingStatus = 'error';
    //     });
  },
});

export const userReducer = userSlice.reducer;

export const userActions = userSlice.actions;

export const getUserState = (rootState: any): UserState =>
  rootState[USER_FEATURE_KEY];

export const selectAllUser = createSelector(
  getUserState,
  (state: UserState) => state.allUsers
);

export const getUserDetails = createSelector(
  getUserState,
  (state: UserState) => state.getUser
);
