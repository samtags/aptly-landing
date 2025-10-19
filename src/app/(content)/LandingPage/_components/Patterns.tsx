export default function Patterns() {
  return (
    <div className="bg-pattern">
      <div className="horizontal-elements relative">
        <div className="left-[-12px] absolute z-10 top-[-12px]">
          <Ball />
        </div>
        <div className="right-[-12px] absolute z-10 top-[-12px]">
          <Ball />
        </div>
      </div>
      <div className="horizontal-line" />
      <div className="verticle-lines">
        <div className="left" />
        <div className="right" />
      </div>
    </div>
  );
}

function Ball() {
  return (
    <div className="w-[24px] h-[24px] rounded-full bg-white flex items-center justify-center">
      <div className="w-[12px] h-[12px] rounded-full bg-[#f9fafb] border-[#e5eaf0] border" />
    </div>
  );
}
