import React, { useState } from 'react';
import { ExportFormat } from '../types';
import { HandleSendDataToMail } from '@/Shared/Service/DownloadService';


interface SidebarProps {
  handleClickExport: (format: ExportFormat) => void;
  currentFormat: ExportFormat;
  onFormatChange: (format: ExportFormat) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  handleClickExport,
  currentFormat, 
  onFormatChange,
}) => {
  const [isEmailFormOpen, setIsEmailFormOpen] = useState(false);
  const [data,setData]=useState({
    to:'',
    subject:"Raidexi Transmission",
    body:'',
    attachments:{
      base64:'',
      mineType:'',
      filenames:''
    }
  })
  const toggleEmailForm = () => setIsEmailFormOpen(!isEmailFormOpen);
  const handleSendEmail = () => {
    HandleSendDataToMail(data,currentFormat);
  }

  return (
    <aside className="flex flex-col w-full gap-8 p-8 border-r no-print lg:w-80 bg-stone-900/50 border-stone-800 shrink-0">
      <div>
        <h2 className="text-stone-500 font-mono text-xs uppercase tracking-[0.2em] mb-4">Export Format</h2>
        <div className="flex flex-col gap-1 p-1 border border-stone-800">
          {(['pdf', 'csv', 'png'] as const).map((format) => (
            <button
              key={format}
              onClick={() => onFormatChange(format)}
              className={`w-full text-left px-4 py-3 text-sm font-mono cursor-pointer uppercase tracking-widest transition-colors ${currentFormat === format ? 'bg-primary text-charcoal' : 'hover:bg-stone-800 text-stone-400'}`}
            >
              {format.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button onClick={() => handleClickExport(currentFormat)} className="w-full bg-primary hover:bg-[#c4a472] text-charcoal px-6 py-4 flex justify-center items-center gap-3 text-sm font-bold tracking-[0.2em] transition-all rounded-none group">
          <span className="material-symbols-outlined text-[20px] group-active:translate-y-0.5 transition-transform">download</span> 
          DOWNLOAD
        </button>
        
        <button 
          onClick={toggleEmailForm}
          className={`w-full border border-primary text-paper px-6 py-4 flex justify-center items-center gap-3 text-sm font-bold tracking-[0.2em] transition-all rounded-none hover:bg-primary/10 ${isEmailFormOpen ? 'bg-primary/5' : ''}`}
        >
          <a href='email/to:' className="material-symbols-outlined text-[20px]">mail</a> 
          SEND VIA EMAIL
        </button>

        {/* Email Form Panel */}
        {isEmailFormOpen && (
          <div className="p-4 mt-4 duration-300 border border-stone-700 bg-stone-950/30 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-stone-400 font-mono text-[10px] uppercase tracking-widest">Share Transmission</h3>
              <button onClick={() => setIsEmailFormOpen(false)} className="font-mono text-xs uppercase text-stone-600 hover:text-stone-400">
                Close [X]
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] text-stone-500 font-mono uppercase mb-1">Recipient Email</label>
                <input 
                  type="email" 
                  value={data.to}
                  onChange={(e) => setData(prev => ({ ...prev, to: e.target.value }))}
                  placeholder="ENTER ADDRESS..." 
                  className="w-full p-3 font-mono text-xs border rounded-none outline-none bg-stone-900 border-stone-800 text-paper focus:border-primary focus:ring-0 placeholder:text-stone-700"
                />
              </div>
              <div>
                <label className="block text-[10px] text-stone-500 font-mono uppercase mb-1">Reference Note (Optional)</label>
                <textarea 
                  rows={3} 
                  value={data.body}
                  onChange={(e) => setData(prev => ({ ...prev, body: e.target.value }))}
                  placeholder="ENTER MESSAGE..." 
                  className="w-full p-3 font-mono text-xs border rounded-none outline-none resize-none bg-stone-900 border-stone-800 text-paper focus:border-primary focus:ring-0 placeholder:text-stone-700"
                />
              </div>
              <button
                onClick={handleSendEmail}
                className="w-full bg-stone-800 hover:bg-stone-700 text-primary border border-primary/30 px-4 py-2 text-[10px] font-mono font-bold tracking-widest uppercase transition-all"
              >
                TRANSMIT DATA
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-auto lg:mt-0">
        <p className="text-[10px] text-stone-600 font-mono leading-relaxed uppercase tracking-tighter">
          Generating high-fidelity document based on enterprise standards. All exports and transmissions are logged for audit compliance.
        </p>
      </div>


    </aside>
  );
};

export default Sidebar;