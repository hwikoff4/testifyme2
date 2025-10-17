import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Building2, ExternalLink } from "lucide-react"
import Link from "next/link"
import { getCompanies } from "@/lib/db"

export default async function CompaniesPage() {
  const companies = await getCompanies()

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Companies</h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            Manage companies and their video testimonials
          </p>
        </div>
        <Button asChild className="gradient-brand w-full sm:w-auto">
          <Link href="/dashboard/companies/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Company
          </Link>
        </Button>
      </div>

      {companies.length === 0 ? (
        <Card className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <CardContent className="flex flex-col items-center justify-center py-12 md:py-16 px-4">
            <div className="h-14 w-14 md:h-16 md:w-16 rounded-full gradient-brand animate-gradient flex items-center justify-center mb-4">
              <Building2 className="h-7 w-7 md:h-8 md:w-8 text-white" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-2 text-center">No companies yet</h3>
            <p className="text-sm md:text-base text-muted-foreground text-center mb-6 max-w-md px-4">
              After your demo, you'll be able to add companies and start collecting video testimonials and reviews.
            </p>
            <Button asChild className="gradient-brand w-full sm:w-auto">
              <Link href="/dashboard/companies/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Company
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {companies.map((company, index) => (
            <Card
              key={company.id}
              className="hover-lift animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {company.logo_url ? (
                      <img
                        src={company.logo_url || "/placeholder.svg"}
                        alt={company.name}
                        className="h-12 w-12 rounded-lg object-cover shrink-0"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-lg gradient-brand flex items-center justify-center shrink-0">
                        <Building2 className="h-6 w-6 text-white" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-base md:text-lg truncate">{company.name}</CardTitle>
                      {company.website && (
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 mt-1 truncate"
                        >
                          <span className="truncate">Visit website</span>
                          <ExternalLink className="h-3 w-3 shrink-0" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {company.description && (
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{company.description}</p>
                )}
                <div className="flex gap-2">
                  <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Link href={`/dashboard/companies/${company.id}`}>View Details</Link>
                  </Button>
                  <Button asChild size="sm" className="flex-1 gradient-brand">
                    <Link href="/dashboard/videos/new">
                      <Plus className="mr-1 h-3 w-3" />
                      Add Video
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
