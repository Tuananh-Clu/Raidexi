interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description }) => {
  return (
    <div className="flex gap-4">
      <div className="mt-1 text-primary shrink-0">
        {icon}
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-lg font-bold text-white font-display">{title}</p>
        <p className="font-sans text-sm leading-relaxed text-text-muted">{description}</p>
      </div>
    </div>
  );
};
