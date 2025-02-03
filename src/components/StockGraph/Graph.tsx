"use client";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

type GraphData = {
  name: string;
  value: number;
};

export default function Graph({ data }: { data: GraphData[] }) {
  const positiveCount = data.filter((item) => item.value === 1).length;
  const neutralCount = data.filter((item) => item.value === 0).length;
  const negativeCount = data.filter((item) => item.value === -1).length;

  // 최대값 확인
  const maxCount = Math.max(positiveCount, neutralCount, negativeCount);

  // 색상 결정
  const graphColor =
    maxCount === positiveCount
      ? "#2FACA0"
      : maxCount === negativeCount
      ? "#E85451"
      : "#FFFFFF";

  return (
    <ResponsiveContainer width={"100%"} height={320}>
      <AreaChart
        data={data}
        margin={{ left: 10, right: 10, top: 10, bottom: -10 }}
      >
        <CartesianGrid
          horizontal={true}
          vertical={false}
          stroke="#4A4D56"
          strokeDasharray="4 2"
        />
        <XAxis
          dataKey="name"
          stroke="#aaa"
          axisLine={false}
          tickLine={false}
          padding={{ left: 10, right: 10 }}
          tick={{
            fontSize: 11,
            fontWeight: 400,
            fill: "#828898",
            opacity: 1,
          }}
        />
        <YAxis domain={[-1, 1]} hide />
        <Tooltip
          cursor={{
            stroke: "#4A4D56",
            strokeDasharray: "4 2",
          }}
          content={({ payload }) => {
            if (!payload || !payload[0]) return null;
            const value = payload[0].value;

            const sentiment =
              value === 1
                ? { text: "긍정", color: "#2FACA0" }
                : value === -1
                ? { text: "부정", color: "#E85451" }
                : { text: "중립", color: "#FFFFFF" };

            return (
              <div className="flex items-center px-3 py-1 bg-[#22222A] rounded-lg">
                <span style={{ color: sentiment.color }} className="text-[12px] font-semibold">
                  {sentiment.text}
                </span>
              </div>
            );
          }}
        />
        <Area
          type="linear"
          dataKey="value"
          stroke={graphColor}
          strokeWidth={3}
          fill={graphColor}
          fillOpacity={0.15}
          // @ts-expect-error 타입 에러
          dot={<Dot color={graphColor} />}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function Dot({ cx, cy, color }: { cx: number; cy: number; color: string }) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={4.5}
      stroke={color}
      strokeWidth={2}
      fill="white"
    />
  );
}
