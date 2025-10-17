import { CompanyForm } from "@/components/company-form"

export default function NewCompanyPage() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-3xl font-bold">Add New Company</h1>
        <p className="text-muted-foreground">Create a new company profile to manage their video testimonials</p>
      </div>

      <CompanyForm />
    </div>
  )
}
