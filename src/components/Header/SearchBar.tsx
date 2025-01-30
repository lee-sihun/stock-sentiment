import Image from "next/image"

export default function SearchBar() {
  return (
    <div className="relative">
      <Image
        src="/svgs/search.svg"
        width={16}
        height={16}
        alt="search icon"
        className="absolute left-[11px] top-1/2 transform -translate-y-1/2 cursor-pointer"
      />
      <input
        className="bg-[#22222A] w-[240px] h-[36px] pl-[35px] pr-[11px] text-[#FFFFFF] text-[16px] rounded-lg outline-none placeholder:text-[#5C5F74]"
        placeholder="검색"
      />
    </div>
  );
}