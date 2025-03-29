import { Copy, CreditCard, DollarSign, ExternalLink, Gift, History, Share2, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export function UserProfile() {
  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-4 border-background">
            <AvatarImage src="/placeholder.svg" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">John Doe</h2>
            <p className="text-muted-foreground">Member since March 2025</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-2">
            <User className="h-4 w-4" />
            Edit Profile
          </Button>
          <Button className="gap-2">
            <DollarSign className="h-4 w-4" />
            Deposit Funds
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Available Balance</CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="text-3xl font-bold">$4,196.00</div>
            <p className="text-xs text-muted-foreground">Last deposit: $500.00 on Mar 14, 2025</p>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-2">
            <div className="flex w-full gap-2">
              <Button className="flex-1 gap-2">
                <DollarSign className="h-4 w-4" />
                Deposit
              </Button>
              <Button variant="outline" className="flex-1 gap-2">
                <CreditCard className="h-4 w-4" />
                Withdraw
              </Button>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Referral Program</CardTitle>
            <CardDescription>Invite friends and earn 5% of their deposits</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm">Total Referrals</span>
              <span className="font-medium">12 users</span>
            </div>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm">Earnings</span>
              <span className="font-medium">$350.00</span>
            </div>
            <div className="space-y-2">
              <Label htmlFor="referral-link">Your Referral Link</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="referral-link"
                  value="https://investdash.com/ref/johndoe"
                  readOnly
                  className="font-mono text-xs"
                />
                <Button variant="ghost" size="icon" className="shrink-0">
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy</span>
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full gap-2">
              <Share2 className="h-4 w-4" />
              Share Referral Link
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Rewards</CardTitle>
            <CardDescription>Your loyalty points and rewards</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm">Available Points</span>
              <span className="font-medium">1,250 pts</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-2 text-primary">
                    <Gift className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium">$25 Bonus</div>
                    <div className="text-xs text-muted-foreground">1,000 points</div>
                  </div>
                </div>
                <Button size="sm">Redeem</Button>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-2 text-primary">
                    <Gift className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium">Free Withdrawal</div>
                    <div className="text-xs text-muted-foreground">500 points</div>
                  </div>
                </div>
                <Button size="sm">Redeem</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>View all your deposits, withdrawals, and earnings</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="deposits">Deposits</TabsTrigger>
              <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4 pt-4">
              <div className="rounded-lg border">
                <div className="grid grid-cols-4 gap-4 p-4 text-sm font-medium text-muted-foreground md:grid-cols-5">
                  <div>Date</div>
                  <div>Type</div>
                  <div>Description</div>
                  <div className="text-right">Amount</div>
                  <div className="hidden md:block text-right">Status</div>
                </div>
                <Separator />
                <div className="divide-y">
                  <TransactionItem
                    date="Mar 14, 2025"
                    type="Deposit"
                    description="Bank Transfer"
                    amount="$2,500.00"
                    status="Completed"
                    isPositive={true}
                  />
                  <TransactionItem
                    date="Mar 10, 2025"
                    type="Withdrawal"
                    description="Bank Transfer"
                    amount="$1,200.00"
                    status="Completed"
                    isPositive={false}
                  />
                  <TransactionItem
                    date="Mar 5, 2025"
                    type="Deposit"
                    description="Credit Card"
                    amount="$3,750.00"
                    status="Completed"
                    isPositive={true}
                  />
                  <TransactionItem
                    date="Mar 1, 2025"
                    type="Earning"
                    description="Investment Return"
                    amount="$450.00"
                    status="Completed"
                    isPositive={true}
                  />
                  <TransactionItem
                    date="Feb 28, 2025"
                    type="Withdrawal"
                    description="Bank Transfer"
                    amount="$850.00"
                    status="Completed"
                    isPositive={false}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="deposits" className="space-y-4 pt-4">
              <div className="rounded-lg border">
                <div className="grid grid-cols-4 gap-4 p-4 text-sm font-medium text-muted-foreground md:grid-cols-5">
                  <div>Date</div>
                  <div>Type</div>
                  <div>Description</div>
                  <div className="text-right">Amount</div>
                  <div className="hidden md:block text-right">Status</div>
                </div>
                <Separator />
                <div className="divide-y">
                  <TransactionItem
                    date="Mar 14, 2025"
                    type="Deposit"
                    description="Bank Transfer"
                    amount="$2,500.00"
                    status="Completed"
                    isPositive={true}
                  />
                  <TransactionItem
                    date="Mar 5, 2025"
                    type="Deposit"
                    description="Credit Card"
                    amount="$3,750.00"
                    status="Completed"
                    isPositive={true}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="withdrawals" className="space-y-4 pt-4">
              <div className="rounded-lg border">
                <div className="grid grid-cols-4 gap-4 p-4 text-sm font-medium text-muted-foreground md:grid-cols-5">
                  <div>Date</div>
                  <div>Type</div>
                  <div>Description</div>
                  <div className="text-right">Amount</div>
                  <div className="hidden md:block text-right">Status</div>
                </div>
                <Separator />
                <div className="divide-y">
                  <TransactionItem
                    date="Mar 10, 2025"
                    type="Withdrawal"
                    description="Bank Transfer"
                    amount="$1,200.00"
                    status="Completed"
                    isPositive={false}
                  />
                  <TransactionItem
                    date="Feb 28, 2025"
                    type="Withdrawal"
                    description="Bank Transfer"
                    amount="$850.00"
                    status="Completed"
                    isPositive={false}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="earnings" className="space-y-4 pt-4">
              <div className="rounded-lg border">
                <div className="grid grid-cols-4 gap-4 p-4 text-sm font-medium text-muted-foreground md:grid-cols-5">
                  <div>Date</div>
                  <div>Type</div>
                  <div>Description</div>
                  <div className="text-right">Amount</div>
                  <div className="hidden md:block text-right">Status</div>
                </div>
                <Separator />
                <div className="divide-y">
                  <TransactionItem
                    date="Mar 1, 2025"
                    type="Earning"
                    description="Investment Return"
                    amount="$450.00"
                    status="Completed"
                    isPositive={true}
                  />
                  <TransactionItem
                    date="Feb 15, 2025"
                    type="Earning"
                    description="Referral Bonus"
                    amount="$125.00"
                    status="Completed"
                    isPositive={true}
                  />
                  <TransactionItem
                    date="Feb 1, 2025"
                    type="Earning"
                    description="Investment Return"
                    amount="$380.00"
                    status="Completed"
                    isPositive={true}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="outline" className="gap-2">
            <History className="h-4 w-4" />
            View All Transactions
            <ExternalLink className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

interface TransactionItemProps {
  date: string
  type: string
  description: string
  amount: string
  status: string
  isPositive: boolean
}

function TransactionItem({ date, type, description, amount, status, isPositive }: TransactionItemProps) {
  return (
    <div className="grid grid-cols-4 gap-4 p-4 text-sm md:grid-cols-5">
      <div>{date}</div>
      <div>{type}</div>
      <div>{description}</div>
      <div className={`text-right font-medium ${isPositive ? "text-green-500" : "text-red-500"}`}>
        {isPositive ? "+" : "-"}
        {amount}
      </div>
      <div className="hidden md:block text-right">
        <span className="rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500">{status}</span>
      </div>
    </div>
  )
}

