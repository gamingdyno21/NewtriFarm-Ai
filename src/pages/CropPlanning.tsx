import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Edit, 
  Trash2, 
  Sprout,
  Clock,
  MapPin,
  Leaf,
  TrendingUp,
  RotateCcw,
  AlertTriangle
} from "lucide-react";

const CropPlanning = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState("calendar");
  const [showAddTask, setShowAddTask] = useState(false);

  const crops = [
    { id: 1, name: "Tomatoes", variety: "Beefsteak", season: "Summer", duration: "80-100 days" },
    { id: 2, name: "Corn", variety: "Sweet Corn", season: "Spring", duration: "60-90 days" },
    { id: 3, name: "Lettuce", variety: "Romaine", season: "Spring/Fall", duration: "60-80 days" },
    { id: 4, name: "Carrots", variety: "Nantes", season: "Spring/Fall", duration: "70-80 days" },
    { id: 5, name: "Peppers", variety: "Bell", season: "Summer", duration: "60-90 days" }
  ];

  const tasks = [
    {
      id: 1,
      title: "Plant Tomato Seeds",
      crop: "Tomatoes",
      date: "2024-03-15",
      type: "planting",
      status: "completed",
      notes: "Start seeds indoors for early spring planting"
    },
    {
      id: 2,
      title: "Prepare Soil for Corn",
      crop: "Corn",
      date: "2024-03-20",
      type: "preparation",
      status: "pending",
      notes: "Till soil and add compost"
    },
    {
      id: 3,
      title: "Harvest Lettuce",
      crop: "Lettuce",
      date: "2024-04-15",
      type: "harvest",
      status: "pending",
      notes: "Harvest outer leaves for continuous growth"
    },
    {
      id: 4,
      title: "Fertilize Peppers",
      crop: "Peppers",
      date: "2024-04-10",
      type: "maintenance",
      status: "pending",
      notes: "Apply balanced fertilizer"
    }
  ];

  const cropRotation = [
    {
      year: 2024,
      season: "Spring",
      crops: ["Corn", "Beans", "Squash"],
      notes: "Three Sisters planting method"
    },
    {
      year: 2024,
      season: "Summer",
      crops: ["Tomatoes", "Peppers", "Eggplant"],
      notes: "Nightshade family rotation"
    },
    {
      year: 2024,
      season: "Fall",
      crops: ["Lettuce", "Spinach", "Kale"],
      notes: "Cool weather greens"
    },
    {
      year: 2025,
      season: "Spring",
      crops: ["Peas", "Carrots", "Onions"],
      notes: "Root vegetables and legumes"
    }
  ];

  const getTaskIcon = (type: string) => {
    switch (type) {
      case "planting": return "🌱";
      case "harvest": return "🌾";
      case "maintenance": return "🔧";
      case "preparation": return "⛏️";
      default: return "📋";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "overdue": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CalendarIcon className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-farm-green">Crop Planning & Calendar</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Plan your farming season with comprehensive crop scheduling, rotation planning, 
            and task management for optimal yields.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
            {[
              { id: "calendar", label: "Calendar", icon: CalendarIcon },
              { id: "crops", label: "Crop Library", icon: Sprout },
              { id: "rotation", label: "Crop Rotation", icon: RotateCcw },
              { id: "tasks", label: "Tasks", icon: Clock }
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2"
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Calendar View */}
        {activeTab === "calendar" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Farming Calendar</span>
                    <Button onClick={() => setShowAddTask(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Task
                    </Button>
                  </CardTitle>
                  <CardDescription>
                    Plan and track your farming activities throughout the year
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              {/* Upcoming Tasks */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Upcoming Tasks</CardTitle>
                  <CardDescription>Next 7 days of farming activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {tasks.filter(task => task.status === "pending").slice(0, 5).map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{getTaskIcon(task.type)}</div>
                          <div>
                            <p className="font-medium">{task.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {task.crop} • {task.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(task.status)}>
                            {task.status}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions & Stats */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Schedule Planting
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    View Season Plan
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Season Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Active Crops</span>
                      <Badge variant="secondary">12</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Pending Tasks</span>
                      <Badge variant="outline">8</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Completed</span>
                      <Badge variant="outline">15</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Days to Harvest</span>
                      <Badge variant="secondary">45</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Crop Library */}
        {activeTab === "crops" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Crop Library</span>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Crop
                  </Button>
                </CardTitle>
                <CardDescription>
                  Manage your crop varieties and growing information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {crops.map((crop) => (
                    <Card key={crop.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{crop.name}</CardTitle>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                        <CardDescription>{crop.variety}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4" />
                            <span className="text-sm">{crop.season}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm">{crop.duration}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Crop Rotation */}
        {activeTab === "rotation" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Crop Rotation Plan</span>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Rotation
                  </Button>
                </CardTitle>
                <CardDescription>
                  Plan crop rotations to maintain soil health and prevent pest buildup
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {cropRotation.map((rotation, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium">
                          {rotation.year} - {rotation.season}
                        </h3>
                        <Badge variant="outline">{rotation.crops.length} crops</Badge>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {rotation.crops.map((crop, cropIndex) => (
                          <Badge key={cropIndex} variant="secondary">
                            {crop}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">{rotation.notes}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Rotation Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>Benefits of Crop Rotation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Soil Health</h4>
                    <p className="text-sm text-green-700">
                      Different crops have different nutrient needs, helping maintain soil balance
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Pest Control</h4>
                    <p className="text-sm text-blue-700">
                      Breaking pest cycles by changing crop types each season
                    </p>
                  </div>
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <h4 className="font-medium text-purple-800 mb-2">Weed Management</h4>
                    <p className="text-sm text-purple-700">
                      Different crops compete with weeds in various ways
                    </p>
                  </div>
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <h4 className="font-medium text-orange-800 mb-2">Nutrient Efficiency</h4>
                    <p className="text-sm text-orange-700">
                      Optimizing fertilizer use through strategic crop sequencing
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tasks Management */}
        {activeTab === "tasks" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Task Management</span>
                  <Button onClick={() => setShowAddTask(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Task
                  </Button>
                </CardTitle>
                <CardDescription>
                  Track and manage all your farming tasks and activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">{getTaskIcon(task.type)}</div>
                        <div>
                          <h4 className="font-medium">{task.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {task.crop} • {task.date} • {task.notes}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(task.status)}>
                          {task.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Add Task Modal */}
        {showAddTask && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4">
              <CardHeader>
                <CardTitle>Add New Task</CardTitle>
                <CardDescription>Schedule a new farming activity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="task-title">Task Title</Label>
                  <Input id="task-title" placeholder="e.g., Plant Tomato Seeds" />
                </div>
                <div>
                  <Label htmlFor="crop">Crop</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select crop" />
                    </SelectTrigger>
                    <SelectContent>
                      {crops.map((crop) => (
                        <SelectItem key={crop.id} value={crop.name}>{crop.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="task-date">Date</Label>
                  <Input id="task-date" type="date" />
                </div>
                <div>
                  <Label htmlFor="task-notes">Notes</Label>
                  <Textarea id="task-notes" placeholder="Additional details..." />
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1" onClick={() => setShowAddTask(false)}>
                    Cancel
                  </Button>
                  <Button className="flex-1">
                    Add Task
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropPlanning;
