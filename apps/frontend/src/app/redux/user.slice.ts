import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';

export const USER_FEATURE_KEY = 'user';

/*
 * Update these interfaces according to your requirements.
 */

export interface UserState {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string;
  userDetails: any;
}

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(fetchUser())
 * }, [dispatch]);
 * ```
 */
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

export const initialUserState: UserState = {
  loadingStatus: 'not loaded',
  error: 'null',
  userDetails: [],
};

export const userSlice = createSlice({
  name: USER_FEATURE_KEY,
  initialState: initialUserState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state: UserState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state: UserState, action) => {
        state.loadingStatus = 'loaded';
        state.userDetails = (action.payload as any).data;
      })
      .addCase(fetchUser.rejected, (state: UserState, action) => {
        state.loadingStatus = 'error';
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const userReducer = userSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(userActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const userActions = userSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllUser);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */

export const getUserState = (rootState: any): UserState =>
  rootState[USER_FEATURE_KEY];

export const selectAllUser = createSelector(
  getUserState,
  (state: UserState) => state.userDetails
);
