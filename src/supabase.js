import { createClient } from '@supabase/supabase-js';

const {REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_KEY } = process.env;

const supabaseUrl = REACT_APP_SUPABASE_URL;
const supabaseKey = REACT_APP_SUPABASE_KEY;

export const supabaseClient = async (supabaseAccessToken) => {
    const supabase = createClient(
      supabaseUrl,
      supabaseKey,
      {
        global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } }
      }
    );
    // set Supabase JWT on the client object,
    // so it is sent up with all Supabase requests
    return supabase;
};