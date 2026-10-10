import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Upload, Loader2, Wand2, ArrowRight, RotateCcw } from "lucide-react";
import { Image as ImageIcon } from "@/components/ui/image";

const STATUS = {
  IDLE: "idle",
  ANALYZING: "analyzing",
  RESULT: "result",
};

export default function FindRightService() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFile = (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setStatus(STATUS.ANALYZING);
    setTimeout(() => setStatus(STATUS.RESULT), 2200);
  };

  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    handleFile(file);
  };

  const reset = () => {
    setPreviewUrl(null);
    setStatus(STATUS.IDLE);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };

  return (
    <section className="mx-auto max-w-[1360px] px-4 md:px-8 pb-10">
      <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-revora-primary to-revora-primarydark text-white">
        <div className="absolute -right-12 -top-12 w-56 h-56 rounded-full bg-white/10" />
        <div className="absolute -right-8 bottom-0 w-40 h-40 rounded-full bg-revora-gold/20" />

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-8 items-center">
          {/* Left: copy + CTA */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide">
              <Wand2 className="w-3.5 h-3.5" /> Find the Right Service
            </div>
            <h2 className="text-xl md:text-2xl font-bold mt-3 leading-tight">
              Not sure which service you need?
            </h2>
            <p className="text-white/80 text-sm mt-2 max-w-md">
              Upload a photo of the problem and we'll help you find the right service.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-5">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 rounded-xl bg-white text-revora-ink font-semibold px-5 py-3 min-h-[48px] hover:bg-revora-gold hover:text-white transition-colors"
              >
                <Upload className="w-4 h-4" /> Upload a Photo
              </button>
              <button
                onClick={() => cameraInputRef.current?.click()}
                className="inline-flex items-center gap-2 rounded-xl bg-white/15 border border-white/30 text-white font-semibold px-5 py-3 min-h-[48px] hover:bg-white/25 transition-colors"
              >
                <Camera className="w-4 h-4" /> Take a Photo
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleInputChange}
            />
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleInputChange}
            />
          </div>

          {/* Right: preview / states */}
          <div className="min-h-[220px] md:min-h-[260px]">
            {status === STATUS.IDLE && (
              <div className="h-full flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/30 bg-white/5 p-6 text-center">
                <Camera className="w-10 h-10 text-white/70 mb-3" />
                <p className="text-sm text-white/70">
                  No photo selected yet. Try a leaking pipe, a stain, or a broken fixture.
                </p>
              </div>
            )}

            {status === STATUS.ANALYZING && previewUrl && (
              <div className="h-full flex flex-col items-center justify-center rounded-2xl bg-white/10 p-6 text-center">
                <div className="relative w-32 h-32 rounded-xl overflow-hidden mb-4">
                  <img src={previewUrl} alt="Uploaded problem" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-revora-ink/40 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  </div>
                </div>
                <p className="text-sm font-medium">Analyzing your image...</p>
                <p className="text-xs text-white/60 mt-1">Matching it to THE REVORA services</p>
              </div>
            )}

            {status === STATUS.RESULT && previewUrl && (
              <div className="rounded-2xl bg-white text-revora-ink p-5 shadow-[0_8px_30px_rgba(20,40,43,0.15)]">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={previewUrl} alt="Uploaded problem" className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold tracking-wide text-revora-gold uppercase">
                      We found a possible issue
                    </p>
                    <p className="font-bold text-lg leading-tight">Leaking pipe</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-revora-border">
                  <p className="text-xs text-revora-muted">Recommended service</p>
                  <p className="font-semibold text-revora-primary text-lg">Plumbing</p>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={() => navigate("/services?group=FIX")}
                    className="inline-flex items-center gap-2 rounded-xl bg-revora-primary text-white font-semibold px-5 py-3 min-h-[44px] hover:bg-revora-primarydark transition-colors"
                  >
                    View Plumbing Services <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={reset}
                    className="inline-flex items-center gap-2 text-sm font-medium text-revora-muted hover:text-revora-ink"
                  >
                    <RotateCcw className="w-4 h-4" /> Try another
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
