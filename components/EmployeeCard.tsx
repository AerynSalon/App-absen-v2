
import React from 'react';
import { Employee, AttendanceStatus } from '../types';

interface EmployeeCardProps {
  employee: Employee;
  onMarkAttendance: (employeeId: number, status: AttendanceStatus) => void;
  attendanceStatus: AttendanceStatus | null;
}

const statusStyles: { [key in AttendanceStatus]: string } = {
  [AttendanceStatus.PRESENT]: 'bg-green-100 text-green-800',
  [AttendanceStatus.SICK]: 'bg-yellow-100 text-yellow-800',
  [AttendanceStatus.LEAVE]: 'bg-blue-100 text-blue-800',
};

const AttendanceButton: React.FC<{ onClick: () => void; status: AttendanceStatus; children: React.ReactNode; disabled: boolean }> = ({ onClick, status, children, disabled }) => {
    const baseClasses = "w-full text-sm font-semibold py-2 px-2 rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2";
    const colorClasses = {
        [AttendanceStatus.PRESENT]: "bg-green-500 hover:bg-green-600 focus:ring-green-500 text-white",
        [AttendanceStatus.SICK]: "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500 text-white",
        [AttendanceStatus.LEAVE]: "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 text-white",
    };
    const disabledClasses = "bg-gray-300 cursor-not-allowed";

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${disabled ? disabledClasses : colorClasses[status]}`}
        >
            {children}
        </button>
    );
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onMarkAttendance, attendanceStatus }) => {
  const hasAttended = attendanceStatus !== null;

  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 ease-in-out ${hasAttended ? 'opacity-70' : ''}`}>
      <div className="p-5">
        <div className="flex items-center space-x-4">
          <img className="h-16 w-16 rounded-full object-cover" src={employee.photoUrl} alt={`Foto ${employee.name}`} />
          <div className="flex-1">
            <div className="text-lg font-bold text-gray-900">{employee.name}</div>
            <p className="text-sm text-gray-500">{employee.position}</p>
          </div>
        </div>
        <div className="mt-4">
          {hasAttended ? (
            <div className={`text-center font-bold p-2 rounded-md ${statusStyles[attendanceStatus]}`}>
              {attendanceStatus}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              <AttendanceButton status={AttendanceStatus.PRESENT} disabled={hasAttended} onClick={() => onMarkAttendance(employee.id, AttendanceStatus.PRESENT)}>Hadir</AttendanceButton>
              <AttendanceButton status={AttendanceStatus.SICK} disabled={hasAttended} onClick={() => onMarkAttendance(employee.id, AttendanceStatus.SICK)}>Sakit</AttendanceButton>
              <AttendanceButton status={AttendanceStatus.LEAVE} disabled={hasAttended} onClick={() => onMarkAttendance(employee.id, AttendanceStatus.LEAVE)}>Izin</AttendanceButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
