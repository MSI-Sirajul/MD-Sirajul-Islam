
-- This file is a reference for the SQL function that needs to be created in Supabase.
-- Create a Postgres function to get a user's profile by ID
CREATE OR REPLACE FUNCTION public.get_profile_by_id(user_id uuid)
RETURNS SETOF public.profiles
LANGUAGE sql
SECURITY definer
AS $$
  SELECT * FROM public.profiles WHERE id = user_id;
$$;
