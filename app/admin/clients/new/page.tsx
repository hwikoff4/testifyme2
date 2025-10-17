import { NewClientForm } from "@/components/new-client-form"

export default function NewClientPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add New Client</h1>
        <p className="text-muted-foreground">Create a new client organization</p>
      </div>

      <div className="mx-auto max-w-2xl">
        <NewClientForm />
      </div>
    </div>
  )
}
