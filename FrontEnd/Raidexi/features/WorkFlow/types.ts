interface DiagramNodeProps {
  icon: React.ReactNode;
  step: string;
  title: string;
  subHeader: string;
  description: string;
  variant?: 'default' | 'active';
  cornerMark?: 'top-right' | 'bottom-left' | 'none';
  pulseReversed?: boolean;
}