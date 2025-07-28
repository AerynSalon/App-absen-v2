import React, { useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

interface QrScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess: (decodedText: string) => void;
}

const qrReaderId = "qr-code-reader";

const QrScannerModal: React.FC<QrScannerModalProps> = ({ isOpen, onClose, onScanSuccess }) => {
  useEffect(() => {
    if (isOpen) {
      const html5QrCode = new Html5Qrcode(qrReaderId);
      
      const config = { fps: 10, qrbox: { width: 250, height: 250 } };

      const qrCodeSuccessCallback = (decodedText: string, decodedResult: any) => {
        html5QrCode.stop().then(() => {
          onScanSuccess(decodedText);
        }).catch(err => {
            console.error("Failed to stop QR code scanner.", err);
            // Still call success callback even if stopping fails
            onScanSuccess(decodedText);
        });
      };
      
      const qrCodeErrorCallback = (errorMessage: string) => {
        // console.log(errorMessage);
      };

      html5QrCode.start(
        { facingMode: "environment" },
        config,
        qrCodeSuccessCallback,
        qrCodeErrorCallback
      ).catch(err => {
        console.error("Unable to start scanning.", err);
        alert(`Error: Tidak dapat memulai kamera. ${err.message}. Pastikan Anda memberikan izin kamera.`);
        onClose();
      });

      return () => {
        // Ensure scanner is stopped on component unmount or if modal closes unexpectedly
        html5QrCode.isScanning && html5QrCode.stop().catch(err => console.error("Error stopping scanner on cleanup:", err));
      };
    }
  }, [isOpen, onScanSuccess, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 w-full max-w-md m-4 relative">
        <h2 className="text-xl font-bold mb-4 text-center">Arahkan Kamera ke QR Code</h2>
        <div id={qrReaderId} className="w-full h-auto rounded-lg overflow-hidden border-4 border-gray-200"></div>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          aria-label="Tutup pemindai"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
         <button onClick={onClose} className="mt-4 w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">
            Batal
         </button>
      </div>
    </div>
  );
};

export default QrScannerModal;
