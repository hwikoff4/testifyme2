-- Allow anonymous users to insert reviews (for public submission form)
-- They will be pending approval by default
create policy "reviews_insert_public"
  on public.reviews for insert
  with check (is_approved = false);
