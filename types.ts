
export enum AttendanceStatus {
  PRESENT = 'Hadir',
  SICK = 'Sakit',
  LEAVE = 'Izin',
}

export interface Employee {
  id: number;
  name: string;
  position: string;
  photoUrl: string;
}

export interface AttendanceRecord {
  employeeId: number;
  name: string;
  status: AttendanceStatus;
  timestamp: string;
}
