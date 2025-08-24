import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Share2, 
  Search, 
  Plus,
  TrendingUp,
  BookOpen,
  Calendar,
  MapPin,
  Star
} from "lucide-react";

const Community = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("discussions");

  const discussions = [
    {
      id: 1,
      author: "Sarah Johnson",
      avatar: "/avatars/sarah.jpg",
      title: "Best practices for organic tomato farming",
      content: "I've been growing organic tomatoes for 3 years now. Here are some key lessons I've learned about soil preparation, companion planting, and natural pest control...",
      tags: ["Organic", "Tomatoes", "Pest Control"],
      likes: 24,
      replies: 8,
      time: "2 hours ago",
      isPinned: true
    },
    {
      id: 2,
      author: "Mike Chen",
      avatar: "/avatars/mike.jpg",
      title: "Irrigation system recommendations for small farms",
      content: "Looking for advice on setting up an efficient irrigation system for my 5-acre vegetable farm. Currently using manual watering but want to automate...",
      tags: ["Irrigation", "Automation", "Small Farm"],
      likes: 15,
      replies: 12,
      time: "5 hours ago",
      isPinned: false
    },
    {
      id: 3,
      author: "Emma Rodriguez",
      avatar: "/avatars/emma.jpg",
      title: "Crop rotation strategies for sustainable farming",
      content: "I'm planning my crop rotation for next season and would love to hear from experienced farmers about their strategies. Currently growing corn, soybeans, and wheat...",
      tags: ["Crop Rotation", "Sustainability", "Planning"],
      likes: 31,
      replies: 15,
      time: "1 day ago",
      isPinned: false
    }
  ];

  const events = [
    {
      id: 1,
      title: "Local Farmers Market",
      date: "Aug 25, 2024",
      time: "8:00 AM - 2:00 PM",
      location: "Downtown Plaza",
      attendees: 45,
      type: "Market"
    },
    {
      id: 2,
      title: "Sustainable Farming Workshop",
      date: "Sep 2, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Community Center",
      attendees: 28,
      type: "Workshop"
    },
    {
      id: 3,
      title: "Harvest Festival",
      date: "Sep 15, 2024",
      time: "12:00 PM - 8:00 PM",
      location: "County Fairgrounds",
      attendees: 120,
      type: "Festival"
    }
  ];

  const resources = [
    {
      id: 1,
      title: "Complete Guide to Soil Testing",
      author: "Dr. Robert Wilson",
      type: "Guide",
      rating: 4.8,
      downloads: 156
    },
    {
      id: 2,
      title: "Pest Management Handbook",
      author: "Agricultural Extension",
      type: "Handbook",
      rating: 4.6,
      downloads: 89
    },
    {
      id: 3,
      title: "Financial Planning for Farmers",
      author: "Farm Credit Services",
      type: "Guide",
      rating: 4.9,
      downloads: 203
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-farm-green">Farmer Community</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with fellow farmers, share knowledge, and learn from the community. 
            Join discussions, attend events, and access valuable farming resources.
          </p>
        </div>

        {/* Search and Tabs */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search discussions, events, or resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="md:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Start Discussion
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
            {[
              { id: "discussions", label: "Discussions", icon: MessageCircle },
              { id: "events", label: "Events", icon: Calendar },
              { id: "resources", label: "Resources", icon: BookOpen }
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

        {/* Content based on active tab */}
        {activeTab === "discussions" && (
          <div className="space-y-6">
            {discussions.map((discussion) => (
              <Card key={discussion.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={discussion.avatar} />
                        <AvatarFallback>{discussion.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{discussion.author}</p>
                        <p className="text-sm text-muted-foreground">{discussion.time}</p>
                      </div>
                    </div>
                    {discussion.isPinned && (
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        Pinned
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{discussion.title}</CardTitle>
                  <CardDescription className="text-base">
                    {discussion.content}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        <Heart className="h-4 w-4" />
                        {discussion.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4" />
                        {discussion.replies}
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        <Share2 className="h-4 w-4" />
                        Share
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      {discussion.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "events" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card key={event.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{event.type}</Badge>
                    <div className="text-sm text-muted-foreground">
                      {event.attendees} attending
                    </div>
                  </div>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <CardDescription className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date} • {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Join Event</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "resources" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <Card key={resource.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{resource.type}</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{resource.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                  <CardDescription>
                    By {resource.author}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">
                      {resource.downloads} downloads
                    </span>
                  </div>
                  <Button className="w-full">Download</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Community Stats */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Community Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-farm-green">1,247</div>
                  <p className="text-sm text-muted-foreground">Active Members</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">89</div>
                  <p className="text-sm text-muted-foreground">Discussions</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600">156</div>
                  <p className="text-sm text-muted-foreground">Resources</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600">23</div>
                  <p className="text-sm text-muted-foreground">Events</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Community;
