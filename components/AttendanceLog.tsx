
import React from 'react';
import { AttendanceRecord, AttendanceStatus } from '../types';

interface AttendanceLogProps {
  records: AttendanceRecord[];
}

const statusBadgeStyles: { [key in AttendanceStatus]: string } = {
  [AttendanceStatus.PRESENT]: 'bg-green-100 text-green-800',
  [AttendanceStatus.SICK]: 'bg-yellow-100 text-yellow-800',
  [AttendanceStatus.LEAVE]: 'bg-blue-100 text-blue-800',
};

const AttendanceLog: React.FC<AttendanceLogProps> = ({ records }) => {
  const sortedRecords = [...records].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg h-full">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Log Absensi Hari Ini</h2>
      {sortedRecords.length === 0 ? (
        <div className="flex items-center justify-center h-48 text-gray-500">
          <p>Belum ada data absensi.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {sortedRecords.map((record) => (
            <li key={record.employeeId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold text-gray-700">{record.name}</p>
                <p className="text-xs text-gray-500">{new Date(record.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${statusBadgeStyles[record.status]}`}>
                {record.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AttendanceLog;
