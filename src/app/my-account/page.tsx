import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";

export default function UserDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold">My Account</h1>
          <p className="text-muted-foreground">Welcome back, John Doe</p>
        </div>
        <button className="btn-primary">Upgrade Plan</button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">842 / 1000</p>
            <div className="mt-2 h-2.5 w-full rounded-full bg-muted">
              <div
                className="h-2.5 rounded-full bg-primary"
                style={{ width: "84.2%" }}
              ></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">12</p>
            <p className="mt-2 text-sm text-success">↑ 4 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Storage</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">3.2 GB</p>
            <p className="mt-2 text-sm text-muted-foreground">of 5 GB limit</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Subscription */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                action: "Project created",
                name: "Marketing Campaign",
                time: "2 hours ago",
              },
              {
                action: "File uploaded",
                name: "Q4 Report.pdf",
                time: "5 hours ago",
              },
              {
                action: "Comment added",
                name: "Design Review",
                time: "Yesterday",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b py-2"
              >
                <div>
                  <p className="font-medium">{item.action}</p>
                  <p className="text-sm text-muted-foreground">{item.name}</p>
                </div>
                <span className="text-sm text-muted-foreground">
                  {item.time}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscription Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-primary/10 p-4">
              <p className="font-medium">Pro Plan</p>
              <p className="text-sm text-muted-foreground">$29/month</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Next billing date</span>
                <span>Dec 1, 2023</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment method</span>
                <span>•••• 4242</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
