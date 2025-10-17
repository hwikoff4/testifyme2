import { createClient } from "@/lib/supabase/server"

export async function checkDatabaseSetup() {
  try {
    const supabase = await createClient()

    // This avoids 404 errors when tables don't exist
    const { data, error } = await supabase.rpc("check_tables_exist", {
      table_names: ["clients", "profiles", "reviews", "platform_admins"],
    })

    // If the RPC function doesn't exist, fall back to checking each table
    if (error?.code === "42883") {
      // Function doesn't exist, use fallback method
      return await checkTablesDirectly(supabase)
    }

    if (error || !data) {
      return {
        isSetup: false,
        missingTables: ["clients", "profiles", "reviews", "platform_admins"],
      }
    }

    const missingTables = data.filter((t: { exists: boolean }) => !t.exists).map((t: { name: string }) => t.name)

    return {
      isSetup: missingTables.length === 0,
      missingTables,
    }
  } catch (error) {
    // If anything goes wrong, use the fallback method
    const supabase = await createClient()
    return await checkTablesDirectly(supabase)
  }
}

// Fallback method that checks tables by querying information_schema
async function checkTablesDirectly(supabase: any) {
  try {
    // Query the information_schema to check if tables exist
    const { data, error } = await supabase
      .from("information_schema.tables")
      .select("table_name")
      .eq("table_schema", "public")
      .in("table_name", ["clients", "profiles", "reviews", "platform_admins"])

    if (error) {
      // If we can't query information_schema, assume tables don't exist
      return {
        isSetup: false,
        missingTables: ["clients", "profiles", "reviews", "platform_admins"],
      }
    }

    const existingTables = data?.map((t: { table_name: string }) => t.table_name) || []
    const requiredTables = ["clients", "profiles", "reviews", "platform_admins"]
    const missingTables = requiredTables.filter((t) => !existingTables.includes(t))

    return {
      isSetup: missingTables.length === 0,
      missingTables,
    }
  } catch (err) {
    // Last resort: assume nothing is set up
    return {
      isSetup: false,
      missingTables: ["clients", "profiles", "reviews", "platform_admins"],
    }
  }
}
