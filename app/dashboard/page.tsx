import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, CheckCircle, Clock, Building2, Video, Sparkles } from "lucide-react"
import { getStats } from "@/lib/db"

export default async function DashboardPage() {
  const stats = await getStats()

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
        <p className="text-sm md:text-base text-muted-foreground mt-1">
          Welcome back! Here's an overview of your testimonials
        </p>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 xs:grid-cols-2 lg:grid-cols-3">
        <Card className="hover-lift animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 border-l-4 border-l-blue">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
            <div className="h-10 w-10 rounded-full gradient-blue flex items-center justify-center">
              <Building2 className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCompanies}</div>
            <p className="text-xs text-muted-foreground">Companies registered</p>
          </CardContent>
        </Card>

        <Card className="hover-lift animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 border-l-4 border-l-blue-light">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
            <div className="h-10 w-10 rounded-full gradient-blue flex items-center justify-center">
              <Video className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVideos}</div>
            <p className="text-xs text-muted-foreground">Video testimonials</p>
          </CardContent>
        </Card>

        <Card className="hover-lift animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 border-l-4 border-l-red">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <div className="h-10 w-10 rounded-full gradient-red flex items-center justify-center">
              <Star className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalReviews}</div>
            <p className="text-xs text-muted-foreground">All testimonials collected</p>
          </CardContent>
        </Card>

        <Card className="hover-lift animate-in fade-in slide-in-from-bottom-4 duration-700 delay-250 border-l-4 border-l-blue-dark">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <div className="h-10 w-10 rounded-full gradient-blue flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.approvedReviews}</div>
            <p className="text-xs text-muted-foreground">Ready to display</p>
          </CardContent>
        </Card>

        <Card className="hover-lift animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 border-l-4 border-l-red-light">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <div className="h-10 w-10 rounded-full gradient-red flex items-center justify-center">
              <Clock className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingReviews}</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card className="hover-lift animate-in fade-in slide-in-from-bottom-4 duration-700 delay-350 border-l-4 border-l-red-dark">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Featured</CardTitle>
            <div className="h-10 w-10 rounded-full gradient-blue-red animate-gradient flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.featuredReviews}</div>
            <p className="text-xs text-muted-foreground">Highlighted reviews</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
