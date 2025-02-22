"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "nextjs-toploader/app";
import { useStocksList } from "@/hooks/useStocksList";
import { useDebounce } from "@/hooks/useDebounce";
import Search from "@public/svgs/search.svg";

export default function SearchBar() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { data: stocks } = useStocksList();

  const filteredStocks = useMemo(
    () =>
      stocks
        ?.filter(
          (stock) =>
            stock.name
              .toLowerCase()
              .includes(debouncedSearchTerm.toLowerCase()) ||
            stock.symbol
              .toLowerCase()
              .includes(debouncedSearchTerm.toLowerCase())
        )
        .slice(0, 5),
    [stocks, debouncedSearchTerm]
  );

  useEffect(() => {
    // filteredStocks가 변경될 때마다 selectedIndex를 리셋하거나 조정
    if (filteredStocks) {
      if (selectedIndex >= filteredStocks.length) {
        setSelectedIndex(Math.max(0, filteredStocks.length - 1));
      }
    } else {
      setSelectedIndex(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredStocks]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || !filteredStocks?.length) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredStocks.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case "Enter":
        if (selectedIndex >= 0) {
          router.push(`/stocks/${filteredStocks[selectedIndex].symbol}`);
        } else if (filteredStocks[0]) {
          router.push(`/stocks/${filteredStocks[0].symbol}`);
        }
        setIsOpen(false);
        setSearchTerm("");
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
      case "Escape":
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  return (
    <div className="relative">
      <Search className="absolute left-[11px] top-1/2 transform -translate-y-1/2 cursor-pointer" />
      <input
        ref={inputRef}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        className={`bg-[#22222A] w-[240px] max-[1248px]:w-[184px] h-[36px] pl-[35px] pr-[11px] text-[#FFFFFF] text-[16px] outline-none placeholder:text-[#5C5F74] ${
          isOpen && filteredStocks && filteredStocks.length > 0
            ? "rounded-t-lg"
            : "rounded-lg"
        }`}
        placeholder="검색"
      />
      {isOpen && filteredStocks && filteredStocks.length > 0 && (
        <ul className="z-10 absolute top-full left-0 right-0 bg-[#22222A] rounded-b-lg overflow-hidden border-t border-[#5C5F74] px-[4px] py-[4px]">
          {filteredStocks.map((stock, index) => (
            <li
              key={stock.symbol}
              onClick={() => {
                router.push(`/stocks/${stock.symbol}`);
                setIsOpen(false);
                setSearchTerm("");
                setSelectedIndex(-1);
              }}
              onMouseEnter={() => setSelectedIndex(index)}
              className={`relative rounded-[4px] h-[28px] flex items-center pl-[7px] gap-[8px] pr-[11px] cursor-pointer hover:bg-[#16161D] ${
                selectedIndex === index ? "bg-[#16161D]" : ""
              }`}
            >
              <Search className="flex-shrink-0" />
              <span className="text-[#FFFFFF] text-[16px] truncate">
                {stock.name}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
