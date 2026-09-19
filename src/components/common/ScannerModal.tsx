import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEduNexusStore } from '../../store/useEduNexusStore';
import { scanDocumentMaterial } from '../../services/uploadService';
import { Camera, Scan, Sparkles, CheckCircle2, X, RefreshCw, ArrowRight, BookOpen } from 'lucide-react';

export const ScannerModal: React.FC = () => {
  const { isScannerModalOpen, toggleScannerModal } = useEduNexusStore();
  const navigate = useNavigate();

  const [isScanning, setIsScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState('');
  const [scanResult, setScanResult] = useState<{
    extractedText: string;
    explanation: string;
    detectedSubject: string;
  } | null>(null);

  if (!isScannerModalOpen) return null;

  const handleCapture = async () => {
    setIsScanning(true);
    try {
      const res = await scanDocumentMaterial((msg) => setScanStatus(msg));
      setScanResult(res);
      setIsScanning(false);
    } catch (e) {
      console.error(e);
      setIsScanning(false);
    }
  };

  const handleClose = () => {
    toggleScannerModal(false);
    setIsScanning(false);
    setScanResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-2xl bg-white dark:bg-[#111827] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-600/10 border border-amber-500/20 text-amber-500 flex items-center justify-center">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Scan Notes or Textbook Problem
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                OCR text extraction and academic syllabus concept diagnosis.
              </p>
            </div>
          </div>
          <button onClick={handleClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewfinder / Capture UI */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {!scanResult ? (
            <div className="space-y-4">
              {/* Camera frame simulation */}
              <div className="relative aspect-video rounded-2xl bg-slate-950 overflow-hidden flex items-center justify-center border-2 border-dashed border-slate-700 shadow-inner">
                {/* Laser scan line when scanning */}
                {isScanning && (
                  <div
                    className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent shadow-[0_0_15px_#2563EB] animate-bounce"
                    style={{ animationDuration: '1.5s' }}
                  />
                )}

                {/* Viewfinder corners */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-amber-500" />
                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-amber-500" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-amber-500" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-amber-500" />

                <div className="text-center p-6 z-10">
                  <Scan className={`w-12 h-12 mx-auto mb-2 ${isScanning ? 'text-amber-400 animate-spin' : 'text-slate-400'}`} />
                  <p className="text-sm font-medium text-slate-200">
                    {isScanning ? scanStatus : 'Position lecture notes, whiteboard formulas, or textbook diagram'}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Extracts formulas, normal form statements, and syllabus topics automatically.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 pt-2">
                <button
                  disabled={isScanning}
                  onClick={handleCapture}
                  className="px-6 py-3 rounded-xl font-semibold bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-500/25 flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  {isScanning ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Extracting Problem Frame...
                    </>
                  ) : (
                    <>
                      <Camera className="w-4 h-4" />
                      Capture & Parse Notes
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* Scanned result display */
            <div className="space-y-4 animate-fade-in">
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <p className="text-xs font-semibold text-slate-900 dark:text-white">
                  OCR Text Extracted Successfully • Course: {scanResult.detectedSubject}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#161F30] border border-slate-200 dark:border-slate-800">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Extracted Note Content:
                </p>
                <pre className="text-xs font-mono text-slate-900 dark:text-slate-100 whitespace-pre-wrap bg-white dark:bg-[#111827] p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                  {scanResult.extractedText}
                </pre>
              </div>

              <div className="p-4 rounded-xl bg-amber-600/10 border border-amber-500/20">
                <div className="flex items-center gap-2 mb-2 text-amber-400">
                  <Sparkles className="w-4 h-4" />
                  <p className="text-xs font-bold uppercase tracking-wider">
                    Curriculum Concept Walkthrough:
                  </p>
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {scanResult.explanation}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setScanResult(null)}
                  className="px-4 py-2 rounded-xl text-xs font-medium border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-200"
                >
                  Scan Another
                </button>
                <button
                  onClick={() => {
                    handleClose();
                    navigate('/tutor?topic=Normalization');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-amber-600 hover:bg-amber-500 text-white flex items-center gap-1.5 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Ask Academic Tutor
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
