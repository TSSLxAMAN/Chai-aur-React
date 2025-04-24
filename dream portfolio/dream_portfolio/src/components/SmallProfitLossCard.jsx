import React, {memo, useMemo} from 'react';

const SmallProfitLossCard = memo(({ title, value, description, icon }) => {
  return (
    <div className="m-2 p-2 rounded-xl bg-green-50">
      <div className="flex items-center">
        <div>
          <div className="p-1 rounded-full bg-green-700">
            <img src={icon} alt={title} loading='lazy' height={16} width={16} />
          </div>
        </div>
        <div className="ms-5 text-xl text-green-700 font-bold">
          ₹{value}
        </div>
      </div>
      <div className="mt-2">
        <p className="text-sm font-semibold text-green-700">
          {title} {description}
        </p>
      </div>
    </div>
  );
});

export default SmallProfitLossCard;