import React from 'react';
import QRCode from 'react-qr-code';
import { UNIVERSAL_QR_CODE_VALUE } from '../constants';

interface UniversalQrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UniversalQrCodeModal: React.FC<UniversalQrCodeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    const printContent = document.getElementById('universal-qr-print-area');
    const printWindow = window.open('', '_blank');

    if (printWindow && printContent) {
        printWindow.document.write(`
            <html>
                <head>
                    <title>Cetak QR Code Absensi Universal</title>
                    <style>
                        body { font-family: sans-serif; text-align: center; margin-top: 50px; display: flex; justify-content: center; align-items: center; }
                        #print-container { border: 2px dashed #ccc; padding: 30px; }
                        h2, p { margin: 10px 0; }
                    </style>
                </head>
                <body>
                  <div id="print-container">
                    ${printContent.innerHTML}
                  </div>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-sm m-4 text-center relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          aria-label="Tutup"
        >
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
           </svg>
        </button>

        <div id="universal-qr-print-area">
            <h2 className="text-2xl font-bold text-gray-800">QR Code Absensi Universal</h2>
            <p className="text-gray-600 mb-6">Scan kode ini untuk absensi.</p>
            <div className="bg-white p-4 inline-block rounded-lg shadow-inner">
                <QRCode value={UNIVERSAL_QR_CODE_VALUE} size={200} />
            </div>
            <p className="text-xs text-gray-400 mt-4">Berlaku untuk semua staf.</p>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-2">
            <button onClick={handlePrint} className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                Cetak
            </button>
            <button onClick={onClose} className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">
                Tutup
            </button>
        </div>
      </div>
    </div>
  );
};

export default UniversalQrCodeModal;
