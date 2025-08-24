import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  BarChart3, 
  Calendar,
  MapPin,
  Search,
  Filter,
  AlertTriangle,
  Info
} from "lucide-react";

const MarketPrices = () => {
  const [selectedCrop, setSelectedCrop] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [timeRange, setTimeRange] = useState("30");

  const crops = [
    { id: "corn", name: "Corn", currentPrice: 4.25, change: 0.15, trend: "up" },
    { id: "soybeans", name: "Soybeans", currentPrice: 12.80, change: -0.30, trend: "down" },
    { id: "wheat", name: "Wheat", currentPrice: 6.45, change: 0.08, trend: "up" },
    { id: "cotton", name: "Cotton", currentPrice: 0.85, change: 0.02, trend: "up" },
    { id: "rice", name: "Rice", currentPrice: 18.50, change: -0.25, trend: "down" },
    { id: "potatoes", name: "Potatoes", currentPrice: 0.35, change: 0.05, trend: "up" }
  ];

  const regions = [
    { id: "midwest", name: "Midwest", description: "Corn Belt, Soybeans" },
    { id: "south", name: "South", description: "Cotton, Rice, Peanuts" },
    { id: "west", name: "West", description: "Wheat, Fruits, Vegetables" },
    { id: "northeast", name: "Northeast", description: "Dairy, Maple, Vegetables" }
  ];

  const priceHistory = [
    { date: "2024-01", corn: 4.10, soybeans: 13.20, wheat: 6.20, cotton: 0.83, rice: 18.80, potatoes: 0.30 },
    { date: "2024-02", corn: 4.15, soybeans: 13.10, wheat: 6.25, cotton: 0.84, rice: 18.75, potatoes: 0.32 },
    { date: "2024-03", corn: 4.20, soybeans: 12.90, wheat: 6.30, cotton: 0.85, rice: 18.70, potatoes: 0.33 },
    { date: "2024-04", corn: 4.25, soybeans: 12.80, wheat: 6.45, cotton: 0.85, rice: 18.50, potatoes: 0.35 }
  ];

  const marketNews = [
    {
      id: 1,
      title: "Corn prices rise on strong export demand",
      summary: "USDA reports increased corn exports to China and Mexico, driving prices up 3.5% this week.",
      impact: "positive",
      crops: ["corn"],
      date: "2 hours ago"
    },
    {
      id: 2,
      title: "Soybean prices decline due to weather concerns",
      summary: "Favorable weather conditions in Brazil suggest higher yields, putting downward pressure on prices.",
      impact: "negative",
      crops: ["soybeans"],
      date: "5 hours ago"
    },
    {
      id: 3,
      title: "Wheat market stable despite global uncertainty",
      summary: "Wheat prices remain steady as supply concerns in Ukraine are balanced by strong production in Russia.",
      impact: "neutral",
      crops: ["wheat"],
      date: "1 day ago"
    }
  ];

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? <TrendingUp className="h-4 w-4 text-green-600" /> : <TrendingDown className="h-4 w-4 text-red-600" />;
  };

  const getTrendColor = (trend: string) => {
    return trend === "up" ? "text-green-600" : "text-red-600";
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "positive": return "bg-green-100 text-green-800";
      case "negative": return "bg-red-100 text-red-800";
      case "neutral": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <DollarSign className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-farm-green">Market Prices & Trends</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Track real-time crop prices, analyze market trends, and make informed decisions 
            about when to sell your produce for maximum profit.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="crop-filter">Crop</Label>
                  <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select crop" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Crops</SelectItem>
                      {crops.map((crop) => (
                        <SelectItem key={crop.id} value={crop.id}>{crop.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="region-filter">Region</Label>
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Regions</SelectItem>
                      {regions.map((region) => (
                        <SelectItem key={region.id} value={region.id}>{region.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="time-range">Time Range</Label>
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 Days</SelectItem>
                      <SelectItem value="30">30 Days</SelectItem>
                      <SelectItem value="90">90 Days</SelectItem>
                      <SelectItem value="365">1 Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Prices */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Current Market Prices
              </CardTitle>
              <CardDescription>
                Latest prices for major agricultural commodities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {crops.map((crop) => (
                  <Card key={crop.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{crop.name}</CardTitle>
                        {getTrendIcon(crop.trend)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="text-2xl font-bold text-farm-green">
                          ${crop.currentPrice}
                        </div>
                        <div className={`text-sm font-medium ${getTrendColor(crop.trend)}`}>
                          {crop.change > 0 ? "+" : ""}{crop.change} ({((crop.change / (crop.currentPrice - crop.change)) * 100).toFixed(1)}%)
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Per bushel/unit
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Price Trends */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Price Trends</CardTitle>
              <CardDescription>Historical price movements over the last 4 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Date</th>
                      <th className="text-left p-2">Corn</th>
                      <th className="text-left p-2">Soybeans</th>
                      <th className="text-left p-2">Wheat</th>
                      <th className="text-left p-2">Cotton</th>
                      <th className="text-left p-2">Rice</th>
                      <th className="text-left p-2">Potatoes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {priceHistory.map((month) => (
                      <tr key={month.date} className="border-b">
                        <td className="p-2 font-medium">{month.date}</td>
                        <td className="p-2">${month.corn}</td>
                        <td className="p-2">${month.soybeans}</td>
                        <td className="p-2">${month.wheat}</td>
                        <td className="p-2">${month.cotton}</td>
                        <td className="p-2">${month.rice}</td>
                        <td className="p-2">${month.potatoes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Market News */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Market News & Analysis
              </CardTitle>
              <CardDescription>
                Latest news affecting agricultural markets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {marketNews.map((news) => (
                  <div key={news.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">{news.title}</h4>
                      <Badge className={getImpactColor(news.impact)}>
                        {news.impact}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {news.summary}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {news.crops.map((crop) => (
                          <Badge key={crop} variant="outline" className="text-xs">
                            {crop}
                          </Badge>
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">{news.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Market Insights */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Market Insights</CardTitle>
              <CardDescription>Key factors affecting current market conditions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Supply Factors</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Weather conditions in major growing regions</li>
                    <li>• Crop disease outbreaks and pest pressure</li>
                    <li>• Transportation and logistics challenges</li>
                    <li>• Government policies and subsidies</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">Demand Factors</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Global population growth and food demand</li>
                    <li>• Biofuel production requirements</li>
                    <li>• Export demand from key markets</li>
                    <li>• Consumer preferences and trends</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Price Alerts */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Price Alerts
              </CardTitle>
              <CardDescription>
                Set up notifications for price movements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Price Alert: Corn</h4>
                    <p className="text-sm text-yellow-700">
                      Corn prices have increased by more than 5% in the last 7 days. 
                      Consider reviewing your selling strategy.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MarketPrices;
