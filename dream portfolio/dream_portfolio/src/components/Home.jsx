import React, { useState, useEffect, useCallback } from "react";
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
import { useDispatch } from 'react-redux'
import { addFav } from "../features/favrouiteSlice";

const HomePage = () => {
  const dispatch = useDispatch()
  const [stocks, setStocks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentStock, setCurrentStock] = useState({
    symbol: "",
    buyDate: null,
    sellDate: null,
    quantity: "",
  });
  const niftyFiftyStocks = [
    {
      "company_name": "Adani Enterprises Ltd.",
      "symbol": "ADANIENT",
      "isin_code": "INE423A01024"
    },
    {
      "company_name": "Adani Ports & Special Economic Zone Ltd.",
      "symbol": "ADANIPORTS",
      "isin_code": "INE742F01042"
    },
    {
      "company_name": "Apollo Hospitals Enterprise Ltd.",
      "symbol": "APOLLOHOSP",
      "isin_code": "INE437A01024"
    },
    {
      "company_name": "Asian Paints Ltd.",
      "symbol": "ASIANPAINT",
      "isin_code": "INE021A01026"
    },
    {
      "company_name": "Axis Bank Ltd.",
      "symbol": "AXISBANK",
      "isin_code": "INE238A01034"
    },
    {
      "company_name": "Bajaj Auto Ltd.",
      "symbol": "BAJAJ-AUTO",
      "isin_code": "INE917I01010"
    },
    {
      "company_name": "Bajaj Finance Ltd.",
      "symbol": "BAJFINANCE",
      "isin_code": "INE296A01024"
    },
    {
      "company_name": "Bajaj Finserv Ltd.",
      "symbol": "BAJAJFINSV",
      "isin_code": "INE918I01026"
    },
    {
      "company_name": "Bharat Petroleum Corporation Ltd.",
      "symbol": "BPCL",
      "isin_code": "INE029A01011"
    },
    {
      "company_name": "Bharti Airtel Ltd.",
      "symbol": "BHARTIARTL",
      "isin_code": "INE397D01024"
    },
    {
      "company_name": "Britannia Industries Ltd.",
      "symbol": "BRITANNIA",
      "isin_code": "INE216A01030"
    },
    {
      "company_name": "Cipla Ltd.",
      "symbol": "CIPLA",
      "isin_code": "INE059A01026"
    },
    {
      "company_name": "Coal India Ltd.",
      "symbol": "COALINDIA",
      "isin_code": "INE522F01014"
    },
    {
      "company_name": "Divi's Laboratories Ltd.",
      "symbol": "DIVISLAB",
      "isin_code": "INE361B01024"
    },
    {
      "company_name": "Dr. Reddy's Laboratories Ltd.",
      "symbol": "DRREDDY",
      "isin_code": "INE089A01031"
    },
    {
      "company_name": "Eicher Motors Ltd.",
      "symbol": "EICHERMOT",
      "isin_code": "INE066A01021"
    },
    {
      "company_name": "Grasim Industries Ltd.",
      "symbol": "GRASIM",
      "isin_code": "INE047A01021"
    },
    {
      "company_name": "HCL Technologies Ltd.",
      "symbol": "HCLTECH",
      "isin_code": "INE860A01027"
    },
    {
      "company_name": "HDFC Bank Ltd.",
      "symbol": "HDFCBANK",
      "isin_code": "INE040A01034"
    },
    {
      "company_name": "HDFC Life Insurance Company Ltd.",
      "symbol": "HDFCLIFE",
      "isin_code": "INE795G01014"
    },
    {
      "company_name": "Hero MotoCorp Ltd.",
      "symbol": "HEROMOTOCO",
      "isin_code": "INE158A01026"
    },
    {
      "company_name": "Hindalco Industries Ltd.",
      "symbol": "HINDALCO",
      "isin_code": "INE038A01020"
    },
    {
      "company_name": "Hindustan Unilever Ltd.",
      "symbol": "HINDUNILVR",
      "isin_code": "INE030A01027"
    },
    {
      "company_name": "ICICI Bank Ltd.",
      "symbol": "ICICIBANK",
      "isin_code": "INE090A01021"
    },
    {
      "company_name": "ITC Ltd.",
      "symbol": "ITC",
      "isin_code": "INE154A01025"
    },
    {
      "company_name": "IndusInd Bank Ltd.",
      "symbol": "INDUSINDBK",
      "isin_code": "INE095A01012"
    },
    {
      "company_name": "Infosys Ltd.",
      "symbol": "INFY",
      "isin_code": "INE009A01021"
    },
    {
      "company_name": "JSW Steel Ltd.",
      "symbol": "JSWSTEEL",
      "isin_code": "INE019A01038"
    },
    {
      "company_name": "Kotak Mahindra Bank Ltd.",
      "symbol": "KOTAKBANK",
      "isin_code": "INE237A01028"
    },
    {
      "company_name": "LTIMindtree Ltd.",
      "symbol": "LTIM",
      "isin_code": "INE214T01019"
    },
    {
      "company_name": "Larsen & Toubro Ltd.",
      "symbol": "LT",
      "isin_code": "INE018A01030"
    },
    {
      "company_name": "Mahindra & Mahindra Ltd.",
      "symbol": "M&M",
      "isin_code": "INE101A01026"
    },
    {
      "company_name": "Maruti Suzuki India Ltd.",
      "symbol": "MARUTI",
      "isin_code": "INE585B01010"
    },
    {
      "company_name": "NTPC Ltd.",
      "symbol": "NTPC",
      "isin_code": "INE733E01010"
    },
    {
      "company_name": "Nestle India Ltd.",
      "symbol": "NESTLEIND",
      "isin_code": "INE239A01024"
    },
    {
      "company_name": "Oil & Natural Gas Corporation Ltd.",
      "symbol": "ONGC",
      "isin_code": "INE213A01029"
    },
    {
      "company_name": "Power Grid Corporation of India Ltd.",
      "symbol": "POWERGRID",
      "isin_code": "INE752E01010"
    },
    {
      "company_name": "Reliance Industries Ltd.",
      "symbol": "RELIANCE",
      "isin_code": "INE002A01018"
    },
    {
      "company_name": "SBI Life Insurance Company Ltd.",
      "symbol": "SBILIFE",
      "isin_code": "INE123W01016"
    },
    {
      "company_name": "Shriram Finance Ltd.",
      "symbol": "SHRIRAMFIN",
      "isin_code": "INE721A01013"
    }, {
      "company_name": "State Bank of India",
      "symbol": "SBIN",
      "isin_code": "INE062A01020"
    },
    {
      "company_name": "Sun Pharmaceutical Industries Ltd.",
      "symbol": "SUNPHARMA",
      "isin_code": "INE044A01036"
    },
    {
      "company_name": "Tata Consultancy Services Ltd.",
      "symbol": "TCS",
      "isin_code": "INE467B01029"
    },
    {
      "company_name": "Tata Consumer Products Ltd.",
      "symbol": "TATACONSUM",
      "isin_code": "INE192A01025"
    },
    {
      "company_name": "Tata Motors Ltd.",
      "symbol": "TATAMOTORS",
      "isin_code": "INE155A01022"
    },
    {
      "company_name": "Tata Steel Ltd.",
      "symbol": "TATASTEEL",
      "isin_code": "INE081A01020"
    },
    {
      "company_name": "Tech Mahindra Ltd.",
      "symbol": "TECHM",
      "isin_code": "INE669C01036"
    },
    {
      "company_name": "Titan Company Ltd.",
      "symbol": "TITAN",
      "isin_code": "INE280A01028"
    },
    {
      "company_name": "UltraTech Cement Ltd.",
      "symbol": "ULTRACEMCO",
      "isin_code": "INE481G01011"
    },
    {
      "company_name": "Wipro Ltd.",
      "symbol": "WIPRO",
      "isin_code": "INE075A01022"
    }
  ]
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    if (stocks.length <= 0) {
      toast.warning("Nothing is selected")
      return
    }
    if (isFavorite != true) {
      dispatch(addFav(stocks));
      setIsFavorite(true);
      toast.success("Added to favorite");
    }
  };

  const handleOpen = () => setModalOpen(true);

  const handleClose = () => {
    setModalOpen(false);
    // Reset form when closing
    setCurrentStock({ symbol: "", buyDate: null, sellDate: null, quantity: "0" });
  };

  const handleInputChange = (e) => {
    setCurrentStock({ ...currentStock, [e.target.name]: e.target.value });
  };

  const handleDateChange = (field, date) => {
    setCurrentStock({ ...currentStock, [field]: date });
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value >= 0 && value <= 100) {
      setCurrentStock({ ...currentStock, quantity: value });
    } else {
      toast.warning("Exceeding 100 limit")
    }
  };

  const fetchStockData = async (isinCode, buyDate, sellDate) => {
    const upstoxAPI = `https://api.upstox.com/v2/historical-candle/NSE_EQ%7C${isinCode}/day/${sellDate}/${buyDate}`;
    console.log("Fetching data from:", upstoxAPI);

    try {
      const response = await fetch(upstoxAPI, {
        method: "GET",
        headers: { 'Accept': 'application/json' }
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Upstox API Response:", data);

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

      return {
        firstOpen,
        lastClose,
        highestHigh,
        highestHighDate,
        lowestLow,
        lowestLowDate
      };

    } catch (error) {
      console.error("API Error:", error.message);
      toast.warn("Select a valid date range!");
      return null;
    }
  };

  const addStock = async () => {
    if (stocks.length < 5 && currentStock.symbol && currentStock.buyDate && currentStock.sellDate) {
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
    }
  };

  const removeStock = useCallback((id) => {
    setStocks((prevStocks) => prevStocks.filter((stock) => stock.id !== id));
  }, []);

  const maxProfit = stocks.reduce((sum, stock) => {
    const highestHigh = stock.highestHigh || 0;
    const open = stock.firstOpen || 0;  // Use firstOpen instead of open
    const quantity = stock.quantity || 0;

    return sum + ((highestHigh - open) * quantity);
  }, 0);

  const maxLoss = stocks.reduce((sum, stock) => {
    const lowestLow = stock.lowestLow || 0;
    const open = stock.firstOpen || 0;  // Use firstOpen instead of open
    const quantity = stock.quantity || 0;

    // This should be a negative number to represent a loss
    return sum + ((lowestLow - open) * quantity);
  }, 0);

  const actualProfit = stocks.reduce(
    (sum, stock) => sum + ((stock.lastClose - stock.firstOpen) * stock.quantity),
    0
  );

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
    <div className="container mx-auto px-4 py-8 ">
      <div className="bg-green-50 rounded-2xl shadow-lg p-6 mb-6">
        <h2 className="text-3xl font-bold text-green-700 mb-3">Pick Your Stocks</h2>
        <p className="text-gray-700 mb-3">
          Select up to <span className="font-bold text-green-700">5 Nifty Fifty stocks</span>, set buy and sell dates, and calculate potential profit or loss.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border border-green-700 rounded-2xl">
          {/* Maximum Profit */}
          <div className="lg:rounded-l-2xl bg-white rounded-t-2xl">
            <ProfitLossCard
              title="Maximum Profit"
              value={maxProfit.toFixed(2)}
              description="You could make"
              icon={Profit}
            />
          </div>

          {/* Maximum Loss */}
          <div className="lg:border-l lg:border-r border-green-700 bg-white">
            <ProfitLossCard
              title="Maximum Loss"
              value={maxLoss.toFixed(2)}
              description="You could make"
              icon={Loss}
            />
          </div>

          {/* Actual Profit */}
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
              className={`cursor-pointer transition-all text-2xl ${isFavorite ? "text-red-700" : "text-gray-400"
                }`}
              onClick={toggleFavorite}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {stocks.map((stock) => (
              <div
                key={stock.id}
                className="flex flex-col justify-between  border bg-green-50 border-green-700 rounded-2xl p-2 shadow-lg"
              >
                <div className="flex justify-end">
                  {/* Delete Button */}
                  <FontAwesomeIcon icon={faTrash} onClick={() => removeStock(stock.id)} className="text-gray-500 hover:text-red-900" />
                </div>
                {/* Stock Symbol with Logo (optional) */}
                <div className="flex justify-center items-center gap-2">
                  <img
                    src={stock.logo} loading="lazy"
                    alt={stock.symbol}
                    className="h-24 w-24 object-contain"
                  />
                </div>
                <div>
                </div>

                {/* Stock Details (Aligned at Bottom) */}
                <div className="mt-auto text-xs text-green-700">
                  <p className="text-lg font-bold text-green-800">{stock.symbol}</p>
                  <p><span className="font-semibold text-xs">Quantity:</span> {stock.quantity}</p>
                  <p><span className="font-semibold text-xs">Buying Date:</span> {stock.buyDate}</p>
                  <p><span className="font-semibold text-xs">Selling Date:</span> {stock.sellDate}</p>
                </div>
              </div>
            ))}

            {stocks.length < 5 && (
              <div className={`${stocks.length === 0 ? "w-full flex-col justify-center items-center " : " flex-col justify-center items-center "}`}>
                <div className={`${stocks.length === 0 ? "border-dotted border-2 border-green-700 py-16 px-8 rounded-2xl" : "border-dotted border-2 border-green-700 py-16 px-8 rounded-2xl h-full"}`}>
                  <button
                    onClick={handleOpen}
                    className="bg-green-700 hover:bg-green-700 text-white rounded-full p-3 mx-auto flex items-center justify-center" aria-label="Add stock"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                  <p className="mt-1 text-green-700 font-semibold text-center">Add stock</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table section */}
      <div className="bg-green-50 rounded-2xl shadow-lg p-6 mb-8">
        <StockTable stocks={stocks} />
      </div>

      {/* Note  */}
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
              inputprops={{ min: 0, max: 100 }}
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
              disabled={!currentStock.symbol || !currentStock.buyDate || !currentStock.sellDate}
            >
              Add Stock
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default HomePage;