import React, { memo } from "react";

const ProfitLossCard = memo(({ title, value, description, icon }) => {
  return (
    <div className="m-4 p-4 rounded-2xl bg-green-100">
      <div className="flex justify-end">
        <div className="p-1 rounded-full bg-green-700">
          <img src={icon} alt={title} height={16} width={16} />
        </div>
      </div>
      <div className="text-center text-4xl text-green-700 font-semibold">
        ₹{value}
      </div>
      <div className="mt-2">
        <p className="text-2xl font-semibold text-green-700">{title}</p>
        <p className="text-sm text-green-700 font-semibold">{description}</p>
      </div>
    </div>
  );
});

export default ProfitLossCard;