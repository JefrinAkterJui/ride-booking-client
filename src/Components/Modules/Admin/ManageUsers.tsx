/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Search, UserX, UserCheck, ShieldOff, ShieldCheck, ListFilter } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type UserRole = "RIDER" | "DRIVER";
type UserStatus = "Active" | "Blocked" | "Pending" | "Suspended";

type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
};

const dummyUsers: User[] = [
  { id: 'usr_001', name: 'Karim Ahmed', email: 'karim.a@example.com', role: 'DRIVER', status: 'Active', createdAt: '2023-01-15' },
  { id: 'usr_002', name: 'Rahima Begum', email: 'rahima.b@example.com', role: 'RIDER', status: 'Active', createdAt: '2023-02-20' },
  { id: 'usr_003', name: 'Fahim Hasan', email: 'fahim.h@example.com', role: 'DRIVER', status: 'Pending', createdAt: '2023-03-10' },
  { id: 'usr_004', name: 'Sadia Islam', email: 'sadia.i@example.com', role: 'RIDER', status: 'Blocked', createdAt: '2023-04-05' },
  { id: 'usr_005', name: 'Jamil Chowdhury', email: 'jamil.c@example.com', role: 'DRIVER', status: 'Suspended', createdAt: '2023-05-12' },
  { id: 'usr_006', name: 'Nusrat Jahan', email: 'nusrat.j@example.com', role: 'RIDER', status: 'Active', createdAt: '2023-06-18' },
  { id: 'usr_007', name: 'Asif Mahmud', email: 'asif.m@example.com', role: 'DRIVER', status: 'Active', createdAt: '2023-07-22' },
];


const ManageUsers = () => {
    const [users, setUsers] = useState<User[]>(dummyUsers);
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState<UserRole | "ALL">("ALL");
    const [statusFilter, setStatusFilter] = useState<UserStatus | "ALL">("ALL");

    const filteredUsers = useMemo(() => {
        return users
            .filter(user => (roleFilter === "ALL" ? true : user.role === roleFilter))
            .filter(user => (statusFilter === "ALL" ? true : user.status === statusFilter))
            .filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [users, searchTerm, roleFilter, statusFilter]);

    // Placeholder for API calls
    const handleUpdateUserStatus = (userId: string, newStatus: UserStatus) => {
        console.log(`Updating user ${userId} to status ${newStatus}`);
        // In a real app, you would make an API call here.
        // For now, we'll just update the local state.
        setUsers(users.map(user => user.id === userId ? { ...user, status: newStatus } : user));
    };

    return (
        <div className="p-6 bg-slate-50 min-h-full">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">User Management</h1>
            
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="relative w-full md:max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input 
                            placeholder="Search by name or email..." 
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <FilterDropdown
                            label="Role"
                            options={["ALL", "RIDER", "DRIVER"]}
                            selectedValue={roleFilter}
                            onValueChange={(value: any) => setRoleFilter(value as UserRole | "ALL")}
                        />
                         <FilterDropdown
                            label="Status"
                            options={["ALL", "Active", "Blocked", "Pending", "Suspended"]}
                            selectedValue={statusFilter}
                            onValueChange={(value: any) => setStatusFilter(value as UserStatus | "ALL")}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50">
                            <TableHead>User</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Joined On</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <UserTableRow key={user.id} user={user} onUpdateStatus={handleUpdateUserStatus} />
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

// Helper component for filter dropdowns
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

// User Table Row Component
const UserTableRow = ({ user, onUpdateStatus }: { user: User; onUpdateStatus: (id: string, status: UserStatus) => void; }) => {
    return (
        <TableRow>
            <TableCell>
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                </div>
            </TableCell>
            <TableCell>
                <Badge variant={user.role === 'DRIVER' ? "default" : "secondary"}>{user.role}</Badge>
            </TableCell>
            <TableCell>
                <Badge variant={
                    user.status === 'Active' ? 'secondary' :
                    user.status === 'Pending' ? 'outline' :
                    'destructive'
                }>{user.status}</Badge>
            </TableCell>
            <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
            <TableCell className="text-right">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {user.role === 'DRIVER' && user.status === 'Pending' && (
                            <DropdownMenuItem onSelect={() => onUpdateStatus(user.id, 'Active')}>
                                <UserCheck className="mr-2 h-4 w-4" /> Approve Driver
                            </DropdownMenuItem>
                        )}
                         {user.role === 'DRIVER' && user.status === 'Active' && (
                            <DropdownMenuItem onSelect={() => onUpdateStatus(user.id, 'Suspended')}>
                                <ShieldOff className="mr-2 h-4 w-4" /> Suspend Driver
                            </DropdownMenuItem>
                        )}
                        {user.role === 'DRIVER' && user.status === 'Suspended' && (
                            <DropdownMenuItem onSelect={() => onUpdateStatus(user.id, 'Active')}>
                                <ShieldCheck className="mr-2 h-4 w-4" /> Unsuspend
                            </DropdownMenuItem>
                        )}
                        {user.role === 'RIDER' && user.status === 'Active' && (
                             <DropdownMenuItem onSelect={() => onUpdateStatus(user.id, 'Blocked')}>
                                <UserX className="mr-2 h-4 w-4" /> Block Rider
                            </DropdownMenuItem>
                        )}
                         {user.role === 'RIDER' && user.status === 'Blocked' && (
                             <DropdownMenuItem onSelect={() => onUpdateStatus(user.id, 'Active')}>
                                <UserCheck className="mr-2 h-4 w-4" /> Unblock Rider
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    );
};

export default ManageUsers;
