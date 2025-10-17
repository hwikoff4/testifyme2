-- This script helps set up the first client after a user signs up
-- Run this after creating your first user account

-- Insert a sample client (replace with actual data)
-- INSERT INTO public.clients (name, email, subdomain, brand_color)
-- VALUES ('Your Company', 'you@company.com', 'yourcompany', '#3b82f6')
-- RETURNING id;

-- Then link your user to this client (replace USER_ID and CLIENT_ID)
-- INSERT INTO public.profiles (user_id, client_id, role, display_name)
-- VALUES ('USER_ID', 'CLIENT_ID', 'admin', 'Your Name');

-- Note: In production, this would be automated during the sign-up flow
