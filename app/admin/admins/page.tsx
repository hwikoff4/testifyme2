import { createClient } from "@/lib/supabase/server"
import { AdminsTable } from "@/components/admins-table"

export default async function AdminsPage() {
  const supabase = await createClient()

  const { data: admins } = await supabase
    .from("platform_admins")
    .select("*, user:user_id(email)")
    .order("created_at", { ascending: false })

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Platform Admins</h1>
        <p className="text-muted-foreground">Manage platform administrator access</p>
      </div>

      <AdminsTable admins={admins || []} />
    </div>
  )
}
