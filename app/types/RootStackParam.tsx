// types.ts
import { Session } from '@supabase/supabase-js';

export type RootStackParamList = {
  account: { session: Session };
  home: undefined;
};
