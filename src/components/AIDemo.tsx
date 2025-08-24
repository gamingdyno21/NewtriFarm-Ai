import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Camera, Brain, CheckCircle, AlertTriangle, TrendingUp } from "lucide-react";

const AIDemo = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 3000);
  };

  const resetDemo = () => {
    setShowResults(false);
    setIsAnalyzing(false);
  };

  return (
    <section className="py-24" id="diagnosis">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="text-farm-green">AI Crop Diagnosis</span> Demo
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience how our AI instantly diagnoses crop issues from photos
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <Card className="p-6">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Camera className="h-5 w-5 text-primary" />
                  Upload Crop Photo
                </CardTitle>
                <CardDescription>
                  Take or upload a photo of your crop for AI analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Upload className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Drop your crop photo here</p>
                    <p className="text-sm text-muted-foreground">or browse to upload</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    variant="success" 
                    className="flex-1" 
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <>
                        <Brain className="h-4 w-4 animate-pulse" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Brain className="h-4 w-4" />
                        Analyze with AI
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={resetDemo}>
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  AI Analysis Results
                </CardTitle>
                <CardDescription>
                  Instant diagnosis and recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!showResults && !isAnalyzing && (
                  <div className="text-center py-12 text-muted-foreground">
                    Upload a crop photo to see AI analysis results
                  </div>
                )}

                {isAnalyzing && (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <Brain className="h-8 w-8 text-primary animate-pulse" />
                    </div>
                    <div>
                      <p className="font-medium">AI is analyzing your crop...</p>
                      <p className="text-sm text-muted-foreground">This usually takes 2-3 seconds</p>
                    </div>
                  </div>
                )}

                {showResults && (
                  <div className="space-y-4">
                    {/* Diagnosis */}
                    <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                        <span className="font-semibold text-destructive">Nitrogen Deficiency Detected</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Lower leaves showing yellowing patterns typical of nitrogen deficiency
                      </p>
                    </div>

                    {/* Confidence */}
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Confidence Score</span>
                        <span className="font-bold text-primary">94%</span>
                      </div>
                      <div className="w-full bg-primary/20 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '94%' }}></div>
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-leaf-green" />
                        Recommended Actions
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-primary rounded-full mt-2"></div>
                          Apply 40kg/acre of Urea fertilizer
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-primary rounded-full mt-2"></div>
                          Follow up with liquid nitrogen spray
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-primary rounded-full mt-2"></div>
                          Expected recovery in 7-10 days
                        </li>
                      </ul>
                    </div>

                    {/* ROI Estimate */}
                    <div className="p-4 bg-crop-gold/10 rounded-lg border border-accent/20">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-accent" />
                        <span className="font-semibold">ROI Estimate</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Treatment Cost:</span>
                          <div className="font-semibold">₹1,200</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Expected Gain:</span>
                          <div className="font-semibold text-leaf-green">₹8,500</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIDemo;