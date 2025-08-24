import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  Package, 
  Truck, 
  Users,
  BarChart3,
  PieChart,
  Target
} from "lucide-react";

const ROICalculator = () => {
  const [formData, setFormData] = useState({
    cropType: "",
    acreage: "",
    seedCost: "",
    fertilizerCost: "",
    laborCost: "",
    irrigationCost: "",
    pestControlCost: "",
    expectedYield: "",
    marketPrice: "",
    additionalCosts: ""
  });

  const [results, setResults] = useState<any>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateROI = () => {
    const costs = {
      seed: parseFloat(formData.seedCost) || 0,
      fertilizer: parseFloat(formData.fertilizerCost) || 0,
      labor: parseFloat(formData.laborCost) || 0,
      irrigation: parseFloat(formData.irrigationCost) || 0,
      pestControl: parseFloat(formData.pestControlCost) || 0,
      additional: parseFloat(formData.additionalCosts) || 0
    };

    const totalCosts = Object.values(costs).reduce((sum, cost) => sum + cost, 0);
    const expectedYield = parseFloat(formData.expectedYield) || 0;
    const marketPrice = parseFloat(formData.marketPrice) || 0;
    const totalRevenue = expectedYield * marketPrice;
    const netProfit = totalRevenue - totalCosts;
    const roi = totalCosts > 0 ? ((netProfit / totalCosts) * 100) : 0;
    const profitMargin = totalRevenue > 0 ? ((netProfit / totalRevenue) * 100) : 0;

    setResults({
      totalCosts,
      totalRevenue,
      netProfit,
      roi,
      profitMargin,
      costs
    });
  };

  const cropTypes = [
    "Corn", "Soybeans", "Wheat", "Cotton", "Rice", "Tomatoes", 
    "Lettuce", "Carrots", "Potatoes", "Onions", "Peppers", "Cucumbers"
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-farm-green">ROI Calculator</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Calculate your farming investment returns, analyze costs, and plan for profitable harvests 
            with our comprehensive ROI calculator.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Crop Information
                </CardTitle>
                <CardDescription>
                  Enter your crop details and expected yields
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="crop-type">Crop Type</Label>
                    <Select value={formData.cropType} onValueChange={(value) => handleInputChange('cropType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select crop" />
                      </SelectTrigger>
                      <SelectContent>
                        {cropTypes.map((crop) => (
                          <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="acreage">Acreage</Label>
                    <Input
                      id="acreage"
                      type="number"
                      placeholder="0.0"
                      value={formData.acreage}
                      onChange={(e) => handleInputChange('acreage', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expected-yield">Expected Yield (tons)</Label>
                    <Input
                      id="expected-yield"
                      type="number"
                      placeholder="0.0"
                      value={formData.expectedYield}
                      onChange={(e) => handleInputChange('expectedYield', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="market-price">Market Price ($/ton)</Label>
                    <Input
                      id="market-price"
                      type="number"
                      placeholder="0.00"
                      value={formData.marketPrice}
                      onChange={(e) => handleInputChange('marketPrice', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Cost Breakdown
                </CardTitle>
                <CardDescription>
                  Input your farming costs per acre
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="seed-cost">Seed Cost ($/acre)</Label>
                    <Input
                      id="seed-cost"
                      type="number"
                      placeholder="0.00"
                      value={formData.seedCost}
                      onChange={(e) => handleInputChange('seedCost', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="fertilizer-cost">Fertilizer ($/acre)</Label>
                    <Input
                      id="fertilizer-cost"
                      type="number"
                      placeholder="0.00"
                      value={formData.fertilizerCost}
                      onChange={(e) => handleInputChange('fertilizerCost', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="labor-cost">Labor ($/acre)</Label>
                    <Input
                      id="labor-cost"
                      type="number"
                      placeholder="0.00"
                      value={formData.laborCost}
                      onChange={(e) => handleInputChange('laborCost', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="irrigation-cost">Irrigation ($/acre)</Label>
                    <Input
                      id="irrigation-cost"
                      type="number"
                      placeholder="0.00"
                      value={formData.irrigationCost}
                      onChange={(e) => handleInputChange('irrigationCost', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pest-control-cost">Pest Control ($/acre)</Label>
                    <Input
                      id="pest-control-cost"
                      type="number"
                      placeholder="0.00"
                      value={formData.pestControlCost}
                      onChange={(e) => handleInputChange('pestControlCost', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="additional-costs">Additional ($/acre)</Label>
                    <Input
                      id="additional-costs"
                      type="number"
                      placeholder="0.00"
                      value={formData.additionalCosts}
                      onChange={(e) => handleInputChange('additionalCosts', e.target.value)}
                    />
                  </div>
                </div>

                <Button 
                  onClick={calculateROI} 
                  className="w-full"
                  disabled={!formData.cropType || !formData.acreage}
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate ROI
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {results ? (
              <>
                {/* Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Financial Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <p className="text-sm text-muted-foreground">Total Revenue</p>
                          <p className="text-2xl font-bold text-green-600">
                            ${results.totalRevenue.toLocaleString()}
                          </p>
                        </div>
                        <div className="text-center p-4 bg-red-50 rounded-lg">
                          <p className="text-sm text-muted-foreground">Total Costs</p>
                          <p className="text-2xl font-bold text-red-600">
                            ${results.totalCosts.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-muted-foreground">Net Profit</p>
                        <p className={`text-3xl font-bold ${results.netProfit >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                          ${results.netProfit.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* ROI Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      ROI Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-muted-foreground">Return on Investment</p>
                        <p className={`text-3xl font-bold ${results.roi >= 0 ? 'text-purple-600' : 'text-red-600'}`}>
                          {results.roi.toFixed(1)}%
                        </p>
                      </div>
                      
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <p className="text-sm text-muted-foreground">Profit Margin</p>
                        <p className={`text-2xl font-bold ${results.profitMargin >= 0 ? 'text-orange-600' : 'text-red-600'}`}>
                          {results.profitMargin.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Cost Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5" />
                      Cost Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(results.costs).map(([costType, amount]) => (
                        <div key={costType} className="flex items-center justify-between">
                          <span className="capitalize">{costType.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="font-medium">${(amount as number).toLocaleString()}</span>
                        </div>
                      ))}
                      <div className="border-t pt-2 mt-3">
                        <div className="flex items-center justify-between font-semibold">
                          <span>Total Costs</span>
                          <span>${results.totalCosts.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Insights & Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {results.roi >= 20 ? (
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-sm text-green-800">
                            🎉 Excellent ROI! This crop shows strong profit potential.
                          </p>
                        </div>
                      ) : results.roi >= 10 ? (
                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <p className="text-sm text-yellow-800">
                            ⚠️ Moderate ROI. Consider optimizing costs or exploring higher-yield varieties.
                          </p>
                        </div>
                      ) : (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-sm text-red-800">
                            ❌ Low ROI. Review costs and consider alternative crops or farming methods.
                          </p>
                        </div>
                      )}
                      
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">
                          💡 Tip: Consider crop rotation and bulk purchasing to reduce input costs.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>ROI Results</CardTitle>
                  <CardDescription>
                    Fill out the form and calculate to see your ROI analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No calculations yet</p>
                    <p className="text-sm">Enter your farming data to get started</p>
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

export default ROICalculator;
