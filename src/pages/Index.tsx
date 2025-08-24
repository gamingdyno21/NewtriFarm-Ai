import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import AIDemo from "@/components/AIDemo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Bot, 
  Calculator, 
  Users, 
  Cloud,
  Calendar,
  Package,
  DollarSign,
  ArrowRight 
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      title: "Dashboard",
      description: "Monitor your farm's performance with real-time metrics, weather data, and activity tracking.",
      icon: BarChart3,
      path: "/dashboard",
      color: "text-blue-600",
      category: "Monitoring"
    },
    {
      title: "AI Diagnosis",
      description: "Upload crop images for instant AI-powered health analysis and personalized recommendations.",
      icon: Bot,
      path: "/ai-diagnosis",
      color: "text-green-600",
      category: "AI Tools"
    },
    {
      title: "ROI Calculator",
      description: "Plan your farming investments with comprehensive cost analysis and profit projections.",
      icon: Calculator,
      path: "/roi-calculator",
      color: "text-purple-600",
      category: "Financial"
    },
    {
      title: "Weather Forecast",
      description: "Get detailed weather forecasts, hourly updates, and farming-specific recommendations.",
      icon: Cloud,
      path: "/weather",
      color: "text-cyan-600",
      category: "Environment"
    },
    {
      title: "Crop Planning",
      description: "Plan your farming season with comprehensive scheduling, rotation planning, and task management.",
      icon: Calendar,
      path: "/crop-planning",
      color: "text-orange-600",
      category: "Planning"
    },
    {
      title: "Inventory Management",
      description: "Track and manage farming supplies, equipment, and materials with real-time monitoring.",
      icon: Package,
      path: "/inventory",
      color: "text-indigo-600",
      category: "Operations"
    },
    {
      title: "Market Prices",
      description: "Track real-time crop prices, analyze market trends, and optimize your selling strategy.",
      icon: DollarSign,
      path: "/market-prices",
      color: "text-emerald-600",
      category: "Financial"
    },
    {
      title: "Community",
      description: "Connect with fellow farmers, share knowledge, and access valuable farming resources.",
      icon: Users,
      path: "/community",
      color: "text-pink-600",
      category: "Networking"
    }
  ];

  const categories = [...new Set(features.map(f => f.category))];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        
        {/* Features Navigation */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-farm-green mb-4">
                Complete Farming Platform
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Discover our comprehensive suite of farming tools designed to help you optimize operations, 
                make data-driven decisions, and connect with the farming community. From AI-powered crop 
                analysis to financial planning and weather monitoring.
              </p>
            </div>
            
            {/* Features by Category */}
            {categories.map((category) => (
              <div key={category} className="mb-12">
                <h3 className="text-xl font-semibold mb-6 text-center">{category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {features
                    .filter(feature => feature.category === category)
                    .map((feature) => (
                      <Card key={feature.title} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <CardHeader className="text-center">
                          <div className={`mx-auto w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4`}>
                            <feature.icon className={`h-6 w-6 ${feature.color}`} />
                          </div>
                          <CardTitle className="text-lg">{feature.title}</CardTitle>
                          <CardDescription className="text-sm">
                            {feature.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                          <Button asChild className="w-full">
                            <Link to={feature.path}>
                              Explore {feature.title}
                              <ArrowRight className="h-4 w-4 ml-2" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            ))}

            {/* Quick Stats */}
            <div className="mt-16">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle>Platform Statistics</CardTitle>
                  <CardDescription>What makes NutriFarm AI the choice for modern farmers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div>
                      <div className="text-3xl font-bold text-farm-green">8+</div>
                      <p className="text-sm text-muted-foreground">Core Features</p>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-blue-600">AI-Powered</div>
                      <p className="text-sm text-muted-foreground">Crop Analysis</p>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-purple-600">Real-time</div>
                      <p className="text-sm text-muted-foreground">Data Monitoring</p>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-orange-600">Mobile</div>
                      <p className="text-sm text-muted-foreground">Responsive Design</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <FeaturesSection />
        <AIDemo />
      </main>
    </div>
  );
};

export default Index;