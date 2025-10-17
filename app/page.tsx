import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Video,
  Star,
  Zap,
  Sparkles,
  Brain,
  Wand2,
  CheckCircle2,
  Globe,
  CreditCard,
  AlertCircle,
  TrendingDown,
  Clock,
  MessageSquare,
} from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b px-4 md:px-6 py-4 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <Image
            src="/testifyme-logo.png"
            alt="TestifyMe"
            width={180}
            height={60}
            className="h-10 md:h-12 w-auto"
            priority
          />
          <div className="flex items-center gap-2 md:gap-4">
            <Button asChild variant="ghost" size="sm" className="text-sm md:text-base">
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="text-sm md:text-base gradient-brand text-white hover:opacity-90 transition-opacity"
            >
              <Link href="/dashboard">Book A Demo</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="flex flex-1 flex-col items-center justify-center px-4 md:px-6 py-16 md:py-32 text-center relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-white">
        <div className="absolute inset-0 -z-10 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 gradient-unc-blue rounded-full blur-3xl animate-gradient" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 gradient-navy rounded-full blur-3xl animate-gradient" />
        </div>

        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance animate-in fade-in slide-in-from-bottom-4 duration-1000 text-[#0A1F44]">
            Struggling to Get <span className="text-gradient-brand">Authentic Testimonials</span> That Boost Your Google
            Ratings?
          </h1>
          <p className="mb-8 text-lg md:text-xl lg:text-2xl text-muted-foreground text-pretty max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150 leading-relaxed">
            Your prospects doubt reviews. You waste time chasing customer feedback. Your Google ratings stay flat while
            competitors surge ahead.
          </p>
          <p className="mb-10 text-xl md:text-2xl font-semibold text-[#0A1F44] animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            What if testimonials just flowed—and pushed people to leave Google reviews?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto gradient-brand text-white hover:opacity-90 transition-opacity text-lg px-8 py-6 hover-lift"
            >
              <Link href="/dashboard">Book A Demo</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-2 border-[#56B4E9] text-[#0A1F44] hover:bg-[#56B4E9]/10 text-lg px-8 py-6 hover-lift bg-transparent"
            >
              <Link href="#how-it-works">See How It Works</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="px-4 md:px-6 py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#0A1F44]">You're Not Alone</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              Many businesses face the same challenges when it comes to collecting and leveraging customer testimonials
            </p>
          </div>

          <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 mb-12">
            {/* Pain Point 1 */}
            <div className="p-8 rounded-2xl border-2 border-red-200 bg-gradient-to-br from-red-50/50 to-white">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-red-500 shadow-md">
                  <TrendingDown className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-[#0A1F44]">Low Testimonial Volume</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Customers love your service but never leave reviews. You're stuck with a handful of testimonials
                    while competitors have hundreds.
                  </p>
                </div>
              </div>
            </div>

            {/* Pain Point 2 */}
            <div className="p-8 rounded-2xl border-2 border-red-200 bg-gradient-to-br from-red-50/50 to-white">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-red-500 shadow-md">
                  <MessageSquare className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-[#0A1F44]">Bland, Generic Reviews</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    When you do get reviews, they're short and vague: "Great service!" doesn't convince anyone or help
                    your SEO.
                  </p>
                </div>
              </div>
            </div>

            {/* Pain Point 3 */}
            <div className="p-8 rounded-2xl border-2 border-red-200 bg-gradient-to-br from-red-50/50 to-white">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-red-500 shadow-md">
                  <AlertCircle className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-[#0A1F44]">Low Trust & Credibility</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Prospects see your weak social proof and choose competitors with better reviews. You're losing leads
                    before they even contact you.
                  </p>
                </div>
              </div>
            </div>

            {/* Pain Point 4 */}
            <div className="p-8 rounded-2xl border-2 border-red-200 bg-gradient-to-br from-red-50/50 to-white">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-red-500 shadow-md">
                  <Clock className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-[#0A1F44]">Manual, Time-Consuming Process</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Chasing customers for reviews, editing submissions, and managing testimonials eats up hours you
                    don't have.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-red-100 to-red-50 border-2 border-red-300">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#0A1F44]">The Cost of Doing Nothing</h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Every day without strong testimonials means <strong>lost leads</strong>,{" "}
              <strong>weak social proof</strong>, and <strong>poor local SEO</strong>. Your competitors are winning
              customers who should be yours.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 md:px-6 py-16 md:py-24 bg-gradient-to-b from-blue-50/30 to-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#56B4E9]/10 to-[#0A1F44]/10 border border-[#56B4E9]/30 mb-6">
              <Sparkles className="h-4 w-4 text-[#56B4E9]" />
              <span className="text-sm font-semibold text-[#0A1F44]">This Is Where TestifyMe Comes In</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#0A1F44]">The AI + Video Testimonial Platform</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              TestifyMe combines cutting-edge AI with authentic video testimonials to help you collect, manage, and
              leverage customer reviews—then seamlessly guide them to Google.
            </p>
          </div>

          <div className="grid gap-8 grid-cols-1 md:grid-cols-3 mb-12">
            <div className="p-8 rounded-2xl border-2 border-[#56B4E9]/20 bg-white hover-lift shadow-lg text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl gradient-unc-blue mx-auto mb-4 shadow-md">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#0A1F44]">AI-Generated Reviews</h3>
              <p className="text-muted-foreground leading-relaxed">
                Industry-specific, emotion-aware testimonials that sound authentically human
              </p>
            </div>

            <div className="p-8 rounded-2xl border-2 border-[#56B4E9]/20 bg-white hover-lift shadow-lg text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl gradient-brand animate-gradient mx-auto mb-4 shadow-md">
                <Video className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#0A1F44]">Video Testimonials</h3>
              <p className="text-muted-foreground leading-relaxed">
                Collect authentic video reviews that build trust and credibility
              </p>
            </div>

            <div className="p-8 rounded-2xl border-2 border-[#56B4E9]/20 bg-white hover-lift shadow-lg text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl gradient-navy mx-auto mb-4 shadow-md">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#0A1F44]">Google Integration</h3>
              <p className="text-muted-foreground leading-relaxed">
                Direct customers to post reviews on your Google Business profile
              </p>
            </div>
          </div>

          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="gradient-brand text-white hover:opacity-90 transition-opacity text-lg px-10 py-6 hover-lift shadow-lg"
            >
              <Link href="/dashboard">Book A Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="px-4 md:px-6 py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#0A1F44]">How TestifyMe Solves Your Problems</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Every pain point has a solution. Here's how we transform your testimonial strategy.
            </p>
          </div>

          <div className="space-y-12">
            {/* Solution 1 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="p-8 rounded-2xl border-2 border-red-200 bg-gradient-to-br from-red-50/50 to-white">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingDown className="h-6 w-6 text-red-500" />
                  <h4 className="text-lg font-bold text-red-700">Problem: Low Volume</h4>
                </div>
                <p className="text-muted-foreground">Customers don't leave reviews</p>
              </div>
              <div className="p-8 rounded-2xl border-2 border-green-200 bg-gradient-to-br from-green-50/50 to-white">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                  <h4 className="text-lg font-bold text-green-700">Solution: AI Generation</h4>
                </div>
                <p className="text-muted-foreground">
                  <strong>Generate testimonials instantly</strong> with AI. Customers just answer a few questions, and
                  our AI creates a compelling review they can approve and post.
                </p>
              </div>
            </div>

            {/* Solution 2 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="p-8 rounded-2xl border-2 border-red-200 bg-gradient-to-br from-red-50/50 to-white">
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare className="h-6 w-6 text-red-500" />
                  <h4 className="text-lg font-bold text-red-700">Problem: Bland Reviews</h4>
                </div>
                <p className="text-muted-foreground">Generic "Great service!" doesn't help</p>
              </div>
              <div className="p-8 rounded-2xl border-2 border-green-200 bg-gradient-to-br from-green-50/50 to-white">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                  <h4 className="text-lg font-bold text-green-700">Solution: Context-Aware AI</h4>
                </div>
                <p className="text-muted-foreground">
                  <strong>Industry-specific, detailed reviews</strong> with proper terminology, emotional tone, and
                  keywords that boost SEO and build trust.
                </p>
              </div>
            </div>

            {/* Solution 3 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="p-8 rounded-2xl border-2 border-red-200 bg-gradient-to-br from-red-50/50 to-white">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="h-6 w-6 text-red-500" />
                  <h4 className="text-lg font-bold text-red-700">Problem: Low Trust</h4>
                </div>
                <p className="text-muted-foreground">Weak social proof loses leads</p>
              </div>
              <div className="p-8 rounded-2xl border-2 border-green-200 bg-gradient-to-br from-green-50/50 to-white">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                  <h4 className="text-lg font-bold text-green-700">Solution: Video + Google Reviews</h4>
                </div>
                <p className="text-muted-foreground">
                  <strong>Authentic video testimonials</strong> build credibility, while{" "}
                  <strong>Google Reviews integration</strong> boosts your local SEO and star rating.
                </p>
              </div>
            </div>

            {/* Solution 4 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="p-8 rounded-2xl border-2 border-red-200 bg-gradient-to-br from-red-50/50 to-white">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-6 w-6 text-red-500" />
                  <h4 className="text-lg font-bold text-red-700">Problem: Time-Consuming</h4>
                </div>
                <p className="text-muted-foreground">Manual process wastes hours</p>
              </div>
              <div className="p-8 rounded-2xl border-2 border-green-200 bg-gradient-to-br from-green-50/50 to-white">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                  <h4 className="text-lg font-bold text-green-700">Solution: Automated Dashboard</h4>
                </div>
                <p className="text-muted-foreground">
                  <strong>One-click approval workflow</strong>, automatic organization, and instant embedding. Manage
                  everything from a single dashboard.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-16 p-8 rounded-2xl bg-gradient-to-br from-green-100 to-green-50 border-2 border-green-300">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#0A1F44]">The Result?</h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-6">
              <strong>More reviews</strong>, <strong>higher trust</strong>, <strong>increased conversions</strong>, and{" "}
              <strong>less manual work</strong>. Your testimonials become a growth engine, not a bottleneck.
            </p>
            <Button
              asChild
              size="lg"
              className="gradient-brand text-white hover:opacity-90 transition-opacity text-lg px-10 py-6 hover-lift shadow-lg"
            >
              <Link href="/dashboard">Book A Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="px-4 md:px-6 py-16 md:py-24 bg-gradient-to-b from-blue-50/30 to-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#0A1F44]">How It Works</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              From setup to Google Reviews in four simple steps
            </p>
          </div>

          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {/* Step 1 */}
            <div className="relative p-8 rounded-2xl border-2 border-[#56B4E9]/20 bg-white hover-lift shadow-lg">
              <div className="absolute -top-4 left-6 flex h-10 w-10 items-center justify-center rounded-full gradient-brand text-white font-bold text-lg shadow-lg">
                1
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-xl gradient-unc-blue mb-4 mt-2 shadow-md">
                <CheckCircle2 className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#0A1F44]">Setup & Connect</h3>
              <p className="text-muted-foreground leading-relaxed">
                Create your account and add your Google Place ID to connect your Google Reviews
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative p-8 rounded-2xl border-2 border-[#56B4E9]/20 bg-white hover-lift shadow-lg">
              <div className="absolute -top-4 left-6 flex h-10 w-10 items-center justify-center rounded-full gradient-brand text-white font-bold text-lg shadow-lg">
                2
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-xl gradient-brand animate-gradient mb-4 mt-2 shadow-md">
                <Wand2 className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#0A1F44]">Collect Testimonials</h3>
              <p className="text-muted-foreground leading-relaxed">
                Share your review link with customers. They upload videos or use AI to generate authentic reviews
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative p-8 rounded-2xl border-2 border-[#56B4E9]/20 bg-white hover-lift shadow-lg">
              <div className="absolute -top-4 left-6 flex h-10 w-10 items-center justify-center rounded-full gradient-brand text-white font-bold text-lg shadow-lg">
                3
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-xl gradient-navy mb-4 mt-2 shadow-md">
                <Star className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#0A1F44]">Approve & Showcase</h3>
              <p className="text-muted-foreground leading-relaxed">
                Review submissions in your dashboard, approve the best ones, and display them on your website
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative p-8 rounded-2xl border-2 border-[#56B4E9]/20 bg-white hover-lift shadow-lg">
              <div className="absolute -top-4 left-6 flex h-10 w-10 items-center justify-center rounded-full gradient-brand text-white font-bold text-lg shadow-lg">
                4
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-xl gradient-brand-reverse mb-4 mt-2 shadow-md">
                <Globe className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#0A1F44]">Post to Google</h3>
              <p className="text-muted-foreground leading-relaxed">
                Customers get a direct link to post their AI-generated review to your Google Business profile
              </p>
            </div>
          </div>

          <div className="text-center mt-16">
            <Button
              asChild
              size="lg"
              className="gradient-brand text-white hover:opacity-90 transition-opacity text-lg px-10 py-6 hover-lift shadow-lg"
            >
              <Link href="/dashboard">Book A Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="px-4 md:px-6 py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#56B4E9]/10 to-[#0A1F44]/10 border border-[#56B4E9]/30 mb-6">
              <Brain className="h-5 w-5 text-[#56B4E9]" />
              <span className="text-sm font-semibold text-[#0A1F44]">What Sets Us Apart</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#0A1F44]">Why TestifyMe?</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              We're not just another review platform. Here's what makes TestifyMe different.
            </p>
          </div>

          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 mb-12">
            <div className="p-8 rounded-2xl border-2 border-[#56B4E9]/20 bg-gradient-to-br from-white to-blue-50/30 hover-lift shadow-lg">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl gradient-unc-blue shadow-md">
                  <Brain className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-[#0A1F44]">Emotion-Aware AI</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Our AI doesn't just generate text—it understands emotional tone, context, and industry-specific
                    language to create reviews that feel authentically human.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl border-2 border-[#56B4E9]/20 bg-gradient-to-br from-white to-blue-50/30 hover-lift shadow-lg">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl gradient-brand animate-gradient shadow-md">
                  <Wand2 className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-[#0A1F44]">Industry Specificity</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Whether you're in healthcare, home services, or hospitality, our AI generates reviews with accurate
                    terminology and relevant details for your industry.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl border-2 border-[#56B4E9]/20 bg-gradient-to-br from-white to-blue-50/30 hover-lift shadow-lg">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl gradient-navy shadow-md">
                  <Globe className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-[#0A1F44]">Seamless Google Integration</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Direct customers from AI-generated testimonials to your Google Business profile with one click.
                    Boost your local SEO effortlessly.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl border-2 border-[#56B4E9]/20 bg-gradient-to-br from-white to-blue-50/30 hover-lift shadow-lg">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl gradient-brand-reverse shadow-md">
                  <Video className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-[#0A1F44]">Hybrid Video + AI</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Combine the authenticity of video testimonials with the efficiency of AI-generated reviews for a
                    comprehensive social proof strategy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t bg-gradient-to-b from-blue-50/30 to-white px-4 md:px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl md:text-4xl font-bold text-[#0A1F44]">
            Everything You Need to Grow Your Reputation
          </h2>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            <div className="flex flex-col items-center text-center p-8 rounded-2xl hover-lift bg-white border-2 border-[#56B4E9]/20 shadow-lg">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full gradient-unc-blue shadow-md">
                <Video className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#0A1F44]">Video & Text Reviews</h3>
              <p className="text-muted-foreground leading-relaxed">
                Collect both video testimonials and written reviews from your customers
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-8 rounded-2xl hover-lift bg-white border-2 border-[#56B4E9]/20 shadow-lg">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full gradient-brand animate-gradient shadow-md">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#0A1F44]">Easy Management</h3>
              <p className="text-muted-foreground leading-relaxed">
                Approve, feature, and organize testimonials from your dashboard
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-8 rounded-2xl hover-lift bg-white border-2 border-[#56B4E9]/20 shadow-lg">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full gradient-navy shadow-md">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#0A1F44]">Embed Anywhere</h3>
              <p className="text-muted-foreground leading-relaxed">
                Display testimonials on your website with a simple embed code
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-8 rounded-2xl hover-lift bg-white border-2 border-[#56B4E9]/20 shadow-lg">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full gradient-brand-reverse shadow-md">
                <CreditCard className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#0A1F44]">QR Business Cards</h3>
              <p className="text-muted-foreground leading-relaxed">
                Generate downloadable business cards with QR codes for instant review collection
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-8 rounded-2xl hover-lift bg-white border-2 border-[#56B4E9]/20 shadow-lg">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full gradient-unc-blue shadow-md">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#0A1F44]">Google Reviews Integration</h3>
              <p className="text-muted-foreground leading-relaxed">
                Seamlessly guide customers to post AI-generated reviews on Google
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-8 rounded-2xl hover-lift bg-white border-2 border-[#56B4E9]/20 shadow-lg">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full gradient-brand animate-gradient shadow-md">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#0A1F44]">Advanced AI Generation</h3>
              <p className="text-muted-foreground leading-relaxed">
                Industry-specific, emotion-aware testimonials that sound authentically human
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 md:px-6 py-16 md:py-24 bg-gradient-to-br from-[#56B4E9]/10 via-white to-[#0A1F44]/10">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#0A1F44]">Ready to Transform Your Testimonials?</h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Stop losing leads to weak social proof. Start collecting authentic testimonials and boosting your Google
            ratings today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto gradient-brand text-white hover:opacity-90 transition-opacity text-lg px-10 py-6 hover-lift shadow-lg"
            >
              <Link href="/dashboard">Book A Demo</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-2 border-[#56B4E9] text-[#0A1F44] hover:bg-[#56B4E9]/10 text-lg px-10 py-6 hover-lift bg-transparent"
            >
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t px-6 py-8 bg-gradient-to-b from-white to-blue-50/20">
        <div className="mx-auto max-w-6xl text-center text-sm text-muted-foreground">
          <p className="font-medium">&copy; 2025 TestifyMe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
