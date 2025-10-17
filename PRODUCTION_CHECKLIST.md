# Production Deployment Checklist

## Critical Data Protection Measures

### 1. Enable Database Backups (REQUIRED)
- Go to your Supabase project dashboard
- Navigate to Settings → Database
- Enable **Point-in-Time Recovery (PITR)**
- This allows you to restore your database to any point in time
- **Cost:** Included in Pro plan and above

### 2. Run Data Protection Script
Run the `scripts/007_enable_data_protection.sql` script to:
- Enable Row Level Security (RLS) on all tables
- Create multi-tenant security policies
- Set up audit logging for all data changes
- Track who deleted/modified what and when

### 3. Set Up Separate Environments
- **Development:** Use a separate Supabase project for testing
- **Staging:** Clone production data to a staging environment
- **Production:** Your live customer-facing database
- **Never test on production data**

### 4. Configure Database Roles
- Use service role key only in server-side code
- Use anon key for client-side operations
- Never expose service role key to the client

### 5. Monitor Database Activity
- Set up Supabase monitoring and alerts
- Review audit logs regularly
- Monitor for unusual deletion patterns

### 6. Backup Strategy
- **Automated:** PITR handles continuous backups
- **Manual:** Export critical data weekly
- **Test restores:** Verify backups work monthly

### 7. Access Control
- Limit who has access to Supabase dashboard
- Use 2FA for all admin accounts
- Review access permissions quarterly

## What Happened to Your Data?

The migration scripts I created **did not delete any data**. They only added columns to the companies table. The data loss likely occurred due to:

1. Manual deletion from Supabase dashboard
2. Database reset or recreation
3. Testing in the wrong environment

## Preventing Future Data Loss

1. **Run the protection script above** - This adds RLS and audit logging
2. **Enable PITR in Supabase** - This is your safety net
3. **Use separate dev/prod databases** - Never test on production
4. **Review audit logs** - Track all changes to critical data

## Recovery Options

If you have PITR enabled:
- You can restore to any point before the deletion
- Go to Supabase Dashboard → Database → Backups

If you don't have PITR:
- Check if Supabase has automatic daily backups
- Contact Supabase support for recovery options
- You may need to recreate the data manually
