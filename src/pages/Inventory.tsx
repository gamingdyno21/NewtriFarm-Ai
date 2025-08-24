import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Package, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Filter,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Package2,
  Sprout,
  Wrench,
  Droplets,
  Calendar,
  BarChart3
} from "lucide-react";

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddItem, setShowAddItem] = useState(false);

  const inventoryItems = [
    {
      id: 1,
      name: "Tomato Seeds - Beefsteak",
      category: "Seeds",
      quantity: 150,
      unit: "packets",
      minStock: 20,
      currentStock: 15,
      supplier: "Seed Co.",
      cost: 2.99,
      location: "Storage A",
      expiryDate: "2025-12-31",
      status: "low"
    },
    {
      id: 2,
      name: "NPK Fertilizer 10-10-10",
      category: "Fertilizers",
      quantity: 500,
      unit: "lbs",
      minStock: 100,
      currentStock: 450,
      supplier: "Agro Supply",
      cost: 0.85,
      location: "Storage B",
      expiryDate: "2026-06-30",
      status: "good"
    },
    {
      id: 3,
      name: "Garden Hose 100ft",
      category: "Equipment",
      quantity: 5,
      unit: "pieces",
      minStock: 2,
      currentStock: 3,
      supplier: "Farm Tools Inc",
      cost: 45.99,
      location: "Equipment Shed",
      expiryDate: "N/A",
      status: "good"
    },
    {
      id: 4,
      name: "Organic Pesticide",
      category: "Pest Control",
      quantity: 25,
      unit: "gallons",
      minStock: 10,
      currentStock: 8,
      supplier: "Eco Solutions",
      cost: 15.50,
      location: "Storage C",
      expiryDate: "2024-09-30",
      status: "low"
    },
    {
      id: 5,
      name: "Potting Soil Mix",
      category: "Soil & Media",
      quantity: 200,
      unit: "bags",
      minStock: 50,
      currentStock: 180,
      supplier: "Soil Plus",
      cost: 8.99,
      location: "Storage A",
      expiryDate: "2025-03-31",
      status: "good"
    }
  ];

  const categories = [
    { id: "seeds", name: "Seeds", icon: Sprout, count: 12 },
    { id: "fertilizers", name: "Fertilizers", icon: Droplets, count: 8 },
    { id: "equipment", name: "Equipment", icon: Wrench, count: 15 },
    { id: "pest-control", name: "Pest Control", icon: Package2, count: 6 },
    { id: "soil-media", name: "Soil & Media", icon: Package, count: 10 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "low": return "bg-red-100 text-red-800";
      case "good": return "bg-green-100 text-green-800";
      case "expired": return "bg-gray-100 text-gray-800";
      default: return "bg-yellow-100 text-yellow-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "low": return "Low Stock";
      case "good": return "Good Stock";
      case "expired": return "Expired";
      default: return "Warning";
    }
  };

  const totalValue = inventoryItems.reduce((sum, item) => sum + (item.cost * item.currentStock), 0);
  const lowStockItems = inventoryItems.filter(item => item.status === "low");
  const expiringItems = inventoryItems.filter(item => {
    if (item.expiryDate === "N/A") return false;
    const expiryDate = new Date(item.expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Package className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-farm-green">Inventory Management</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Track and manage your farming supplies, equipment, and materials with 
            real-time inventory monitoring and automated alerts.
          </p>
        </div>

        {/* Search and Actions */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search inventory items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={() => setShowAddItem(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
            {[
              { id: "overview", label: "Overview", icon: Package },
              { id: "items", label: "All Items", icon: Package2 },
              { id: "alerts", label: "Alerts", icon: AlertTriangle },
              { id: "reports", label: "Reports", icon: TrendingUp }
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

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Items</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{inventoryItems.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Unique inventory items
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    Current inventory value
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{lowStockItems.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Items need reordering
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
                  <TrendingDown className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{expiringItems.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Within 30 days
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Inventory by Category</CardTitle>
                <CardDescription>Overview of items across different categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map((category) => (
                    <div key={category.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-muted rounded-lg">
                          <category.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-medium">{category.name}</h4>
                          <p className="text-sm text-muted-foreground">{category.count} items</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest inventory changes and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { action: "Stock updated", item: "Tomato Seeds", time: "2 hours ago", type: "update" },
                    { action: "New item added", item: "Organic Pesticide", time: "1 day ago", type: "add" },
                    { action: "Low stock alert", item: "NPK Fertilizer", time: "2 days ago", type: "alert" },
                    { action: "Item removed", item: "Old Garden Hose", time: "3 days ago", type: "remove" }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'add' ? 'bg-green-500' :
                          activity.type === 'remove' ? 'bg-red-500' :
                          activity.type === 'alert' ? 'bg-yellow-500' : 'bg-blue-500'
                        }`} />
                        <div>
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">{activity.item}</p>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* All Items Tab */}
        {activeTab === "items" && (
          <Card>
            <CardHeader>
              <CardTitle>All Inventory Items</CardTitle>
              <CardDescription>Complete list of all inventory items</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inventoryItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">📦</div>
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.category} • {item.supplier} • {item.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-medium">
                          {item.currentStock} / {item.quantity} {item.unit}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          ${item.cost} per {item.unit}
                        </div>
                      </div>
                      <Badge className={getStatusColor(item.status)}>
                        {getStatusText(item.status)}
                      </Badge>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Alerts Tab */}
        {activeTab === "alerts" && (
          <div className="space-y-6">
            {/* Low Stock Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Low Stock Alerts
                </CardTitle>
                <CardDescription>Items that need immediate reordering</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {lowStockItems.map((item) => (
                    <div key={item.id} className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-red-800">{item.name}</h4>
                          <p className="text-sm text-red-700">
                            Current: {item.currentStock} {item.unit} • Min: {item.minStock} {item.unit}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Reorder
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Expiring Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="h-5 w-5 text-yellow-500" />
                  Expiring Soon
                </CardTitle>
                <CardDescription>Items expiring within 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {expiringItems.map((item) => (
                    <div key={item.id} className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-yellow-800">{item.name}</h4>
                          <p className="text-sm text-yellow-700">
                            Expires: {item.expiryDate} • Location: {item.location}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Use First
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === "reports" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Reports</CardTitle>
                <CardDescription>Generate and view inventory reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <TrendingUp className="h-6 w-6" />
                    Stock Value Report
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Package className="h-6 w-6" />
                    Low Stock Report
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Calendar className="h-6 w-6" />
                    Expiry Report
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <BarChart3 className="h-6 w-6" />
                    Category Analysis
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Add Item Modal */}
        {showAddItem && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4">
              <CardHeader>
                <CardTitle>Add New Item</CardTitle>
                <CardDescription>Add a new item to your inventory</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="item-name">Item Name</Label>
                  <Input id="item-name" placeholder="e.g., Tomato Seeds" />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input id="quantity" type="number" placeholder="0" />
                  </div>
                  <div>
                    <Label htmlFor="unit">Unit</Label>
                    <Input id="unit" placeholder="e.g., packets" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="cost">Cost per Unit</Label>
                  <Input id="cost" type="number" step="0.01" placeholder="0.00" />
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1" variant="outline" onClick={() => setShowAddItem(false)}>
                    Cancel
                  </Button>
                  <Button className="flex-1">
                    Add Item
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

export default Inventory;
