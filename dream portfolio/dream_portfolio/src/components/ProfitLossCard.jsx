import React, { memo } from "react";

const ProfitLossCard = memo(({ title, value, description, icon }) => {
  const num = parseFloat(value);
  const isPositive = num >= 0;
  const sign = isPositive ? "+" : "-";
  const absVal = Math.abs(num).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const colorClass = isPositive ? "text-green-700" : "text-red-500";

  return (
    <div className="m-4 p-4 rounded-2xl bg-green-100">
      <div className="flex justify-end">
        <div className="p-1 rounded-full bg-green-700">
          <img src={icon} alt={title} height={16} width={16} />
        </div>
      </div>
      <div className={`text-center text-4xl font-semibold ${colorClass}`}>
        {sign}₹{absVal}
      </div>
      <div className="mt-2">
        <p className="text-2xl font-semibold text-green-700">{title}</p>
        <p className="text-sm text-green-700 font-semibold">{description}</p>
      </div>
    </div>
  );
});

export default ProfitLossCard;
