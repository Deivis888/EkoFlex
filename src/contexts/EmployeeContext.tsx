import React, { createContext, useContext, useState, useEffect } from 'react';
import { Employee, WorkDay, WorkEntry, Tool, Vehicle, Document, Profession, BusinessTrip, AdvanceRequest, EmployeeStats } from '../types/employee';

interface EmployeeContextType {
  employee: Employee | null;
  isAuthenticated: boolean;
  stats: EmployeeStats;
  workDays: WorkDay[];
  workEntries: WorkEntry[];
  tools: Tool[];
  vehicles: Vehicle[];
  documents: Document[];
  professions: Profession[];
  businessTrips: BusinessTrip[];
  advanceRequests: AdvanceRequest[];
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<Employee>) => Promise<void>;
  startWorkDay: () => Promise<void>;
  endWorkDay: (reason?: string) => Promise<void>;
  addWorkEntry: (entry: Omit<WorkEntry, 'id' | 'employeeId' | 'createdAt'>) => Promise<void>;
  acceptTool: (toolId: string) => Promise<void>;
  acceptVehicle: (vehicleId: string) => Promise<void>;
  rejectVehicle: (vehicleId: string) => Promise<void>;
  uploadDocument: (file: File, type: Document['type']) => Promise<void>;
  addProfession: (profession: Omit<Profession, 'id' | 'employeeId'>) => Promise<void>;
  submitBusinessTrip: (trip: Omit<BusinessTrip, 'id' | 'employeeId' | 'status' | 'submittedAt'>) => Promise<void>;
  requestAdvance: (amount: number) => Promise<void>;
  updateBankDetails: (bankDetails: Employee['bankDetails']) => Promise<void>;
  updateEmergencyContact: (contact: Employee['emergencyContact']) => Promise<void>;
  updatePassword: (oldPassword: string, newPassword: string) => Promise<void>;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export function EmployeeProvider({ children }: { children: React.ReactNode }) {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [stats, setStats] = useState<EmployeeStats>({
    totalHours: 0,
    totalSalary: 0,
    totalAdvances: 0,
    workDays: 0
  });
  const [workDays, setWorkDays] = useState<WorkDay[]>([]);
  const [workEntries, setWorkEntries] = useState<WorkEntry[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [businessTrips, setBusinessTrips] = useState<BusinessTrip[]>([]);
  const [advanceRequests, setAdvanceRequests] = useState<AdvanceRequest[]>([]);

  // Mock data initialization
  useEffect(() => {
    const mockEmployee: Employee = {
      id: '1',
      email: 'jonas.petraitis@ekoflex.lt',
      name: 'Jonas',
      surname: 'Petraitis',
      birthDate: '1985-03-15',
      nationality: 'Lithuanian',
      profilePhoto: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      registrationAddress: {
        country: 'Lithuania',
        city: 'Vilnius',
        street: 'Gedimino pr.',
        houseNumber: '15',
        apartmentNumber: '25',
        postalCode: 'LT-01103'
      },
      assignedAddress: {
        country: 'Norway',
        city: 'Oslo',
        street: 'Karl Johans gate',
        houseNumber: '22',
        postalCode: '0159'
      },
      emergencyContact: {
        name: 'Ona Petraitienė',
        phone: '+37060123456',
        relationship: 'Žmona'
      },
      bankDetails: {
        bankName: 'SEB Bank',
        accountNumber: 'LT12 7044 0600 0123 4567',
        swiftCode: 'CBVILT2X'
      },
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-02-15T10:00:00Z'
    };

    const mockStats: EmployeeStats = {
      totalHours: 168,
      totalSalary: 3200,
      totalAdvances: 800,
      workDays: 21
    };

    const mockTools: Tool[] = [
      {
        id: '1',
        name: 'Bosch Professional Drill',
        toolNumber: 'T001',
        assignedDate: '2024-02-01',
        assignedTime: '08:00',
        supervisorName: 'Petras Kazlauskas',
        photo: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=400',
        isAccepted: true,
        employeeId: '1'
      },
      {
        id: '2',
        name: 'Safety Helmet',
        toolNumber: 'T002',
        assignedDate: '2024-02-01',
        assignedTime: '08:00',
        supervisorName: 'Petras Kazlauskas',
        isAccepted: false,
        employeeId: '1'
      }
    ];

    const mockVehicles: Vehicle[] = [
      {
        id: '1',
        name: 'Ford Transit Van',
        licensePlate: 'ABC 123',
        assignedDate: '2024-02-01',
        assignedTime: '07:00',
        photo: 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=400',
        status: 'pending',
        employeeId: '1'
      }
    ];

    setEmployee(mockEmployee);
    setStats(mockStats);
    setTools(mockTools);
    setVehicles(mockVehicles);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in real app, this would call an API
    if (email === 'jonas.petraitis@ekoflex.lt' && password === 'password123') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setEmployee(null);
  };

  const updateProfile = async (data: Partial<Employee>) => {
    if (employee) {
      setEmployee({ ...employee, ...data, updatedAt: new Date().toISOString() });
    }
  };

  const startWorkDay = async () => {
    if (!employee) return;
    
    const newWorkDay: WorkDay = {
      id: Date.now().toString(),
      employeeId: employee.id,
      date: new Date().toISOString().split('T')[0],
      startTime: new Date().toTimeString().split(' ')[0],
      isCompleted: false,
      createdAt: new Date().toISOString()
    };
    
    setWorkDays(prev => [newWorkDay, ...prev]);
  };

  const endWorkDay = async (reason?: string) => {
    if (!employee) return;
    
    setWorkDays(prev => prev.map(day => {
      if (!day.isCompleted && day.date === new Date().toISOString().split('T')[0]) {
        const endTime = new Date().toTimeString().split(' ')[0];
        const startTime = new Date(`2000-01-01T${day.startTime}`);
        const endTimeDate = new Date(`2000-01-01T${endTime}`);
        const totalHours = (endTimeDate.getTime() - startTime.getTime()) / (1000 * 60 * 60);
        
        return {
          ...day,
          endTime,
          isCompleted: true,
          earlyFinishReason: reason,
          totalHours: Math.round(totalHours * 100) / 100
        };
      }
      return day;
    }));
  };

  const addWorkEntry = async (entry: Omit<WorkEntry, 'id' | 'employeeId' | 'createdAt'>) => {
    if (!employee) return;
    
    const newEntry: WorkEntry = {
      ...entry,
      id: Date.now().toString(),
      employeeId: employee.id,
      createdAt: new Date().toISOString()
    };
    
    setWorkEntries(prev => [newEntry, ...prev]);
  };

  const acceptTool = async (toolId: string) => {
    setTools(prev => prev.map(tool => 
      tool.id === toolId ? { ...tool, isAccepted: true } : tool
    ));
  };

  const acceptVehicle = async (vehicleId: string) => {
    setVehicles(prev => prev.map(vehicle => 
      vehicle.id === vehicleId ? { ...vehicle, status: 'accepted' } : vehicle
    ));
  };

  const rejectVehicle = async (vehicleId: string) => {
    setVehicles(prev => prev.map(vehicle => 
      vehicle.id === vehicleId ? { ...vehicle, status: 'rejected' } : vehicle
    ));
  };

  const uploadDocument = async (file: File, type: Document['type']) => {
    if (!employee) return;
    
    // Mock file upload - in real app, this would upload to a server
    const newDocument: Document = {
      id: Date.now().toString(),
      employeeId: employee.id,
      type,
      fileName: file.name,
      fileUrl: URL.createObjectURL(file),
      uploadedAt: new Date().toISOString()
    };
    
    setDocuments(prev => [newDocument, ...prev]);
  };

  const addProfession = async (profession: Omit<Profession, 'id' | 'employeeId'>) => {
    if (!employee) return;
    
    const newProfession: Profession = {
      ...profession,
      id: Date.now().toString(),
      employeeId: employee.id
    };
    
    setProfessions(prev => [newProfession, ...prev]);
  };

  const submitBusinessTrip = async (trip: Omit<BusinessTrip, 'id' | 'employeeId' | 'status' | 'submittedAt'>) => {
    if (!employee) return;
    
    const newTrip: BusinessTrip = {
      ...trip,
      id: Date.now().toString(),
      employeeId: employee.id,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };
    
    setBusinessTrips(prev => [newTrip, ...prev]);
  };

  const requestAdvance = async (amount: number) => {
    if (!employee) return;
    
    const newRequest: AdvanceRequest = {
      id: Date.now().toString(),
      employeeId: employee.id,
      amount,
      currency: 'EUR',
      requestDate: new Date().toISOString(),
      status: 'pending'
    };
    
    setAdvanceRequests(prev => [newRequest, ...prev]);
  };

  const updateBankDetails = async (bankDetails: Employee['bankDetails']) => {
    if (employee) {
      setEmployee({ ...employee, bankDetails, updatedAt: new Date().toISOString() });
    }
  };

  const updateEmergencyContact = async (contact: Employee['emergencyContact']) => {
    if (employee) {
      setEmployee({ ...employee, emergencyContact: contact, updatedAt: new Date().toISOString() });
    }
  };

  const updatePassword = async (oldPassword: string, newPassword: string) => {
    // Mock password update - in real app, this would call an API
    console.log('Password updated');
  };

  const value = {
    employee,
    isAuthenticated,
    stats,
    workDays,
    workEntries,
    tools,
    vehicles,
    documents,
    professions,
    businessTrips,
    advanceRequests,
    login,
    logout,
    updateProfile,
    startWorkDay,
    endWorkDay,
    addWorkEntry,
    acceptTool,
    acceptVehicle,
    rejectVehicle,
    uploadDocument,
    addProfession,
    submitBusinessTrip,
    requestAdvance,
    updateBankDetails,
    updateEmergencyContact,
    updatePassword
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployee() {
  const context = useContext(EmployeeContext);
  if (context === undefined) {
    throw new Error('useEmployee must be used within an EmployeeProvider');
  }
  return context;
}