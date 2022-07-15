import { configureStore } from '@reduxjs/toolkit';
import { USER_FEATURE_KEY, userReducer, UserState } from './user.slice';
// import {
//   sessionsEvaluationReducer,
//   SessionsEvaluationState,
//   SESSIONSEVALUATION_FEATURE_KEY,
// } from './sessions-evaluation.slice';
// import titleReducer from './title-slice';

export interface State {
  [USER_FEATURE_KEY]: UserState;
}

const store = configureStore({
  reducer: {
    // [SESSIONSEVALUATION_FEATURE_KEY]: sessionsEvaluationReducer,
    [USER_FEATURE_KEY]: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
  enhancers: [],
});
// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;

export default store;
