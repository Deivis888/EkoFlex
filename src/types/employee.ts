export interface Employee {
  id: string;
  email: string;
  name: string;
  surname: string;
  birthDate: string;
  nationality: string;
  profilePhoto?: string;
  registrationAddress: {
    country: string;
    city: string;
    street: string;
    houseNumber: string;
    apartmentNumber?: string;
    postalCode: string;
  };
  assignedAddress?: {
    country: string;
    city: string;
    street: string;
    houseNumber: string;
    apartmentNumber?: string;
    postalCode: string;
  };
  newAddress?: {
    country: string;
    city: string;
    street: string;
    houseNumber: string;
    apartmentNumber?: string;
    postalCode: string;
  };
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  bankDetails: {
    bankName: string;
    accountNumber: string;
    swiftCode: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface WorkDay {
  id: string;
  employeeId: string;
  date: string;
  startTime: string;
  endTime?: string;
  isCompleted: boolean;
  earlyFinishReason?: string;
  totalHours?: number;
  pauseEntries?: PauseEntry[];
  createdAt: string;
}

export interface PauseEntry {
  id: string;
  startTime: string;
  endTime?: string;
  reason: string;
  isActive: boolean;
}

export interface WorkEntry {
  id: string;
  employeeId: string;
  date: string;
  time: string;
  description: string;
  photos: string[];
  createdAt: string;
}

export interface Tool {
  id: string;
  name: string;
  toolNumber: string;
  assignedDate: string;
  assignedTime: string;
  supervisorName: string;
  photo?: string;
  isAccepted: boolean;
  employeeId: string;
}

export interface Vehicle {
  id: string;
  name: string;
  licensePlate: string;
  assignedDate: string;
  assignedTime: string;
  photo?: string;
  status: 'pending' | 'accepted' | 'rejected';
  employeeId: string;
}

export interface Document {
  id: string;
  employeeId: string;
  type: 'passport' | 'id_card' | 'drivers_license' | 'insurance_card' | 'medical_certificate' | 'other';
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
}

export interface Profession {
  id: string;
  employeeId: string;
  title: string;
  experienceYears: number;
  startDate: string;
  endDate?: string;
  company: string;
  description: string;
}

export interface Supervisor {
  id: string;
  name: string;
  email: string;
  phone: string;
  photo?: string;
  position: string;
}

export interface BusinessTrip {
  id: string;
  employeeId: string;
  departureDate: string;
  workWeeks: number;
  vacationWeeks: number;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

export interface AdvanceRequest {
  id: string;
  employeeId: string;
  amount: number;
  currency: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  approvedAt?: string;
}

export interface EmployeeStats {
  totalHours: number;
  totalSalary: number;
  totalAdvances: number;
  workDays: number;
}