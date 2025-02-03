const timeRanges = [
  // { label: "3시간", value: "3h" },
  { label: "24시간", value: "24h" },
  { label: "7일", value: "7d" },
  // { label: "1개월", value: "1m" },
  // { label: "3개월", value: "3m" },
  // { label: "1년", value: "1y" },
];

export default function TimeRangeSelector({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: (value: string) => void;
}) {
  return (
    <div className="flex items-center bg-[#22222A] h-[40px] rounded-lg px-[5px]">
      {timeRanges.map((range) => (
        <button
          key={range.value}
          onClick={() => setSelected(range.value)}
          className={`flex items-center justify-center px-[12px] h-[30px] rounded-md transition text-[14px] font-semibold ${
            selected === range.value
              ? "bg-[#0F0F11] text-white"
              : "text-[#AAAFBE] hover:text-white"
          }`}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
}
