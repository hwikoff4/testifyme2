"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Shield } from "lucide-react"

type Admin = {
  id: string
  user_id: string
  created_at: string
  user: {
    email: string
  } | null
}

export function AdminsTable({ admins }: { admins: Admin[] }) {
  if (admins.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <Shield className="mb-4 h-12 w-12 text-muted-foreground" />
        <h3 className="mb-2 text-lg font-semibold">No platform admins</h3>
        <p className="text-sm text-muted-foreground">Add admins via the database</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>User ID</TableHead>
            <TableHead>Added</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {admins.map((admin) => (
            <TableRow key={admin.id}>
              <TableCell className="font-medium">{admin.user?.email || "Unknown"}</TableCell>
              <TableCell className="font-mono text-xs">{admin.user_id}</TableCell>
              <TableCell>{new Date(admin.created_at).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
