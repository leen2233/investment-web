import { ArrowUpRight, ArrowDownRight, Clock, DollarSign, LineChart, Wallet } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export function MainDashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$12,546.00</div>
          <p className="text-xs text-muted-foreground">+2.5% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Investments</CardTitle>
          <LineChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3</div>
          <p className="text-xs text-muted-foreground">$8,350 total value</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Deposits</CardTitle>
          <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$9,250.00</div>
          <p className="text-xs text-muted-foreground">+12.5% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Withdrawals</CardTitle>
          <ArrowDownRight className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$2,350.00</div>
          <p className="text-xs text-muted-foreground">+4.3% from last month</p>
        </CardContent>
      </Card>
      <Card className="col-span-full md:col-span-2">
        <CardHeader>
          <CardTitle>Profit Calculator</CardTitle>
          <CardDescription>Calculate potential returns based on your investment amount and duration.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="amount">Investment Amount</Label>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <Input id="amount" placeholder="1000" type="number" />
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="duration">Duration (months)</Label>
              <span className="text-sm text-muted-foreground">6 months</span>
            </div>
            <Slider defaultValue={[6]} max={24} step={1} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="plan">Investment Plan</Label>
            <Select defaultValue="balanced">
              <SelectTrigger id="plan">
                <SelectValue placeholder="Select plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="conservative">Conservative (3-5% APY)</SelectItem>
                <SelectItem value="balanced">Balanced (5-8% APY)</SelectItem>
                <SelectItem value="growth">Growth (8-12% APY)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="rounded-lg border bg-card p-3">
            <div className="text-sm font-medium">Estimated Return</div>
            <div className="mt-1 text-2xl font-bold">$1,350.00</div>
            <div className="text-xs text-muted-foreground">8% APY over 6 months</div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Calculate</Button>
        </CardFooter>
      </Card>
      <Card className="col-span-full md:col-span-2">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your recent deposits and withdrawals.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="deposits">Deposits</TabsTrigger>
              <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="rounded-full p-2 bg-green-500/20">
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Deposit</p>
                    <p className="text-xs text-muted-foreground">Mar 14, 2025</p>
                  </div>
                </div>
                <div className="text-sm font-medium text-green-500">+$2,500.00</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="rounded-full p-2 bg-blue-500/20">
                    <Clock className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Investment Started</p>
                    <p className="text-xs text-muted-foreground">Mar 14, 2025</p>
                  </div>
                </div>
                <div className="text-sm font-medium">$2,000.00</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="rounded-full p-2 bg-red-500/20">
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Withdrawal</p>
                    <p className="text-xs text-muted-foreground">Mar 10, 2025</p>
                  </div>
                </div>
                <div className="text-sm font-medium text-red-500">-$1,200.00</div>
              </div>
            </TabsContent>
            <TabsContent value="deposits" className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="rounded-full p-2 bg-green-500/20">
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Deposit</p>
                    <p className="text-xs text-muted-foreground">Mar 14, 2025</p>
                  </div>
                </div>
                <div className="text-sm font-medium text-green-500">+$2,500.00</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="rounded-full p-2 bg-green-500/20">
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Deposit</p>
                    <p className="text-xs text-muted-foreground">Mar 5, 2025</p>
                  </div>
                </div>
                <div className="text-sm font-medium text-green-500">+$3,750.00</div>
              </div>
            </TabsContent>
            <TabsContent value="withdrawals" className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="rounded-full p-2 bg-red-500/20">
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Withdrawal</p>
                    <p className="text-xs text-muted-foreground">Mar 10, 2025</p>
                  </div>
                </div>
                <div className="text-sm font-medium text-red-500">-$1,200.00</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="rounded-full p-2 bg-red-500/20">
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Withdrawal</p>
                    <p className="text-xs text-muted-foreground">Feb 28, 2025</p>
                  </div>
                </div>
                <div className="text-sm font-medium text-red-500">-$850.00</div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

