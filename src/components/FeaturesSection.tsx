import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Camera, 
  Brain, 
  Calculator, 
  Calendar, 
  Users, 
  TrendingUp, 
  Shield, 
  Phone,
  Wifi,
  Globe
} from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "AI Crop Diagnosis",
    description: "Upload crop photos for instant disease and nutrient deficiency detection using advanced computer vision.",
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    icon: Brain,
    title: "Smart Recommendations",
    description: "Get personalized fertilizer and treatment recommendations based on soil type, crop, and local conditions.",
    color: "text-leaf-green",
    bgColor: "bg-leaf-green/10"
  },
  {
    icon: Calculator,
    title: "ROI Calculator",
    description: "Calculate potential returns on fertilizer investments with yield improvement predictions and cost analysis.",
    color: "text-crop-gold",
    bgColor: "bg-accent/10"
  },
  {
    icon: Calendar,
    title: "Crop Calendar",
    description: "Smart scheduling with weather-based reminders for planting, irrigation, fertilization, and harvesting.",
    color: "text-sky-blue",
    bgColor: "bg-sky-blue/10"
  },
  {
    icon: Users,
    title: "Farmer Community",
    description: "Connect with local farmers, share experiences, and learn from success stories in your region.",
    color: "text-secondary",
    bgColor: "bg-secondary/10"
  },
  {
    icon: TrendingUp,
    title: "Market Intelligence",
    description: "Real-time crop prices, demand forecasts, and optimal selling timing based on market trends.",
    color: "text-destructive",
    bgColor: "bg-destructive/10"
  },
  {
    icon: Shield,
    title: "Soil Health Tracking",
    description: "Monitor soil nutrients, pH levels, and sustainability score to maintain long-term farm health.",
    color: "text-soil-brown",
    bgColor: "bg-primary/5"
  },
  {
    icon: Phone,
    title: "Expert Consultation",
    description: "Connect with agricultural experts for complex issues through video calls and chat support.",
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    icon: Wifi,
    title: "Works Offline",
    description: "Full functionality even without internet connection. Data syncs automatically when connected.",
    color: "text-leaf-green",
    bgColor: "bg-leaf-green/10"
  },
  {
    icon: Globe,
    title: "Multilingual Support",
    description: "Available in multiple regional languages with voice input and audio recommendations.",
    color: "text-crop-gold",
    bgColor: "bg-accent/10"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-muted/30" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="text-farm-green">Comprehensive</span> Farming Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to modernize your farming operations and maximize productivity
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="h-full hover:shadow-farm transition-all duration-300 group">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <Button variant="success" size="lg" className="text-lg px-8">
            Start Your Free Trial
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;