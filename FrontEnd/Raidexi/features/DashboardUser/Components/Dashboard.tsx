import { MeasurementDataResponse } from "@/features/Camera/types";
import { useRouterService } from "@/Shared/Service/routerService";

const Dashboard = ({
  dataMeasurements,
}: {
  dataMeasurements?: MeasurementDataResponse;
}) => {
  const data = [
    {
      label: "Vòng ngực (Chest)",
      value: dataMeasurements?.chest,
      unit: "CM",
      icons: "accessibility_new",
    },
    {
      label: "Vòng eo (Waist)",
      value: dataMeasurements?.waist,
      unit: "CM",
      icons: "straighten",
    },
    {
      label: "Vòng hông (Hip)",
      value: dataMeasurements?.hip,
      unit: "CM",
      icons: "boy",
    },
    {
      label: "Chiều rộng vai (Shoulder Width)",
      value: dataMeasurements?.shoulderWidth,
      unit: "CM",
      icons: "pan_tool",
    },
  ];
  const {navigate}=useRouterService();
  return (
    <div className="flex flex-col h-full gap-8 lg:col-span-8">
      <div className="relative flex flex-col flex-1 border border-border-color bg-background-card">
        <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-l border-t border-primary z-10"></div>
        <div className="absolute -top-[1px] -right-[1px] w-4 h-4 border-r border-t border-primary z-10"></div>

        {/* Action Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 border-b border-border-color bg-[#1a1713]">
          <div className="flex items-center gap-3 mb-4 sm:mb-0">
            <h3 className="text-xl font-bold tracking-widest uppercase text-primary">
              Dữ liệu số đo cơ thể
            </h3>
          </div>
          <div className="flex w-full gap-3 sm:w-auto">
            <button className="flex items-center justify-center flex-1 h-10 px-5 font-mono text-xs font-bold tracking-wider uppercase transition-colors border sm:flex-none border-primary text-primary hover:bg-primary hover:text-background-dark">
              <span className="material-symbols-outlined text-[16px] mr-2">
                history
              </span>
              Lịch sử
            </button>
            <button className="flex items-center justify-center flex-1 h-10 px-5 font-mono text-xs font-bold tracking-wider uppercase transition-colors sm:flex-none bg-primary hover:bg-primary-dark text-background-dark">
              <span className="material-symbols-outlined text-[16px] mr-2">
                add
              </span>
              + Thêm mới
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 border-b md:grid-cols-12 border-border-color">
          <div className="md:col-span-4 bg-[#15120f] border-r border-border-color p-6 flex flex-col justify-between items-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-grid-pattern"></div>
            <div className="relative z-10 flex flex-col items-center w-full h-full">
              <div className="relative w-full p-4 border border-dashed aspect-3/4 border-border-highlight/50">
                <img
                  alt="Body Wireframe"
                  className="object-contain w-full h-full opacity-60 sepia mix-blend-screen invert"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4qfSUw5zWPVAOhFZg_VAQAZHSY1GK2pFSNpQ7bDCMoP8yl6zq_8FoyvYXzUeMXlygv21KIEDBRMYAVHz0i7KjL9uVFBX9dPLhLyVhVJHkJIwwrinOycavRd4qGDGh3vZRjjz_Gm0KeT94i_vBnQyvYheLAJidFSbARvhJu70Piw16QprBODqLrAoAQV39HdHq1knV4f4rGj9ZD0n0hY-h5JPTCkBWK2jiSK7a-sJbDF8pbLTARAeUbOfRi5s77AcKimCHMI6qgIyE"
                />
                <div className="absolute top-2 left-2 text-[8px] text-primary font-mono bg-background-dark px-1 border border-primary/30">
                  FIG. 1.2
                </div>
              </div>
              <div className="mt-6 w-full text-center border-t border-border-color pt-4 bg-[#181511]/80 backdrop-blur-sm border-b border-border-color pb-4">
                <span className="text-text-main text-xs uppercase tracking-[0.2em] block mb-2 font-bold">
                  Chiều cao (Height)
                </span>
                <span className="font-mono text-4xl tracking-tight text-primary">
                  {dataMeasurements?.height} <span className="ml-1 text-sm text-text-muted">CM</span>
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-px md:col-span-8 sm:grid-cols-2 bg-border-color">
            {data.map((dataMeasurements) => (
              
              <div className="bg-background-card p-6 flex flex-col justify-between h-full hover:bg-[#2a251e] transition-colors group">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs tracking-widest uppercase transition-colors text-text-muted group-hover:text-primary">
                    {dataMeasurements.label}- {dataMeasurements.unit}
                  </span>
                  <span className="text-xl material-symbols-outlined text-text-muted/30">
                    {dataMeasurements.icons}
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mt-4">
                  <span className="font-mono text-4xl font-light text-white">
                    {dataMeasurements.value}
                  </span>
                  <span className="font-mono text-sm text-text-muted">
                    {dataMeasurements.unit}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border border-border-color bg-[#1f1b16] p-6 flex flex-col sm:flex-row items-center justify-between gap-6 relative">
        <div className="absolute top-0 bottom-0 left-0 w-1 bg-primary"></div>
        <div className="flex items-center gap-4">
          <div className="p-3 border bg-background-dark border-border-color">
            <span className="material-symbols-outlined text-primary text-[24px]">
              description
            </span>
          </div>
          <div>
            <p className="mb-1 text-lg font-bold tracking-wider text-white uppercase">
              Xuất dữ liệu
            </p>
            <p className="text-[10px] font-mono text-text-muted uppercase tracking-widest">
              Định dạng hỗ trợ: CSV, PDF, XML
            </p>
          </div>
        </div>
        <div className="flex w-full gap-3 sm:w-auto">
          <button onClick={()=>navigate('/PreviewMeasurement')} className="flex items-center justify-center flex-1 h-10 px-6 font-mono text-xs font-bold tracking-wider uppercase transition-colors border sm:flex-none border-primary text-primary hover:bg-primary/10">
            Xem trước
          </button>
          <button className="flex items-center justify-center flex-1 h-10 px-6 font-mono text-xs font-bold tracking-wider uppercase transition-colors sm:flex-none bg-primary hover:bg-primary-dark text-background-dark">
            Tải xuống
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
