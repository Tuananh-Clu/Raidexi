
interface DiagramLayerProps {
  layerNumber: string;
  title: string;
  description: React.ReactNode;
  label: string;
  borderColorClass?: string;
  dotColorClass: string;
  children: React.ReactNode;
}