import { Clock, DollarSign, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function InvestmentPlans() {
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Investment Plans</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline">Filter</Button>
          <Button variant="outline">Sort</Button>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-400 text-white">
            <CardTitle>Conservative Plan</CardTitle>
            <CardDescription className="text-blue-100">Low risk, stable returns</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                <span className="text-2xl font-bold">3-5% APY</span>
              </div>
              <Badge variant="outline" className="bg-blue-50">
                Low Risk
              </Badge>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Minimum Investment</span>
                  <span className="font-medium">$500</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium">6-12 months</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Withdrawal</span>
                  <span className="font-medium">Anytime (1% fee)</span>
                </div>
              </div>
              <div className="pt-2">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span>Portfolio Allocation</span>
                  <span className="font-medium">80% Bonds, 20% Stocks</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/50 px-6 py-4">
            <Button className="w-full">Invest Now</Button>
          </CardFooter>
        </Card>
        <Card className="overflow-hidden border-purple-200 shadow-md">
          <div className="absolute right-4 top-4 z-10">
            <Badge className="bg-purple-600 hover:bg-purple-700">Popular</Badge>
          </div>
          <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-400 text-white">
            <CardTitle>Balanced Growth</CardTitle>
            <CardDescription className="text-purple-100">Moderate risk, higher returns</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-500" />
                <span className="text-2xl font-bold">5-8% APY</span>
              </div>
              <Badge variant="outline" className="bg-purple-50">
                Medium Risk
              </Badge>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Minimum Investment</span>
                  <span className="font-medium">$1,000</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium">12-24 months</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Withdrawal</span>
                  <span className="font-medium">After 3 months</span>
                </div>
              </div>
              <div className="pt-2">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span>Portfolio Allocation</span>
                  <span className="font-medium">50% Bonds, 50% Stocks</span>
                </div>
                <Progress value={50} className="h-2" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/50 px-6 py-4">
            <Button className="w-full bg-purple-600 hover:bg-purple-700">Invest Now</Button>
          </CardFooter>
        </Card>
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-green-600 to-green-400 text-white">
            <CardTitle>Growth Portfolio</CardTitle>
            <CardDescription className="text-green-100">Higher risk, maximum returns</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <span className="text-2xl font-bold">8-12% APY</span>
              </div>
              <Badge variant="outline" className="bg-green-50">
                Higher Risk
              </Badge>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Minimum Investment</span>
                  <span className="font-medium">$2,500</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium">24-36 months</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Withdrawal</span>
                  <span className="font-medium">After 6 months</span>
                </div>
              </div>
              <div className="pt-2">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span>Portfolio Allocation</span>
                  <span className="font-medium">20% Bonds, 80% Stocks</span>
                </div>
                <Progress value={20} className="h-2" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/50 px-6 py-4">
            <Button className="w-full bg-green-600 hover:bg-green-700">Invest Now</Button>
          </CardFooter>
        </Card>
      </div>
      <div className="mt-6">
        <h3 className="mb-4 text-xl font-bold">Active Investments</h3>
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <h4 className="font-semibold">Balanced Growth Plan</h4>
                  <p className="text-sm text-muted-foreground">$2,000 invested on Feb 15, 2025</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">5 months remaining</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">$2,250 current value</span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span>58%</span>
                </div>
                <Progress value={58} className="h-2" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <h4 className="font-semibold">Conservative Plan</h4>
                  <p className="text-sm text-muted-foreground">$3,500 invested on Jan 10, 2025</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">3 months remaining</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">$3,600 current value</span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span>75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

