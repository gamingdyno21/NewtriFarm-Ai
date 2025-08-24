import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Wind, 
  Thermometer, 
  Droplets,
  Eye,
  AlertTriangle,
  Calendar,
  MapPin,
  TrendingUp,
  Leaf
} from "lucide-react";

const WeatherForecast = () => {
  const [selectedLocation, setSelectedLocation] = useState("New York");
  const [forecastDays, setForecastDays] = useState(7);

  const weatherData = {
    current: {
      temp: 24,
      feelsLike: 26,
      humidity: 65,
      windSpeed: 12,
      visibility: 10,
      uvIndex: 6,
      condition: "Partly Cloudy",
      icon: "⛅"
    },
    hourly: [
      { time: "Now", temp: 24, condition: "⛅", humidity: 65, wind: 12 },
      { time: "1 PM", temp: 26, condition: "☀️", humidity: 58, wind: 10 },
      { time: "2 PM", temp: 27, condition: "☀️", humidity: 55, wind: 8 },
      { time: "3 PM", temp: 28, condition: "☀️", humidity: 52, wind: 9 },
      { time: "4 PM", temp: 27, condition: "⛅", humidity: 56, wind: 11 },
      { time: "5 PM", temp: 25, condition: "⛅", humidity: 60, wind: 13 },
      { time: "6 PM", temp: 23, condition: "🌤️", humidity: 65, wind: 14 },
      { time: "7 PM", temp: 21, condition: "🌤️", humidity: 70, wind: 15 }
    ],
    daily: [
      { day: "Today", high: 28, low: 18, condition: "Partly Cloudy", icon: "⛅", rainChance: 20 },
      { day: "Tomorrow", high: 26, low: 17, condition: "Light Rain", icon: "🌧️", rainChance: 60 },
      { day: "Wednesday", high: 24, low: 16, condition: "Cloudy", icon: "☁️", rainChance: 40 },
      { day: "Thursday", high: 27, low: 19, condition: "Sunny", icon: "☀️", rainChance: 10 },
      { day: "Friday", high: 29, low: 20, condition: "Sunny", icon: "☀️", rainChance: 5 },
      { day: "Saturday", high: 25, low: 18, condition: "Partly Cloudy", icon: "⛅", rainChance: 30 },
      { day: "Sunday", high: 23, low: 16, condition: "Light Rain", icon: "🌧️", rainChance: 70 }
    ]
  };

  const farmingRecommendations = [
    {
      condition: "High UV Index",
      recommendation: "Consider shade cloth for sensitive crops",
      priority: "medium",
      icon: "☀️"
    },
    {
      condition: "Low Humidity",
      recommendation: "Increase irrigation frequency",
      priority: "high",
      icon: "💧"
    },
    {
      condition: "Windy Conditions",
      recommendation: "Secure greenhouse covers and young plants",
      priority: "medium",
      icon: "💨"
    },
    {
      condition: "Rain Expected",
      recommendation: "Delay fertilizer application",
      priority: "low",
      icon: "🌧️"
    }
  ];

  const getWeatherIcon = (condition: string) => {
    const icons: { [key: string]: string } = {
      "Sunny": "☀️",
      "Partly Cloudy": "⛅",
      "Cloudy": "☁️",
      "Light Rain": "🌧️",
      "Heavy Rain": "⛈️",
      "Thunderstorm": "⛈️",
      "Snow": "❄️",
      "Fog": "🌫️"
    };
    return icons[condition] || "🌤️";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Cloud className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-farm-green">Weather Forecast</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get detailed weather forecasts, hourly updates, and farming-specific recommendations 
            to optimize your agricultural operations.
          </p>
        </div>

        {/* Location & Settings */}
        <div className="mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="location">Location</Label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New York">New York, NY</SelectItem>
                      <SelectItem value="Los Angeles">Los Angeles, CA</SelectItem>
                      <SelectItem value="Chicago">Chicago, IL</SelectItem>
                      <SelectItem value="Houston">Houston, TX</SelectItem>
                      <SelectItem value="Phoenix">Phoenix, AZ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="forecast-days">Forecast Days</Label>
                  <Select value={forecastDays.toString()} onValueChange={(value) => setForecastDays(parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 Days</SelectItem>
                      <SelectItem value="5">5 Days</SelectItem>
                      <SelectItem value="7">7 Days</SelectItem>
                      <SelectItem value="10">10 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button>
                    <MapPin className="h-4 w-4 mr-2" />
                    Use Current Location
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Weather */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Thermometer className="h-5 w-5" />
                Current Weather
              </CardTitle>
              <CardDescription>
                {selectedLocation} • {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-6xl mb-2">{weatherData.current.icon}</div>
                  <div className="text-4xl font-bold text-farm-green">
                    {weatherData.current.temp}°C
                  </div>
                  <p className="text-muted-foreground">{weatherData.current.condition}</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Thermometer className="h-4 w-4" />
                      Feels Like
                    </span>
                    <span className="font-medium">{weatherData.current.feelsLike}°C</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Droplets className="h-4 w-4" />
                      Humidity
                    </span>
                    <span className="font-medium">{weatherData.current.humidity}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Wind className="h-4 w-4" />
                      Wind Speed
                    </span>
                    <span className="font-medium">{weatherData.current.windSpeed} km/h</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Visibility
                    </span>
                    <span className="font-medium">{weatherData.current.visibility} km</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Sun className="h-4 w-4" />
                      UV Index
                    </span>
                    <span className="font-medium">{weatherData.current.uvIndex}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Sunrise
                    </span>
                    <span className="font-medium">6:23 AM</span>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">Farming Alert</div>
                  <Badge variant="secondary" className="mb-2">
                    Moderate UV Index
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    Consider shade protection for sensitive crops during peak hours
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Hourly Forecast */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Hourly Forecast</CardTitle>
              <CardDescription>Next 8 hours weather conditions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {weatherData.hourly.map((hour, index) => (
                  <div key={index} className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl mb-2">{hour.condition}</div>
                    <div className="text-xl font-bold text-farm-green">{hour.temp}°</div>
                    <div className="text-sm font-medium">{hour.time}</div>
                    <div className="text-xs text-muted-foreground">
                      {hour.humidity}% • {hour.wind} km/h
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Daily Forecast */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>7-Day Forecast</CardTitle>
              <CardDescription>Extended weather outlook</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weatherData.daily.map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{day.icon}</div>
                      <div>
                        <div className="font-medium">{day.day}</div>
                        <div className="text-sm text-muted-foreground">{day.condition}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-sm text-muted-foreground">Rain Chance</div>
                          <div className="font-medium">{day.rainChance}%</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-muted-foreground">High</div>
                          <div className="font-medium text-red-600">{day.high}°</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-muted-foreground">Low</div>
                          <div className="font-medium text-blue-600">{day.low}°</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Farming Recommendations */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5" />
                Farming Recommendations
              </CardTitle>
              <CardDescription>
                Weather-based suggestions for optimal farming operations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {farmingRecommendations.map((rec, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{rec.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{rec.condition}</h4>
                          <Badge 
                            variant={rec.priority === 'high' ? 'destructive' : 
                                   rec.priority === 'medium' ? 'secondary' : 'outline'}
                          >
                            {rec.priority} priority
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{rec.recommendation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weather Alerts */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Weather Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Moderate Weather Alert</h4>
                    <p className="text-sm text-yellow-700">
                      Light rain expected tomorrow. Consider adjusting irrigation schedules and 
                      protecting sensitive crops from excessive moisture.
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

export default WeatherForecast;
