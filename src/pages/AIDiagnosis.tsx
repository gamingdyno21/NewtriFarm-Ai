import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Upload, 
  Camera, 
  Leaf, 
  AlertTriangle, 
  CheckCircle, 
  Info,
  Bot,
  Sparkles
} from "lucide-react";

const AIDiagnosis = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleAnalysis = () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysis({
        cropType: "Tomato",
        healthScore: 85,
        issues: [
          { type: "warning", message: "Slight yellowing on lower leaves", severity: "Low" },
          { type: "info", message: "Optimal soil moisture detected", severity: "Good" }
        ],
        recommendations: [
          "Consider adding nitrogen-rich fertilizer",
          "Maintain current irrigation schedule",
          "Monitor for pest activity in next 3-5 days"
        ],
        nextSteps: [
          "Apply balanced fertilizer (NPK 10-10-10)",
          "Check soil pH levels",
          "Schedule follow-up inspection in 1 week"
        ]
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Bot className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-farm-green">AI Crop Diagnosis</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Upload images of your crops and get instant AI-powered analysis, health assessments, 
            and personalized recommendations for optimal growth.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Upload Crop Images
                </CardTitle>
                <CardDescription>
                  Take a photo or upload an image of your crop for AI analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  {selectedFile ? (
                    <div className="space-y-4">
                      <div className="w-32 h-32 mx-auto bg-muted rounded-lg flex items-center justify-center">
                        <img 
                          src={URL.createObjectURL(selectedFile)} 
                          alt="Preview" 
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <p className="font-medium">{selectedFile.name}</p>
                      <Button 
                        variant="outline" 
                        onClick={() => setSelectedFile(null)}
                        size="sm"
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                      <div>
                        <p className="font-medium">Click to upload or drag and drop</p>
                        <p className="text-sm text-muted-foreground">
                          PNG, JPG, JPEG up to 10MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="crop-type">Crop Type (Optional)</Label>
                    <Input 
                      id="crop-type" 
                      placeholder="e.g., Tomato, Corn, Wheat"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea 
                      id="notes" 
                      placeholder="Describe any symptoms, recent changes, or concerns..."
                      className="mt-1"
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      onClick={() => document.getElementById('file-upload')?.click()}
                      className="flex-1"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Choose File
                    </Button>
                    <Button 
                      onClick={handleAnalysis}
                      disabled={!selectedFile || isAnalyzing}
                      className="flex-1"
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4 mr-2" />
                          Analyze with AI
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Tips for Better Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    Take photos in good lighting conditions
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    Include both healthy and affected areas
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    Capture close-up shots of specific symptoms
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    Ensure images are clear and in focus
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Analysis Results */}
          <div className="space-y-6">
            {analysis ? (
              <>
                {/* Health Score */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Leaf className="h-5 w-5" />
                      Overall Health Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-farm-green mb-2">
                        {analysis.healthScore}%
                      </div>
                      <div className="w-full bg-muted rounded-full h-3">
                        <div 
                          className="bg-farm-green h-3 rounded-full transition-all duration-500"
                          style={{ width: `${analysis.healthScore}%` }}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        {analysis.healthScore >= 80 ? "Excellent" : 
                         analysis.healthScore >= 60 ? "Good" : 
                         analysis.healthScore >= 40 ? "Fair" : "Poor"} condition
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Issues Detected */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      Issues Detected
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysis.issues.map((issue: any, index: number) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                          <div className={`w-2 h-2 rounded-full ${
                            issue.type === 'warning' ? 'bg-yellow-500' :
                            issue.type === 'info' ? 'bg-blue-500' : 'bg-green-500'
                          }`} />
                          <div className="flex-1">
                            <p className="font-medium">{issue.message}</p>
                            <p className="text-sm text-muted-foreground">Severity: {issue.severity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      AI Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysis.recommendations.map((rec: string, index: number) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <p className="text-sm">{rec}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Next Steps */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recommended Next Steps</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysis.nextSteps.map((step: string, index: number) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                          <p className="text-sm">{step}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Analysis Results</CardTitle>
                  <CardDescription>
                    Upload an image and run AI analysis to see results here
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No analysis results yet</p>
                    <p className="text-sm">Upload a crop image to get started</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIDiagnosis;
