import React, { useState, useEffect, useCallback, useMemo } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faHeart } from '@fortawesome/free-solid-svg-icons';
import Profit from '../assets/profit.png';
import Loss from '../assets/loss.png';
import Dollar from '../assets/dollar.png';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Input from '@mui/joy/Input';
import dayjs from 'dayjs';
import { toast } from 'react-toastify'
import ProfitLossCard from './ProfitLossCard'
import StockTable from "./StockTable";
import Note from "./Note"
import { useDispatch, useSelector } from 'react-redux'
import { addFav } from "../features/favrouiteSlice";
import { niftyFiftyStocks } from '../data/niftyFifty';

const HomePage = () => {
  const dispatch = useDispatch();
  const favouriteStocks = useSelector(state => state.favourite.dataFav);

  const [stocks, setStocks] = useState(() => {
    try {
      const saved = localStorage.getItem("homeStocks");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [isAddingStock, setIsAddingStock] = useState(false);
  const [currentStock, setCurrentStock] = useState({
    symbol: "",
    buyDate: null,
    sellDate: null,
    quantity: "",
  });

  const isFavorite = useMemo(() =>
    stocks.length > 0 && favouriteStocks.some(portfolio =>
      portfolio.length === stocks.length &&
      portfolio.every((s, i) => s.id === stocks[i].id)
    ),
  [favouriteStocks, stocks]);

  const toggleFavorite = () => {
    if (stocks.length <= 0) {
      toast.warning("Nothing is selected");
      return;
    }
    if (!isFavorite) {
      dispatch(addFav(stocks));
      toast.success("Added to favorite");
    }
  };

  const handleOpen = () => setModalOpen(true);

  const handleClose = () => {
    setModalOpen(false);
    setCurrentStock({ symbol: "", buyDate: null, sellDate: null, quantity: "" });
  };

  const handleInputChange = (e) => {
    setCurrentStock({ ...currentStock, [e.target.name]: e.target.value });
  };

  const handleDateChange = (field, date) => {
    setCurrentStock({ ...currentStock, [field]: date });
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value === "" || (value > 0 && value <= 100)) {
      setCurrentStock({ ...currentStock, quantity: value });
    } else {
      toast.warning("Exceeding 100 limit");
    }
  };

  const fetchStockData = async (isinCode, buyDate, sellDate) => {
    const upstoxAPI = `https://api.upstox.com/v2/historical-candle/NSE_EQ%7C${isinCode}/day/${sellDate}/${buyDate}`;

    try {
      const response = await fetch(upstoxAPI, {
        method: "GET",
        headers: { 'Accept': 'application/json' }
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();

      if (data.status !== "success" || !data.data?.candles?.length) {
        throw new Error("Invalid API response. Please check the date range.");
      }

      const candles = data.data.candles;
      const firstDay = candles[0];
      const lastDay = candles[candles.length - 1];
      const firstOpen = firstDay[1];
      const lastClose = lastDay[4];

      let highestHigh = -Infinity, highestHighDate = "";
      let lowestLow = Infinity, lowestLowDate = "";

      candles.forEach(candle => {
        const [date, , high, low] = candle;
        if (high > highestHigh) {
          highestHigh = high;
          highestHighDate = date.split("T")[0];
        }
        if (low < lowestLow) {
          lowestLow = low;
          lowestLowDate = date.split("T")[0];
        }
      });

      return { firstOpen, lastClose, highestHigh, highestHighDate, lowestLow, lowestLowDate };
    } catch (error) {
      toast.warn("Select a valid date range!");
      return null;
    }
  };

  const addStock = async () => {
    if (currentStock.symbol && currentStock.buyDate && currentStock.sellDate) {
      setIsAddingStock(true);
      try {
        const formattedBuyDate = dayjs(currentStock.buyDate).format('YYYY-MM-DD');
        const formattedSellDate = dayjs(currentStock.sellDate).format('YYYY-MM-DD');
        const logoURL = `https://logo.clearbit.com/${currentStock.symbol.toLowerCase()}.com`;
        const stockInfo = niftyFiftyStocks.find(stock => stock.symbol === currentStock.symbol);
        const isinCode = stockInfo ? stockInfo.isin_code : "N/A";

        if (isinCode === "N/A") {
          toast.warn("Stock ISIN code not found");
          return;
        }

        const stockData = await fetchStockData(isinCode, formattedBuyDate, formattedSellDate);
        if (!stockData) return;

        setStocks([...stocks, {
          ...currentStock,
          id: Date.now(),
          buyDate: formattedBuyDate,
          sellDate: formattedSellDate,
          logo: logoURL,
          isin_code: isinCode,
          ...stockData,
        }]);

        toast.success("Stock added successfully!");
        setCurrentStock({ symbol: "", buyDate: null, sellDate: null, quantity: "", logo: null });
        handleClose();
      } finally {
        setIsAddingStock(false);
      }
    }
  };

  const removeStock = useCallback((id) => {
    setStocks((prevStocks) => prevStocks.filter((stock) => stock.id !== id));
  }, []);

  const maxProfit = stocks.reduce((sum, stock) => {
    const highestHigh = stock.highestHigh || 0;
    const open = stock.firstOpen || 0;
    const quantity = stock.quantity || 0;
    return sum + ((highestHigh - open) * quantity);
  }, 0);

  const maxLoss = stocks.reduce((sum, stock) => {
    const lowestLow = stock.lowestLow || 0;
    const open = stock.firstOpen || 0;
    const quantity = stock.quantity || 0;
    return sum + Math.min(0, (lowestLow - open) * quantity);
  }, 0);

  const actualProfit = stocks.reduce(
    (sum, stock) => sum + ((stock.lastClose - stock.firstOpen) * stock.quantity),
    0
  );

  useEffect(() => {
    localStorage.setItem("homeStocks", JSON.stringify(stocks));
  }, [stocks]);

  useEffect(() => {
    if (!modalOpen) {
      setCurrentStock({ symbol: "", buyDate: null, sellDate: null, quantity: "" });
    }
  }, [modalOpen]);

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="container mx-auto px-4 py-8">

      {/* Hero Section */}
      <div className="text-center py-14 mb-4">
        <div className="inline-flex items-center gap-2 bg-green-100 border border-green-300 text-green-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 tracking-wide uppercase">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block"></span>
          Powered by Upstox Live Market Data
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 leading-[1.1]">
          <span className="text-green-900">Simulate Your</span>{" "}
          <span className="gradient-text">Stock Journey</span>
        </h1>
        <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed mb-8">
          Pick any <span className="font-semibold text-green-700">Nifty 50 stock</span>, set a buy &amp; sell date range, and instantly see your
          maximum potential gain, worst-case loss, and real-world outcome — no account needed.
        </p>
        <div className="flex flex-wrap gap-6 justify-center text-sm text-gray-400 font-medium">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>All 50 Nifty stocks</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Real historical OHLC data</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Unlimited portfolio size</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Save to Favourites</span>
          </div>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-green-100 p-6 mb-6">
        <h2 className="text-2xl font-bold text-green-800 mb-1">Pick Your Stocks</h2>
        <p className="text-sm text-gray-500 mb-4">
          Select any number of Nifty 50 stocks, set buy and sell dates, and calculate potential profit or loss.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border border-green-700 rounded-2xl">
          <div className="lg:rounded-l-2xl bg-white rounded-t-2xl">
            <ProfitLossCard
              title="Maximum Profit"
              value={maxProfit.toFixed(2)}
              description="You could make"
              icon={Profit}
            />
          </div>
          <div className="lg:border-l lg:border-r border-green-700 bg-white">
            <ProfitLossCard
              title="Maximum Loss"
              value={maxLoss.toFixed(2)}
              description="You could lose"
              icon={Loss}
            />
          </div>
          <div className="lg:rounded-r-2xl bg-white rounded-b-2xl">
            <ProfitLossCard
              title="In reality"
              value={actualProfit.toFixed(2)}
              description="You made"
              icon={Dollar}
            />
          </div>
        </div>

        {/* Stocks Section */}
        <div className="mt-6 bg-white rounded-2xl border border-green-700 p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-2xl font-bold text-green-700 mb-2">Select Stocks</h3>
            <FontAwesomeIcon
              icon={faHeart}
              className={`cursor-pointer transition-all text-2xl ${isFavorite ? "text-red-700" : "text-gray-400"}`}
              onClick={toggleFavorite}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {stocks.map((stock) => (
              <div
                key={stock.id}
                className="flex flex-col justify-between border bg-green-50 border-green-700 rounded-2xl p-2 shadow-lg"
              >
                <div className="flex justify-end">
                  <FontAwesomeIcon icon={faTrash} onClick={() => removeStock(stock.id)} className="text-gray-500 hover:text-red-900" />
                </div>
                <div className="flex justify-center items-center gap-2">
                  <img
                    src={stock.logo} loading="lazy"
                    alt={stock.symbol}
                    className="h-24 w-24 object-contain"
                  />
                </div>
                <div></div>
                <div className="mt-auto text-xs text-green-700">
                  <p className="text-lg font-bold text-green-800">{stock.symbol}</p>
                  <p><span className="font-semibold text-xs">Quantity:</span> {stock.quantity}</p>
                  <p><span className="font-semibold text-xs">Buying Date:</span> {stock.buyDate}</p>
                  <p><span className="font-semibold text-xs">Selling Date:</span> {stock.sellDate}</p>
                </div>
              </div>
            ))}

            <div className={`${stocks.length === 0 ? "w-full flex-col justify-center items-center " : " flex-col justify-center items-center "}`}>
              <div className={`${stocks.length === 0 ? "border-dotted border-2 border-green-700 py-16 px-8 rounded-2xl" : "border-dotted border-2 border-green-700 py-16 px-8 rounded-2xl h-full"}`}>
                <button
                  onClick={handleOpen}
                  className="bg-green-700 hover:bg-green-700 text-white rounded-full p-3 mx-auto flex items-center justify-center"
                  aria-label="Add stock"
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
                <p className="mt-1 text-green-700 font-semibold text-center">Add stock</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table section */}
      <div className="bg-green-50 rounded-2xl shadow-lg p-6 mb-8">
        <h3 className="text-2xl font-bold text-green-700 mb-2">Detail Table</h3>
        <StockTable stocks={stocks} />
      </div>

      {/* Note */}
      <div className="bg-green-50 rounded-2xl shadow-lg p-6 mb-8">
        <Note />
      </div>

      {/* Add Stock Modal */}
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="add-stock-modal"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-title" variant="h6" component="h2" sx={{ color: '#166534', fontWeight: 'bold' }}>
            Add a Stock
          </Typography>

          <TextField
            select
            label="Select Stock"
            name="symbol"
            value={currentStock.symbol}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
          >
            {niftyFiftyStocks.map((option) => (
              <MenuItem key={option.symbol} value={option.symbol}>
                {option.symbol}
              </MenuItem>
            ))}
          </TextField>

          <div className="mt-4">
            <Input
              placeholder="Enter quantity (max. 100)"
              value={currentStock.quantity}
              onChange={handleQuantityChange}
              type="number"
              className="p-3 text-black"
              inputprops={{ min: 1, max: 100 }}
            />
          </div>

          <div className="mt-4">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Buying Date"
                className="w-full"
                value={currentStock.buyDate}
                onChange={(date) => handleDateChange("buyDate", date)}
                minDate={dayjs("2003-01-01")}
                maxDate={dayjs()}
              />
            </LocalizationProvider>
          </div>

          <div className="mt-4">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Selling Date"
                className="w-full"
                value={currentStock.sellDate}
                minDate={currentStock.buyDate}
                onChange={(date) => handleDateChange("sellDate", date)}
                disabled={!currentStock.buyDate}
                maxDate={dayjs()}
              />
            </LocalizationProvider>
          </div>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button onClick={handleClose} sx={{ color: '#166534' }}>
              Cancel
            </Button>
            <Button
              onClick={addStock}
              variant="contained"
              sx={{
                bgcolor: '#166534',
                '&:hover': { bgcolor: '#14532d' }
              }}
              disabled={!currentStock.symbol || !currentStock.buyDate || !currentStock.sellDate || isAddingStock}
            >
              {isAddingStock ? "Adding…" : "Add Stock"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default HomePage;
