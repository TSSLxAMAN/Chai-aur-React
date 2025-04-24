import React, { memo } from "react";

const StockTable = memo(({ stocks }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-green-700 shadow-lg">
      <div className="w-full overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-green-100">
            <tr className="text-left">
              <th className="px-4 py-2 border-b border-r border-green-700 text-green-600 text-sm font-medium">Symbol</th>
              <th className="px-4 py-2 border-b border-r border-green-700 text-green-600 text-sm font-medium">ISIN Code</th>
              <th className="px-4 py-2 border-b border-r border-green-700 text-green-600 text-sm font-medium">Buy Date</th>
              <th className="px-4 py-2 border-b border-r border-green-700 text-green-600 text-sm font-medium">Sell Date</th>
              <th className="px-4 py-2 border-b border-r border-green-700 text-green-600 text-sm font-medium">First Open</th>
              <th className="px-4 py-2 border-b border-r border-green-700 text-green-600 text-sm font-medium">Last Close</th>
              <th className="px-4 py-2 border-b border-r border-green-700 text-green-600 text-sm font-medium">Highest High</th>
              <th className="px-4 py-2 border-b border-r border-green-700 text-green-600 text-sm font-medium">Date (High)</th>
              <th className="px-4 py-2 border-b border-r border-green-700 text-green-600 text-sm font-medium">Lowest Low</th>
              <th className="px-4 py-2 border-b border-green-700 text-green-600 text-sm font-medium">Date (Low)</th>
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
                  <td className="px-4 py-2 border-b border-r border-green-700 text-sm font-bold text-green-600">{stock.firstOpen}</td>
                  <td className="px-4 py-2 border-b border-r border-green-700 text-sm font-bold text-red-600">{stock.lastClose}</td>
                  <td className="px-4 py-2 border-b border-r border-green-700 text-sm font-bold text-blue-600">{stock.highestHigh}</td>
                  <td className="px-4 py-2 border-b border-r border-green-700 text-sm">{stock.highestHighDate}</td>
                  <td className="px-4 py-2 border-b border-r border-green-700 text-sm font-bold text-orange-600">{stock.lowestLow}</td>
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