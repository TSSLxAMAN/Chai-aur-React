import React, { useCallback } from "react";
import { useSelector } from 'react-redux';
import SmallProfitLossCard from "./SmallProfitLossCard";
import Profit from '../assets/profit.png';
import Loss from '../assets/loss.png';
import Dollar from '../assets/dollar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux'
import { removeFav } from "../features/favrouiteSlice";
import { toast } from "react-toastify";

const Favourite = () => {
  const dispatch = useDispatch()
  const favouriteStocks = useSelector(state => state.favourite.dataFav);

  const handelRemoveFav = useCallback((stockInfo) => {
    dispatch(removeFav(stockInfo));
    toast.success("Removed from Fav");
  }, [dispatch]);
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-green-50 rounded-2xl shadow-lg p-6 mb-6">
          {
            favouriteStocks.length > 0 ? (
              <div className="space-y-4">
                {favouriteStocks.map((stocksRow, rowIndex) => {
                  let totalProfit = 0;
                  let totalLoss = 0;
                  let totalReality = 0;

                  stocksRow.forEach((stock) => {
                    const quantity = parseFloat(stock.quantity);
                    const firstOpen = parseFloat(stock.firstOpen);
                    const highestHigh = parseFloat(stock.highestHigh);
                    const lowestLow = parseFloat(stock.lowestLow);
                    const lastClose = parseFloat(stock.lastClose);

                    const profit = (highestHigh - firstOpen) * quantity;
                    const loss = (lowestLow - firstOpen) * quantity;
                    const reality = (lastClose - firstOpen) * quantity;

                    totalProfit += profit;
                    totalLoss += loss;
                    totalReality += reality;
                  });

                  return (
                    <div key={rowIndex} className="p-4 rounded-2xl bg-white shadow-lg">
                      <div className="flex justify-end p-1">
                        <FontAwesomeIcon icon={faTrash} className="text-gray-500 cursor-pointer  hover:text-red-900"
                          onClick={() => handelRemoveFav(stocksRow)} />
                      </div>
                      <div className="flex flex-wrap justify-center gap-4 mb-4">
                        {/* Stock cards */}
                        {stocksRow.map((stock) => (
                          <div
                            key={stock.id}
                            className="border bg-green-50 border-green-700 rounded-2xl p-2 shadow-lg w-full sm:w-40"
                          >
                            <div className="flex justify-center items-center gap-2">
                              <img
                                src={stock.logo}
                                alt={stock.symbol}
                                loading="lazy"
                                className="h-20 w-20 object-contain"
                              />
                            </div>

                            <div className="mt-auto text-xs text-green-700">
                              <p className="text-lg font-bold text-green-800">{stock.symbol}</p>
                              <p><span className="font-semibold text-xs">Quantity:</span> {stock.quantity}</p>
                              <p><span className="font-semibold text-xs">Buying Date:</span> {stock.buyDate}</p>
                              <p><span className="font-semibold text-xs">Selling Date:</span> {stock.sellDate}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Profit/Loss/Reality Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border border-green-700 rounded-2xl bg-green-50 overflow-hidden">
                        <div className="bg-white rounded-2xl sm:rounded-none sm:rounded-tl-2xl lg:rounded-l-2xl">
                          <SmallProfitLossCard
                            title="Maximum Profit"
                            value={totalProfit.toFixed(2)}
                            description="you could have made"
                            icon={Profit}
                          />
                        </div>
                        <div className="bg-white rounded-2xl sm:rounded-none sm:rounded-tr-2xl lg:rounded-none border-green-700 lg:border-l lg:border-r">
                          <SmallProfitLossCard
                            title="Maximum Loss"
                            value={totalLoss.toFixed(2)}
                            description="you could have faced"
                            icon={Loss}
                          />
                        </div>
                        <div className="bg-white rounded-2xl sm:rounded-none sm:rounded-b-2xl lg:rounded-r-2xl">
                          <SmallProfitLossCard
                            title="Reality"
                            value={totalReality.toFixed(2)}
                            description="actual gain/loss"
                            icon={Dollar}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}

              </div>
            ) : (
              <p className="text-center">No Favourites Yet</p>
            )
          }
        </div>
      </div>
    </>
  );
};

export default Favourite;