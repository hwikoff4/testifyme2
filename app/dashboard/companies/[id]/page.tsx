import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getCompanyById, getVideosByCompany, getReviewsByCompany } from "@/lib/db"
import { EmbedCodeGenerator } from "@/components/embed-code-generator"
import { QRCodeDisplay } from "@/components/qr-code-display"
import { Building2, Video, Star, ExternalLink, Plus, Settings, Eye, CheckCircle2, Sparkles } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function CompanyDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params

  try {
    const [company, videos, reviews] = await Promise.all([
      getCompanyById(id),
      getVideosByCompany(id),
      getReviewsByCompany(id),
    ])

    // Calculate statistics
    const stats = {
      totalVideos: videos.length,
      totalReviews: reviews.length,
      approvedReviews: reviews.filter((r) => r.status === "approved").length,
      pendingReviews: reviews.filter((r) => r.status === "pending").length,
      featuredReviews: reviews.filter((r) => r.is_featured).length,
      averageRating: reviews.length > 0 ? reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / reviews.length : 0,
    }

    return (
      <div className="space-y-6 md:space-y-8">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-6 mb-6">
            <div className="flex items-start gap-3 md:gap-4">
              {company.logo_url ? (
                <img
                  src={company.logo_url || "/placeholder.svg"}
                  alt={company.name}
                  className="h-16 w-16 md:h-20 md:w-20 rounded-xl object-cover shadow-lg shrink-0"
                />
              ) : (
                <div className="h-16 w-16 md:h-20 md:w-20 rounded-xl gradient-blue-red animate-gradient flex items-center justify-center shadow-lg shrink-0">
                  <Building2 className="h-8 w-8 md:h-10 md:w-10 text-white" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl md:text-4xl font-bold mb-1 md:mb-2 break-words">{company.name}</h1>
                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm md:text-base text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors break-all"
                  >
                    {company.website.replace(/^https?:\/\//, "")}
                    <ExternalLink className="h-3 w-3 md:h-4 md:w-4 shrink-0" />
                  </a>
                )}
                {company.description && (
                  <p className="text-sm md:text-base text-muted-foreground mt-2 line-clamp-3 md:line-clamp-none">
                    {company.description}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 md:shrink-0">
              <Button asChild variant="outline" size="sm" className="flex-1 sm:flex-none bg-transparent">
                <Link href={`/showcase/${id}`} target="_blank">
                  <Eye className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">View Showcase</span>
                  <span className="sm:hidden">Showcase</span>
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="flex-1 sm:flex-none bg-transparent">
                <Link href="/dashboard/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Settings</span>
                  <span className="sm:hidden">Settings</span>
                </Link>
              </Button>
              <Button asChild className="gradient-blue" size="sm" className="flex-1 sm:flex-none">
                <Link href={`/dashboard/videos/new`}>
                  <Plus className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Add Video</span>
                  <span className="sm:hidden">Video</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid gap-4 md:gap-6 grid-cols-2 lg:grid-cols-4">
          <Card className="border-l-4 border-l-blue-500 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Video className="h-4 w-4" />
                Total Videos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalVideos}</div>
              <p className="text-xs text-muted-foreground mt-1">Video testimonials</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Star className="h-4 w-4" />
                Total Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalReviews}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.averageRating > 0 && `${stats.averageRating.toFixed(1)} avg rating`}
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Approved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.approvedReviews}</div>
              <p className="text-xs text-muted-foreground mt-1">Ready to display</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-pink-500 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-[400ms]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Featured
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.featuredReviews}</div>
              <p className="text-xs text-muted-foreground mt-1">Highlighted reviews</p>
            </CardContent>
          </Card>
        </div>

        {/* Embed Code Generator and QR Code Display */}
        <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
          <EmbedCodeGenerator companyId={id} companyName={company.name} />
          <QRCodeDisplay companyId={id} companyName={company.name} />
        </div>

        {/* Recent Videos and Reviews */}
        <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
          {/* Recent Videos */}
          <Card className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-[600ms]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Videos</CardTitle>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/dashboard/videos">View All</Link>
                </Button>
              </div>
              <CardDescription>Latest video testimonials</CardDescription>
            </CardHeader>
            <CardContent>
              {videos.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Video className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No videos yet</p>
                  <Button asChild size="sm" className="mt-4 gradient-blue">
                    <Link href="/dashboard/videos/new">
                      <Plus className="mr-2 h-3 w-3" />
                      Add First Video
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {videos.slice(0, 3).map((video) => (
                    <div
                      key={video.id}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      {video.thumbnail_url ? (
                        <img
                          src={video.thumbnail_url || "/placeholder.svg"}
                          alt={video.title}
                          className="w-16 h-16 rounded object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                          <Video className="h-6 w-6 text-white" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{video.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={video.status === "approved" ? "default" : "secondary"} className="text-xs">
                            {video.status}
                          </Badge>
                          {video.featured && (
                            <Badge variant="outline" className="text-xs">
                              <Sparkles className="h-3 w-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Reviews */}
          <Card className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Reviews</CardTitle>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/dashboard/reviews">View All</Link>
                </Button>
              </div>
              <CardDescription>Latest customer testimonials</CardDescription>
            </CardHeader>
            <CardContent>
              {reviews.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Star className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No reviews yet</p>
                  <p className="text-sm mt-2">Reviews will appear here once customers submit them</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reviews.slice(0, 3).map((review) => (
                    <div key={review.id} className="p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {review.reviewer_avatar ? (
                            <img
                              src={review.reviewer_avatar || "/placeholder.svg"}
                              alt={review.reviewer_name}
                              className="w-8 h-8 rounded-full"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-medium">
                              {review.reviewer_name.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-sm">{review.reviewer_name}</p>
                            {review.rating && (
                              <div className="flex items-center gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${i < review.rating! ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={review.status === "approved" ? "default" : "secondary"} className="text-xs">
                            {review.status}
                          </Badge>
                          {review.is_featured && (
                            <Badge variant="outline" className="text-xs">
                              <Sparkles className="h-3 w-3" />
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error loading company:", error)
    notFound()
  }
}
