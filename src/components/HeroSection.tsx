import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Smartphone, Brain, Calculator, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-farm.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-sm font-medium text-primary">
                <Brain className="h-4 w-4" />
                AI-Powered Precision Farming
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="text-farm-green">Smart Farming</span><br />
                <span className="text-foreground">Solutions for</span><br />
                <span className="bg-gradient-to-r from-crop-gold to-accent bg-clip-text text-transparent">
                  Maximum Yield
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Transform your farming with AI-powered crop diagnosis, personalized nutrient recommendations, 
                and real-time market insights. Increase yields while reducing costs.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="text-lg px-8">
                Start Farming Smarter
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                Watch Demo
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-farm-green">85K+</div>
                <div className="text-sm text-muted-foreground">Active Farmers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-farm-green">40%</div>
                <div className="text-sm text-muted-foreground">Yield Increase</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-farm-green">₹25K</div>
                <div className="text-sm text-muted-foreground">Avg. Savings</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image & Feature Cards */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={heroImage} 
                alt="Smart farming with AI technology" 
                className="w-full h-[600px] object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>

            {/* Floating Feature Cards */}
            <Card className="absolute -left-6 top-1/4 p-4 bg-gradient-card backdrop-blur-sm shadow-farm max-w-[200px]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Smartphone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Mobile First</div>
                  <div className="text-xs text-muted-foreground">Works offline</div>
                </div>
              </div>
            </Card>

            <Card className="absolute -right-6 top-1/2 p-4 bg-gradient-card backdrop-blur-sm shadow-farm max-w-[200px]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Calculator className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <div className="font-semibold text-sm">ROI Calculator</div>
                  <div className="text-xs text-muted-foreground">Profit insights</div>
                </div>
              </div>
            </Card>

            <Card className="absolute -left-6 bottom-1/4 p-4 bg-gradient-card backdrop-blur-sm shadow-farm max-w-[200px]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-leaf-green/10 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-leaf-green" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Market Intel</div>
                  <div className="text-xs text-muted-foreground">Price predictions</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;