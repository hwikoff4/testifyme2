-- Create a helper function to check if tables exist
-- This avoids 404 errors when checking for table existence

CREATE OR REPLACE FUNCTION check_tables_exist(table_names text[])
RETURNS TABLE(name text, exists boolean)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    unnest(table_names) as name,
    EXISTS (
      SELECT 1 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = unnest(table_names)
    ) as exists;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION check_tables_exist(text[]) TO authenticated;
GRANT EXECUTE ON FUNCTION check_tables_exist(text[]) TO anon;
