import React, { memo } from "react";

const StockTable = memo(({ stocks }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-green-700 shadow-lg">
      <div className="w-full overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-green-100">
            <tr className="text-left">
              <th className="px-4 py-2 border-b border-r border-green-700 text-green-700 text-sm font-semibold">Symbol</th>
              <th className="px-4 py-2 border-b border-r border-green-700 text-green-700 text-sm font-semibold">ISIN Code</th>
              <th className="px-4 py-2 border-b border-r border-green-700 text-green-700 text-sm font-semibold">Buy Date</th>
              <th className="px-4 py-2 border-b border-r border-green-700 text-green-700 text-sm font-semibold">Sell Date</th>
              <th className="px-4 py-2 border-b border-r border-green-700 text-green-700 text-sm font-semibold">First Open</th>
              <th className="px-4 py-2 border-b border-r border-green-700 text-green-700 text-sm font-semibold">Last Close</th>
              <th className="px-4 py-2 border-b border-r border-green-700 text-green-700 text-sm font-semibold">Highest High</th>
              <th className="px-4 py-2 border-b border-r border-green-700 text-green-700 text-sm font-semibold">Date (High)</th>
              <th className="px-4 py-2 border-b border-r border-green-700 text-green-700 text-sm font-semibold">Lowest Low</th>
              <th className="px-4 py-2 border-b border-green-700 text-green-700 text-sm font-semibold">Date (Low)</th>
            </tr>
          </thead>
          <tbody>
            {stocks.length > 0 ? (
              stocks.map((stock) => (
                <tr key={stock.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b border-r border-green-700 text-sm font-semibold">{stock.symbol}</td>
                  <td className="px-4 py-2 border-b border-r border-green-700 text-sm">{stock.isin_code}</td>
                  <td className="px-4 py-2 border-b border-r border-green-700 text-sm">{stock.buyDate}</td>
                  <td className="px-4 py-2 border-b border-r border-green-700 text-sm">{stock.sellDate}</td>
                  <td className="px-4 py-2 border-b border-r border-green-700 text-sm font-bold text-green-700">{stock.firstOpen}</td>
                  <td className="px-4 py-2 border-b border-r border-green-700 text-sm font-bold text-red-700">{stock.lastClose}</td>
                  <td className="px-4 py-2 border-b border-r border-green-700 text-sm font-bold text-blue-700">{stock.highestHigh}</td>
                  <td className="px-4 py-2 border-b border-r border-green-700 text-sm">{stock.highestHighDate}</td>
                  <td className="px-4 py-2 border-b border-r border-green-700 text-sm font-bold text-orange-700">{stock.lowestLow}</td>
                  <td className="px-4 py-2 border-b border-green-700 text-sm">{stock.lowestLowDate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center py-4 text-gray-500">
                  No stocks added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default StockTable;