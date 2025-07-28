import React, { useState, useEffect } from 'react';
import { Employee } from '../types';

interface EmployeeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (employee: Omit<Employee, 'id'> & { id?: number }) => void;
  employee: Employee | null;
}

const EmployeeFormModal: React.FC<EmployeeFormModalProps> = ({ isOpen, onClose, onSave, employee }) => {
  const [formData, setFormData] = useState({ name: '', position: '', photoUrl: '' });

  useEffect(() => {
    if (employee) {
      setFormData({ name: employee.name, position: employee.position, photoUrl: employee.photoUrl });
    } else {
      setFormData({ name: '', position: '', photoUrl: '' });
    }
  }, [employee, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.position) {
        alert('Nama dan Posisi wajib diisi.');
        return;
    }
    const photoUrl = formData.photoUrl || `https://picsum.photos/seed/${formData.name.replace(/\s/g, '')}/200/200`;
    onSave({ ...formData, photoUrl, id: employee?.id });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md m-4">
        <h2 className="text-2xl font-bold mb-4">{employee ? 'Edit Staf' : 'Tambah Staf Baru'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="position" className="block text-sm font-medium text-gray-700">Posisi</label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-700">URL Foto (opsional)</label>
              <input
                type="text"
                id="photoUrl"
                name="photoUrl"
                value={formData.photoUrl}
                onChange={handleChange}
                placeholder="Akan digenerate otomatis jika kosong"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
              Batal
            </button>
            <button type="submit" className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeFormModal;