import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IAuthState, IProfile, TProfilePayload } from '../models/AuthModel';
import { supabase } from '../helpers/supabase';
import {
  Session,
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from '@supabase/supabase-js';
import { createTypedAsyncThunk } from '../hooks/useStore';
import { uploadAvatar } from '../helpers/upload';

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
  async (payload: TProfilePayload, { getState, rejectWithValue }) => {
    const { auth } = getState();
    let updated = { ...payload };
    if (!auth.user) return rejectWithValue('User not found!');
    if (payload.avatar_url && typeof payload.avatar_url !== 'string') {
      const avatar_url = await uploadAvatar(payload.avatar_url, auth.user.id);
      updated = {
        ...updated,
        avatar_url: avatar_url || updated.avatar_url,
      };
    }
    const { data, error } = await supabase
      .from('profiles')
      .update(updated)
      .eq('id', auth.user.id)
      .select<'*', IProfile | null>('*')
      .single();
    if (error) return rejectWithValue(error.message);
    return { profile: data };
  },
);

const deleteProfile = createTypedAsyncThunk(
  'auth/deleteProfile',
  async (_, { getState, rejectWithValue }) => {
    const { auth } = getState();
    if (!auth.user) return rejectWithValue('User not found!');
    const avatar_url = auth.profile?.avatar_url || null;
    if (avatar_url && typeof avatar_url === 'string') {
      const publicUrl = avatar_url.split('/').pop() || 'image.png';
      const { error: buckerError } = await supabase.storage
        .from('avatars')
        .remove([publicUrl]);
      if (buckerError) return rejectWithValue(buckerError.message);
    }
    const { error: deleteError } = await supabase.rpc('delete_user');
    if (deleteError) return rejectWithValue(deleteError.message);
    const { error: signOurError } = await supabase.auth.signOut();
    if (signOurError) return rejectWithValue(signOurError.message);
    return { user: null, profile: null };
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
    // DELETE PROFILE
    builder.addCase(deleteProfile.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(deleteProfile.fulfilled, () => initialState);
    builder.addCase(deleteProfile.rejected, state => {
      state.isLoading = false;
    });
  },
});

export const { updateSession } = authSlice.actions;
export { signIn, signUp, signOut, getProfile, updateProfile, deleteProfile };

export default authSlice.reducer;
