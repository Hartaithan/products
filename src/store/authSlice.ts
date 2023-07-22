import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IAuthState, IProfile } from '../models/AuthModel';
import { supabase } from '../helpers/supabase';
import {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from '@supabase/supabase-js';

const initialState: IAuthState = {
  isAuth: false,
  isLoading: false,
  user: null,
  session: null,
  profile: null,
};

const signUp = createAsyncThunk(
  'auth/signUp',
  async (payload: SignUpWithPasswordCredentials, { rejectWithValue }) => {
    const { data, error } = await supabase.auth.signUp(payload);
    if (error) return rejectWithValue(error.message);
    if (!data.user) return rejectWithValue('User not found!');
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select<'*', IProfile | null>('*')
      .eq('id', data?.user.id)
      .single();
    if (profileError) return rejectWithValue(profileError.message);
    return { ...data, profile: profileData };
  },
);

const signIn = createAsyncThunk(
  'auth/signIn',
  async (payload: SignInWithPasswordCredentials, { rejectWithValue }) => {
    const { data, error } = await supabase.auth.signInWithPassword(payload);
    if (error) return rejectWithValue(error.message);
    if (!data.user) return rejectWithValue('User not found!');
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select<'*', IProfile | null>('*')
      .eq('id', data?.user.id)
      .single();
    if (profileError) return rejectWithValue(profileError.message);
    return { ...data, profile: profileData };
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(signUp.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuth = true;
      state.user = action.payload.user;
      state.session = action.payload.session;
      state.profile = action.payload.profile;
    });
    builder.addCase(signUp.rejected, () => initialState);
    builder.addCase(signIn.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuth = true;
      state.user = action.payload.user;
      state.session = action.payload.session;
      state.profile = action.payload.profile;
    });
    builder.addCase(signIn.rejected, () => initialState);
  },
});

export const actions = authSlice.actions;
export { signIn, signUp };

export default authSlice.reducer;
