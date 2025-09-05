/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, ListFilter, Calendar, Eye } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type RideStatus = "Completed" | "Cancelled" | "In-Progress" | "Searching";

type Ride = {
  id: string;
  riderName: string;
  driverName: string;
  riderAvatarUrl?: string;
  driverAvatarUrl?: string;
  pickupLocation: string;
  dropoffLocation: string;
  fare: number;
  status: RideStatus;
  rideDate: string;
};

// Dummy data updated with avatar URLs
const dummyRides: Ride[] = [
  { id: 'ride_001', riderName: 'Rahima Begum', driverName: 'Karim Ahmed', riderAvatarUrl: 'https://i.pravatar.cc/150?u=rahima', driverAvatarUrl: 'https://i.pravatar.cc/150?u=karim', pickupLocation: 'Dhanmondi 32', dropoffLocation: 'Gulshan 1', fare: 250, status: 'Completed', rideDate: '2023-08-15' },
  { id: 'ride_002', riderName: 'Sadia Islam', driverName: 'Asif Mahmud', riderAvatarUrl: 'https://i.pravatar.cc/150?u=sadia', driverAvatarUrl: 'https://i.pravatar.cc/150?u=asif', pickupLocation: 'Mirpur 10', dropoffLocation: 'Uttara Sector 12', fare: 350, status: 'Completed', rideDate: '2023-08-15' },
  { id: 'ride_003', riderName: 'Nusrat Jahan', driverName: 'Fahim Hasan', riderAvatarUrl: 'https://i.pravatar.cc/150?u=nusrat', driverAvatarUrl: 'https://i.pravatar.cc/150?u=fahim', pickupLocation: 'Banani', dropoffLocation: 'Mohakhali', fare: 150, status: 'In-Progress', rideDate: '2023-08-16' },
  { id: 'ride_004', riderName: 'Fahim Hasan', driverName: 'Jamil Chowdhury', riderAvatarUrl: 'https://i.pravatar.cc/150?u=fahim', driverAvatarUrl: 'https://i.pravatar.cc/150?u=jamil', pickupLocation: 'Bashundhara R/A', dropoffLocation: 'Baridhara DOHS', fare: 180, status: 'Cancelled', rideDate: '2023-08-16' },
  { id: 'ride_005', riderName: 'Asif Mahmud', driverName: 'Karim Ahmed', riderAvatarUrl: 'https://i.pravatar.cc/150?u=asif', driverAvatarUrl: 'https://i.pravatar.cc/150?u=karim', pickupLocation: 'Motijheel', dropoffLocation: 'Lalbagh Fort', fare: 220, status: 'Completed', rideDate: '2023-08-17' },
  { id: 'ride_006', riderName: 'Rahima Begum', driverName: 'Asif Mahmud', riderAvatarUrl: 'https://i.pravatar.cc/150?u=rahima', driverAvatarUrl: 'https://i.pravatar.cc/150?u=asif', pickupLocation: 'Farmgate', dropoffLocation: 'New Market', fare: 120, status: 'Searching', rideDate: '2023-08-18' },
];

const ManageRides = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<RideStatus | "ALL">("ALL");
    const [dateFilter, setDateFilter] = useState("");

    const filteredRides = useMemo(() => {
        return dummyRides
            .filter(ride => (statusFilter === "ALL" ? true : ride.status === statusFilter))
            .filter(ride => (dateFilter === "" ? true : ride.rideDate === dateFilter))
            .filter(ride => 
                ride.riderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ride.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ride.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ride.dropoffLocation.toLowerCase().includes(searchTerm.toLowerCase())
            );
    }, [searchTerm, statusFilter, dateFilter]);
    

    const handleViewDetails = (rideId: string) => {
        console.log(`Viewing details for ride ${rideId}`);
    };

    return (
        <div className="p-6 bg-slate-50 min-h-full">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Ride Oversight</h1>
            
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="relative w-full md:max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input 
                            placeholder="Search by user, location..." 
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                         <div className="relative">
                             <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                             <Input 
                                type="date"
                                className="pl-10"
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                            />
                         </div>
                        <FilterDropdown
                            label="Status"
                            options={["ALL", "Completed", "Cancelled", "In-Progress", "Searching"]}
                            selectedValue={statusFilter}
                            onValueChange={(value: any) => setStatusFilter(value as RideStatus | "ALL")}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50">
                            <TableHead>Rider & Driver</TableHead>
                            <TableHead>Trip Details</TableHead>
                            <TableHead>Fare</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredRides.map((ride) => (
                           <TableRow key={ride.id}>
                                <TableCell>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9">
                                                <AvatarImage src={ride.riderAvatarUrl} alt={ride.riderName} />
                                                <AvatarFallback>{ride.riderName.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-semibold">{ride.riderName}</p>
                                                <p className="text-xs text-gray-500">Rider</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9">
                                                <AvatarImage src={ride.driverAvatarUrl} alt={ride.driverName} />
                                                <AvatarFallback>{ride.driverName.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-semibold">{ride.driverName}</p>
                                                <p className="text-xs text-gray-500">Driver</p>
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div>
                                        <p className="font-medium text-gray-700">{ride.pickupLocation}</p>
                                        <p className="text-sm text-gray-500">to {ride.dropoffLocation}</p>
                                    </div>
                                </TableCell>
                                <TableCell>৳{ride.fare}</TableCell>
                                <TableCell>{new Date(ride.rideDate).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Badge variant={
                                        ride.status === 'Completed' ? 'default' :
                                        ride.status === 'In-Progress' ? 'secondary' :
                                        ride.status === 'Searching' ? 'outline' :
                                        'destructive'
                                    }>{ride.status}</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" onClick={() => handleViewDetails(ride.id)}>
                                        <Eye className="h-5 w-5 text-gray-600" />
                                    </Button>
                                </TableCell>
                           </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

const FilterDropdown = ({ label, options, selectedValue, onValueChange }: any) => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
                <ListFilter size={16}/>
                <span>{label}: <span className="font-semibold">{selectedValue}</span></span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            {options.map((option: string) => (
                 <DropdownMenuCheckboxItem
                    key={option}
                    checked={selectedValue === option}
                    onCheckedChange={() => onValueChange(option)}
                 >
                    {option}
                 </DropdownMenuCheckboxItem>
            ))}
        </DropdownMenuContent>
    </DropdownMenu>
);

export default ManageRides;

