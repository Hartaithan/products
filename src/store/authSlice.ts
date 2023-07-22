import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IAuthState, IProfile } from '../models/AuthModel';
import { supabase } from '../helpers/supabase';
import {
  Session,
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from '@supabase/supabase-js';
import { createTypedAsyncThunk } from '../hooks/useStore';

const initialState: IAuthState = {
  isAuth: false,
  isLoading: false,
  user: null,
  session: null,
  profile: null,
};

const signUp = createTypedAsyncThunk(
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

const signIn = createTypedAsyncThunk(
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

const signOut = createTypedAsyncThunk(
  'auth/signOut',
  async (_, { rejectWithValue }) => {
    const { error } = await supabase.auth.signOut();
    if (error) return rejectWithValue(error.message);
  },
);

const getProfile = createTypedAsyncThunk(
  'auth/getProfile',
  async (_, { rejectWithValue }) => {
    const [session, user] = await Promise.all([
      supabase.auth.getSession(),
      supabase.auth.getUser(),
    ]);
    if (session.error) return rejectWithValue(session.error.message);
    if (user.error) return rejectWithValue(user.error.message);
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select<'*', IProfile | null>('*')
      .eq('id', user.data.user.id)
      .single();
    if (profileError) return rejectWithValue(profileError.message);
    return { ...session.data, ...user.data, profile: profileData };
  },
);

const updateProfile = createTypedAsyncThunk(
  'auth/updateProfile',
  async (payload: Partial<IProfile>, { getState, rejectWithValue }) => {
    const { auth } = getState();
    if (!auth.user) return rejectWithValue('User not found!');
    const { data, error } = await supabase
      .from('profiles')
      .update(payload)
      .eq('id', auth.user.id)
      .select<'*', IProfile | null>('*')
      .single();
    if (error) return rejectWithValue(error.message);
    return { profile: data };
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateSession: (state, action: PayloadAction<Session | null>) => {
      state.session = action.payload;
    },
  },
  extraReducers: builder => {
    // SIGN UP
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
    // SIGN IN
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
    // SIGN OUT
    builder.addCase(signOut.pending, state => state);
    builder.addCase(signOut.fulfilled, () => initialState);
    builder.addCase(signOut.rejected, state => state);
    // GET PROFILE
    builder.addCase(getProfile.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuth = true;
      state.user = action.payload.user;
      state.session = action.payload.session;
      state.profile = action.payload.profile;
    });
    builder.addCase(getProfile.rejected, () => initialState);
    // UPDATE PROFILE
    builder.addCase(updateProfile.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.profile = action.payload.profile;
    });
    builder.addCase(updateProfile.rejected, state => state);
  },
});

export const { updateSession } = authSlice.actions;
export { signIn, signUp, signOut, getProfile, updateProfile };

export default authSlice.reducer;
