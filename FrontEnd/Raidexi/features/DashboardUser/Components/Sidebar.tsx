"use client";
import { useContext } from 'react';
import { AuthContext } from '@/provider/AuthProvider';


const Sidebar = () => {
  const context=useContext(AuthContext)
   if (!context || context.loading || !context.userData) {
    return (
      <div className="flex flex-col gap-8 p-8 lg:col-span-4">
        <div className="text-center text-white animate-pulse">
          Đang tải thông tin hồ sơ...
        </div>
      </div>
    );
  }
  const profile={
    id: context?.userData.id??"",
    name: context?.userData.name??"",
    email: context?.userData.email??"",
    createdAt: context?.userData.createdAt??"",
  }
  
  return (
    <div className="flex flex-col gap-8 lg:col-span-4">
      <div className="relative flex flex-col p-0 border bg-background-card border-border-color group">
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary"></div>
        
        <div className="p-8 border-b border-border-color flex flex-col items-center text-center bg-[#1a1713]">
          <div className="relative p-1 mb-6 border size-36 border-border-highlight">
            <img 
              alt="Portrait" 
              className="object-cover w-full h-full grayscale opacity-90 contrast-125" 
              src={"https://i.pinimg.com/736x/23/b7/c4/23b7c4cf67425a4586f52b5ab3193485.jpg"} 
            />
            <div className="absolute -bottom-2 -right-2 bg-primary text-background-dark text-[10px] font-bold px-2 py-0.5 font-mono border border-background-dark">
              ID: {profile.id}
            </div>
          </div>
          <h3 className="text-2xl font-bold tracking-wider text-white uppercase">{profile.name}</h3>
          <p className="mt-2 font-mono text-sm tracking-widest uppercase text-primary"></p>
        </div>

        <div className="p-6 bg-[#1f1b16]">
          <div className="space-y-4 border border-border-color/30 p-5 bg-[#181511]">
            <div className="flex items-baseline justify-between pb-2 border-b border-border-color/20">
              <span className="text-text-muted text-[10px] uppercase tracking-widest font-mono">Email</span>
              <span className="ml-4 font-mono text-xs text-white truncate">{profile.email}</span>
            </div>
            <div className="flex items-baseline justify-between pb-2 border-b border-border-color/20">
              <span className="text-text-muted text-[10px] uppercase tracking-widest font-mono">Điện thoại</span>
              <span className="ml-4 font-mono text-xs text-white truncate">{}</span>
            </div>
            <div className="flex items-baseline justify-between pb-2 border-b border-border-color/20">
              <span className="text-text-muted text-[10px] uppercase tracking-widest font-mono">Khu vực</span>
              <span className="ml-4 font-mono text-xs text-white truncate">{}</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-text-muted text-[10px] uppercase tracking-widest font-mono">Ngày tham gia</span>
              <span className="ml-4 font-mono text-xs text-white truncate">{profile.createdAt}</span>
            </div>
          </div>
          <button className="mt-6 w-full h-12 flex items-center justify-center bg-primary hover:bg-primary-dark text-background-dark text-sm font-bold uppercase tracking-[0.15em] transition-all shadow-lg hover:shadow-primary/20">
            <span className="material-symbols-outlined text-[18px] mr-2">edit_square</span>
            Chỉnh sửa hồ sơ
          </button>
        </div>
      </div>

      <div className="bg-[#1a1713] border border-border-color p-6 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 opacity-20"></div>
        <h4 className="text-white text-sm font-bold uppercase tracking-[0.2em] mb-6 border-b border-border-color pb-3">Tổng quan hồ sơ</h4>
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col">
            <span className="font-mono text-4xl font-light leading-none text-primary">{}</span>
            <span className="text-text-muted text-[10px] uppercase tracking-widest mt-2 font-mono">Tổng số đo</span>
          </div>
          <div className="flex flex-col pl-8 border-l border-border-color">
            <span className="font-mono text-4xl font-light leading-none text-primary">{}%</span>
            <span className="text-text-muted text-[10px] uppercase tracking-widest mt-2 font-mono">Độ hoàn thiện</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;