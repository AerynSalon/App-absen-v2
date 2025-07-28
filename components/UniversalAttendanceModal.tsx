import React from 'react';
import { Employee } from '../types';

interface UniversalAttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  employees: Employee[];
  onSelectEmployee: (employeeId: number) => void;
}

const UniversalAttendanceModal: React.FC<UniversalAttendanceModalProps> = ({ isOpen, onClose, employees, onSelectEmployee }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 text-center">Pilih Staf untuk Absen</h2>
            <p className="text-sm text-gray-500 text-center mt-1">Staf yang dipilih akan ditandai "Hadir".</p>
        </div>
        
        <div className="overflow-y-auto p-2">
            {employees.length > 0 ? (
                <ul className="divide-y divide-gray-100">
                {employees.map((employee) => (
                    <li key={employee.id} className="p-4 flex items-center justify-between hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                        <img className="h-12 w-12 rounded-full object-cover" src={employee.photoUrl} alt={`Foto ${employee.name}`} />
                        <div>
                        <div className="font-semibold text-gray-900">{employee.name}</div>
                        <p className="text-sm text-gray-500">{employee.position}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => onSelectEmployee(employee.id)}
                        className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors text-sm"
                    >
                        Pilih
                    </button>
                    </li>
                ))}
                </ul>
            ) : (
                <div className="text-center py-12 text-gray-500">
                    <p className="font-semibold">Semua staf sudah melakukan absensi.</p>
                </div>
            )}
        </div>

        <div className="p-4 border-t border-gray-200">
            <button
                onClick={onClose}
                className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors font-semibold"
            >
                Tutup
            </button>
        </div>
      </div>
    </div>
  );
};

export default UniversalAttendanceModal;
