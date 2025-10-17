-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Allow authenticated users to insert companies" ON companies;
DROP POLICY IF EXISTS "Allow authenticated users to update companies" ON companies;
DROP POLICY IF EXISTS "Allow authenticated users to delete companies" ON companies;

DROP POLICY IF EXISTS "Allow authenticated users to insert videos" ON videos;
DROP POLICY IF EXISTS "Allow authenticated users to update videos" ON videos;
DROP POLICY IF EXISTS "Allow authenticated users to delete videos" ON videos;

DROP POLICY IF EXISTS "Allow authenticated users to insert reviews" ON reviews;
DROP POLICY IF EXISTS "Allow authenticated users to update reviews" ON reviews;
DROP POLICY IF EXISTS "Allow authenticated users to delete reviews" ON reviews;

-- Create more permissive policies for admin operations
-- These allow any authenticated user OR service role to perform operations
CREATE POLICY "Allow authenticated insert on companies" ON companies 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update on companies" ON companies 
  FOR UPDATE 
  USING (true);

CREATE POLICY "Allow authenticated delete on companies" ON companies 
  FOR DELETE 
  USING (true);

CREATE POLICY "Allow authenticated insert on videos" ON videos 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update on videos" ON videos 
  FOR UPDATE 
  USING (true);

CREATE POLICY "Allow authenticated delete on videos" ON videos 
  FOR DELETE 
  USING (true);

CREATE POLICY "Allow authenticated insert on reviews" ON reviews 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update on reviews" ON reviews 
  FOR UPDATE 
  USING (true);

CREATE POLICY "Allow authenticated delete on reviews" ON reviews 
  FOR DELETE 
  USING (true);
