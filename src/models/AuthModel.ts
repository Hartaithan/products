import { Session, User } from '@supabase/supabase-js';

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
  avatar_url: string;
}
