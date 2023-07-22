import { Session, User } from '@supabase/supabase-js';
import { ImageOrVideo } from 'react-native-image-crop-picker';

export interface IAuthState {
  isAuth: boolean;
  isLoading: boolean;
  user: User | null;
  session: Session | null;
  profile: IProfile | null;
}

export interface IProfile {
  id: string;
  updated_at: string;
  name: string;
  surname: string;
  avatar_url: string | ImageOrVideo | null;
}

export type TProfilePayload = Omit<IProfile, 'id' | 'updated_at'>;
