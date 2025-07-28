import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import EmployeeCard from './components/EmployeeCard';
import AttendanceLog from './components/AttendanceLog';
import SummaryCard from './components/SummaryCard';
import EmployeeManagement from './components/EmployeeManagement';
import QrScannerModal from './components/QrScannerModal';
import UniversalQrCodeModal from './components/UniversalQrCodeModal';
import UniversalAttendanceModal from './components/UniversalAttendanceModal';
import { EMPLOYEES, UNIVERSAL_QR_CODE_VALUE } from './constants';
import { Employee, AttendanceRecord, AttendanceStatus } from './types';
import { generateAttendanceSummary } from './services/geminiService';

type ActiveTab = 'attendance' | 'management';

const App: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>(EMPLOYEES);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [summary, setSummary] = useState<string>('Klik "Buat Ulang" untuk ringkasan absensi staf hari ini.');
  const [isLoadingSummary, setIsLoadingSummary] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('attendance');
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isUniversalQrModalOpen, setIsUniversalQrModalOpen] = useState(false);
  const [isUniversalAttendanceModalOpen, setIsUniversalAttendanceModalOpen] = useState(false);

  const handleMarkAttendance = (employeeId: number, status: AttendanceStatus) => {
    const employee = employees.find(e => e.id === employeeId);
    if (!employee) return;

    const existingRecord = attendanceRecords.find(r => r.employeeId === employeeId);
    if (existingRecord) return;

    const newRecord: AttendanceRecord = {
      employeeId,
      name: employee.name,
      status,
      timestamp: new Date().toISOString(),
    };

    setAttendanceRecords(prevRecords => [...prevRecords, newRecord]);
  };
  
  const handleQrScanSuccess = (decodedText: string) => {
    setIsScannerOpen(false);
    if (decodedText === UNIVERSAL_QR_CODE_VALUE) {
      setIsUniversalAttendanceModalOpen(true);
    } else {
      alert("QR Code tidak valid. Harap gunakan QR Code Universal yang disediakan.");
    }
  };

  const handleSelectEmployeeForAttendance = (employeeId: number) => {
    handleMarkAttendance(employeeId, AttendanceStatus.PRESENT);
    setIsUniversalAttendanceModalOpen(false);
    const employee = employees.find(e => e.id === employeeId);
    if (employee) {
        alert(`Absensi untuk ${employee.name} berhasil dicatat!`);
    }
  };

  const handleGenerateSummary = useCallback(async () => {
    if (attendanceRecords.length === 0) {
        setSummary('Tidak ada data untuk dianalisis. Silakan tandai absensi terlebih dahulu.');
        return;
    }
    setIsLoadingSummary(true);
    try {
      const result = await generateAttendanceSummary(attendanceRecords, employees.length);
      setSummary(result);
    } catch (error) {
      console.error("Failed to generate summary:", error);
      setSummary("Gagal membuat ringkasan. Silakan coba lagi.");
    } finally {
      setIsLoadingSummary(false);
    }
  }, [attendanceRecords, employees.length]);

  useEffect(() => {
    if (activeTab === 'attendance' && attendanceRecords.length > 0) {
      const timer = setTimeout(() => {
        handleGenerateSummary();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [attendanceRecords.length, handleGenerateSummary, activeTab]);

  const handleAddEmployee = (employeeData: Omit<Employee, 'id'>) => {
    const newEmployee: Employee = {
        ...employeeData,
        id: Date.now(),
    };
    setEmployees(prev => [...prev, newEmployee]);
  };

  const handleUpdateEmployee = (updatedEmployee: Employee) => {
    setEmployees(prev => prev.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp));
    setAttendanceRecords(prev => prev.map(rec => {
        if (rec.employeeId === updatedEmployee.id) {
            return { ...rec, name: updatedEmployee.name };
        }
        return rec;
    }));
  };

  const handleDeleteEmployee = (employeeId: number) => {
    setEmployees(prev => prev.filter(emp => emp.id !== employeeId));
    setAttendanceRecords(prev => prev.filter(rec => rec.employeeId !== employeeId));
  };

  const renderAttendanceView = () => {
    const unattendedEmployees = employees.filter(emp => !attendanceRecords.some(rec => rec.employeeId === emp.id));
    
    return (
    <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
      <div className="lg:col-span-2">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-gray-800">Daftar Staf Salon ({employees.length})</h2>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <button
                    onClick={() => setIsScannerOpen(true)}
                    className="w-full sm:w-auto bg-pink-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors flex items-center justify-center shadow-lg"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h-1m-2-11h1M4 12H3m11 6v-1m-2-11v1m-6 6H4m1 6h1m11-1V6a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2z" />
                    </svg>
                    Scan QR Absen
                </button>
                 <button
                    onClick={() => setIsUniversalQrModalOpen(true)}
                    className="w-full sm:w-auto bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center shadow-lg"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm3 1a1 1 0 000 2h12a1 1 0 100-2H6zM3 9a1 1 0 00-1 1v2a1 1 0 102 0v-2a1 1 0 00-1-1zm3 1a1 1 0 100 2h12a1 1 0 100-2H6zM3 15a1 1 0 00-1 1v2a1 1 0 102 0v-2a1 1 0 00-1-1zm3 1a1 1 0 100 2h12a1 1 0 100-2H6z" />
                    </svg>
                    Tampilkan QR Universal
                </button>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {employees.map(employee => {
            const record = attendanceRecords.find(r => r.employeeId === employee.id);
            return (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                onMarkAttendance={handleMarkAttendance}
                attendanceStatus={record ? record.status : null}
              />
            );
          })}
        </div>
      </div>
      <div className="lg:col-span-1 mt-8 lg:mt-0">
        <div className="sticky top-8">
          <SummaryCard
            summary={summary}
            isLoading={isLoadingSummary}
            onGenerate={handleGenerateSummary}
            hasRecords={attendanceRecords.length > 0}
          />
          <AttendanceLog records={attendanceRecords} />
        </div>
      </div>
       <UniversalAttendanceModal
        isOpen={isUniversalAttendanceModalOpen}
        onClose={() => setIsUniversalAttendanceModalOpen(false)}
        employees={unattendedEmployees}
        onSelectEmployee={handleSelectEmployeeForAttendance}
      />
    </div>
    );
  };

  const renderManagementView = () => (
    <EmployeeManagement 
        employees={employees}
        onAddEmployee={handleAddEmployee}
        onUpdateEmployee={handleUpdateEmployee}
        onDeleteEmployee={handleDeleteEmployee}
    />
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'attendance' ? renderAttendanceView() : renderManagementView()}
      </main>
      <QrScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanSuccess={handleQrScanSuccess}
      />
      <UniversalQrCodeModal
        isOpen={isUniversalQrModalOpen}
        onClose={() => setIsUniversalQrModalOpen(false)}
      />
    </div>
  );
};

export default App;