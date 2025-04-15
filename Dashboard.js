
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHead, TableRow, TableHeader, TableCell, TableBody } from "@/components/ui/table";
import { Select, SelectTrigger, SelectItem, SelectContent } from "@/components/ui/select";
import { BellIcon } from "lucide-react";

const mockTechnicians = ["John M.", "Asha K.", "Michael T."];
const mockServices = [
  { id: "SR045", facility: "Kilimanjaro Health Center", device: "Oxygen Concentrator", status: "Pending", technician: "" },
  { id: "SR046", facility: "Mbeya Clinic", device: "Autoclave", status: "Pending", technician: "" },
];

export default function Dashboard() {
  const [services, setServices] = useState(mockServices);
  const [search, setSearch] = useState("");

  const assignTechnician = (id, tech) => {
    const updated = services.map(s =>
      s.id === id ? { ...s, technician: tech, status: "In Progress" } : s
    );
    setServices(updated);
    alert(`Notification sent to ${tech} for task ${id}`);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center text-green-700">Ubuntu CareLink Dashboard</h1>
      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="flex justify-center gap-4">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="services">Repairs</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <Card>
            <CardContent className="pt-4">
              <h2 className="text-xl font-semibold mb-2">Recent Orders</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Facility</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>#0123</TableCell>
                    <TableCell>Morogoro District Hospital</TableCell>
                    <TableCell>Face Masks, Syringes</TableCell>
                    <TableCell>Pending</TableCell>
                    <TableCell><Button size="sm">Mark as Shipped</Button></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Service Requests</h2>
                <Input
                  type="text"
                  placeholder="Search by facility or device"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-1/3"
                />
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request ID</TableHead>
                    <TableHead>Facility</TableHead>
                    <TableHead>Device</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Technician</TableHead>
                    <TableHead>Assign</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services
                    .filter(s =>
                      s.facility.toLowerCase().includes(search.toLowerCase()) ||
                      s.device.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((s) => (
                      <TableRow key={s.id}>
                        <TableCell>{s.id}</TableCell>
                        <TableCell>{s.facility}</TableCell>
                        <TableCell>{s.device}</TableCell>
                        <TableCell>{s.status}</TableCell>
                        <TableCell>{s.technician || "Unassigned"}</TableCell>
                        <TableCell>
                          <Select onValueChange={(tech) => assignTechnician(s.id, tech)}>
                            <SelectTrigger className="w-32">Assign</SelectTrigger>
                            <SelectContent>
                              {mockTechnicians.map((tech) => (
                                <SelectItem key={tech} value={tech}>{tech}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory">
          <Card>
            <CardContent className="pt-4">
              <h2 className="text-xl font-semibold mb-2">Inventory Tracker</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Reorder Level</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Pulse Oximeters</TableCell>
                    <TableCell>120</TableCell>
                    <TableCell>50</TableCell>
                    <TableCell>In Stock</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Oxygen Valves</TableCell>
                    <TableCell>15</TableCell>
                    <TableCell>20</TableCell>
                    <TableCell className="text-red-600">Low Stock</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
