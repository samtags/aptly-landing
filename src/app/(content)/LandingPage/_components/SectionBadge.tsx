interface SectionBadgeProps {
  Icon: React.ElementType;
  title: string;
  strokeWidth?: number;
}

export function SectionBadge({
  Icon,
  title,
  strokeWidth = 0.5,
}: SectionBadgeProps) {
  return (
    <div className="text-[#333842] font-InterMedium text-[12px] border-[#d9dfe8] border rounded-full pt-[6px] pl-[12px] pb-[6px] pr-[16px] flex items-center gap-2">
      <Icon strokeWidth={strokeWidth} className="text-[#133cf0] text-[20px]" />
      {title}
    </div>
  );
}
