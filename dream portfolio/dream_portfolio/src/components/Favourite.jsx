import React, { useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFav } from "../features/favrouiteSlice";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faHeart, faArrowLeft, faChartLine } from '@fortawesome/free-solid-svg-icons';
import Profit from '../assets/profit.png';
import Loss from '../assets/loss.png';
import Dollar from '../assets/dollar.png';

const PLCard = ({ title, value, description, icon, alwaysPositive }) => {
  const num = parseFloat(value);
  const isPositive = num >= 0;

  const colorClass = alwaysPositive
    ? 'text-green-600'
    : isPositive ? 'text-green-600' : 'text-red-500';

  const bgClass = alwaysPositive
    ? 'bg-green-50 border-green-200'
    : isPositive ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200';

  const sign = alwaysPositive ? '+' : isPositive ? '+' : '-';
  const absVal = Math.abs(num).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className={`p-4 rounded-xl border ${bgClass} flex flex-col gap-2`}>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center border border-gray-100">
          <img src={icon} alt={title} width={13} height={13} />
        </div>
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{title}</span>
      </div>
      <div className={`text-2xl font-bold tracking-tight ${colorClass}`}>
        {sign}₹{absVal}
      </div>
      <div className="text-xs text-gray-400">{description}</div>
    </div>
  );
};

const Favourite = () => {
  const dispatch = useDispatch();
  const favouriteStocks = useSelector(state => state.favourite.dataFav);

  const handleRemoveFav = useCallback((index) => {
    dispatch(removeFav(index));
    toast.success("Portfolio removed");
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">

      {/* Page Header */}
      <div className="mb-8 py-10 text-center">
        <div className="inline-flex items-center gap-2 bg-green-100 border border-green-300 text-green-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
          <FontAwesomeIcon icon={faHeart} className="text-green-500 text-[10px]" />
          Saved Portfolios
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-3">
          Your <span className="gradient-text">Watchlist</span>
        </h1>
        <p className="text-sm text-gray-400 max-w-md mx-auto">
          Every portfolio you've saved for comparison. Remove any time, or head back to build a new one.
        </p>
        {favouriteStocks.length > 0 && (
          <p className="mt-3 text-xs text-gray-400 font-medium">
            {favouriteStocks.length} portfolio{favouriteStocks.length > 1 ? 's' : ''} saved
          </p>
        )}
      </div>

      {favouriteStocks.length > 0 ? (
        <div className="space-y-5">
          {favouriteStocks.map((stocksRow, rowIndex) => {
            let totalProfit = 0;
            let totalLoss = 0;
            let totalReality = 0;

            stocksRow.forEach((stock) => {
              const qty   = parseFloat(stock.quantity);
              const open  = parseFloat(stock.firstOpen);
              const high  = parseFloat(stock.highestHigh);
              const low   = parseFloat(stock.lowestLow);
              const close = parseFloat(stock.lastClose);
              totalProfit  += (high - open) * qty;
              totalLoss    += Math.min(0, (low - open) * qty);
              totalReality += (close - open) * qty;
            });

            return (
              <div
                key={rowIndex}
                className="bg-white/80 backdrop-blur-sm rounded-2xl border border-green-100 shadow-sm overflow-hidden"
              >
                {/* Card header */}
                <div className="flex items-center justify-between px-5 py-3 bg-green-50/60 border-b border-green-100">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full">
                      Portfolio #{rowIndex + 1}
                    </span>
                    <span className="text-xs text-gray-400">
                      {stocksRow.length} stock{stocksRow.length > 1 ? 's' : ''}
                    </span>
                  </div>
                  <button
                    onClick={() => handleRemoveFav(rowIndex)}
                    className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-500 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50 font-medium"
                  >
                    <FontAwesomeIcon icon={faTrash} className="text-[11px]" />
                    Remove
                  </button>
                </div>

                <div className="p-5">
                  {/* Stock chips */}
                  <div className="flex flex-wrap gap-3 mb-5">
                    {stocksRow.map((stock) => (
                      <div
                        key={stock.id}
                        className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl p-3"
                      >
                        <img
                          src={stock.logo}
                          alt={stock.symbol}
                          loading="lazy"
                          className="h-10 w-10 object-contain rounded-lg bg-white p-0.5 border border-gray-100 shadow-sm"
                          onError={(e) => {
                            e.target.replaceWith(
                              Object.assign(document.createElement('div'), {
                                className: 'h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center text-green-700 font-bold text-xs',
                                textContent: stock.symbol.slice(0, 3),
                              })
                            );
                          }}
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-gray-800">{stock.symbol}</p>
                          <p className="text-xs text-gray-400">Qty: <span className="font-semibold text-gray-600">{stock.quantity}</span></p>
                          <p className="text-xs text-gray-400">{stock.buyDate} → {stock.sellDate}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* P&L cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <PLCard
                      title="Max Profit"
                      value={totalProfit.toFixed(2)}
                      description="Best possible exit"
                      icon={Profit}
                      alwaysPositive
                    />
                    <PLCard
                      title="Max Loss"
                      value={totalLoss.toFixed(2)}
                      description="Worst possible exit"
                      icon={Loss}
                    />
                    <PLCard
                      title="Reality"
                      value={totalReality.toFixed(2)}
                      description="Open → Close P&L"
                      icon={Dollar}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center mb-5 shadow-sm">
            <FontAwesomeIcon icon={faHeart} className="text-green-300 text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Nothing saved yet</h2>
          <p className="text-gray-400 text-sm max-w-xs mb-6 leading-relaxed">
            Build a portfolio on the Home page and tap the{" "}
            <FontAwesomeIcon icon={faHeart} className="text-red-400 mx-0.5" />{" "}
            heart icon to save it here for later.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
            Build a Portfolio
          </Link>
        </div>
      )}
    </div>
  );
};

export default Favourite;
