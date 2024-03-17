import json
import pandas as pd
import matplotlib.pyplot as plt
import yfinance as yf


def get_stock_price(ticker, period='1y'):
    """
    Get the latest closing price of a stock.

    Args:
        ticker (str): The stock ticker symbol.
        period (str, optional): The time period for which to fetch the stock data (default is '1y').

    Returns:
        str: The latest closing price of the stock.
    """
    try:
        stock_data = yf.Ticker(ticker).history(period=period)
        latest_price = stock_data.iloc[-1].Close
        return str(latest_price)
    except Exception as e:
        return f"Error fetching stock price for {ticker}: {str(e)}"


def get_stock_volume(ticker):
    """
    Get the historical volume data for a stock.

    Args:
        ticker (str): The stock ticker symbol.

    Returns:
        str: The historical volume data for the stock.
    """
    try:
        stock_data = yf.Ticker(ticker).history(period='max')
        volume_data = stock_data['Volume'].to_dict()
        return str(volume_data)
    except Exception as e:
        return f"Error fetching stock volume for {ticker}: {str(e)}"


def calculate_sma(ticker, period='1y', window=50):
    """
    Calculate the Simple Moving Average (SMA) for a given stock.

    Args:
        ticker (str): The stock ticker symbol.
        period (str, optional): The time period for which to fetch the stock data (default is '1y').
        window (int, optional): The window size for the SMA calculation (default is 50).

    Returns:
        str: The calculated SMA value for the given stock and time period.
    """
    try:
        stock_data = yf.Ticker(ticker).history(period=period)
        sma = stock_data['Close'].rolling(window=window).mean().iloc[-1]
        return str(sma)
    except Exception as e:
        return f"Error calculating SMA for {ticker}: {str(e)}"


def calculate_ema(ticker, period='1y', window=50):
    """
    Calculate the Exponential Moving Average (EMA) for a given stock.

    Args:
        ticker (str): The stock ticker symbol.
        period (str, optional): The time period for which to fetch the stock data (default is '1y').
        window (int, optional): The window size for the EMA calculation (default is 50).

    Returns:
        str: The calculated EMA value for the given stock and time period.
    """
    try:
        stock_data = yf.Ticker(ticker).history(period=period)

        # Calculate the multiplier for the EMA
        multiplier = 2 / (window + 1)

        # Calculate the EMA
        ema = stock_data['Close'].ewm(com=multiplier, adjust=False).mean().iloc[-1]

        return str(ema)
    except Exception as e:
        return f"Error calculating EMA for {ticker}: {str(e)}"


def calculate_rsi(ticker, period='1y', window=14):
    """
    Calculate the Relative Strength Index (RSI) for a given stock.

    Args:
        ticker (str): The stock ticker symbol.
        period (str, optional): The time period for which to fetch the stock data (default is '1y').
        window (int, optional): The window size for RSI calculation (default is 14).

    Returns:
        str: The calculated RSI value for the given stock.
    """
    try:
        stock_data = yf.Ticker(ticker).history(period=period)
        delta = stock_data['Close'].diff()
        gain = (delta.where(delta > 0, 0)).rolling(window=window).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(window=window).mean()
        rs = gain / loss
        rsi = 100 - (100 / (1 + rs))
        return str(rsi.iloc[-1])
    except Exception as e:
        return f"Error calculating RSI for {ticker}: {str(e)}"


def calculate_macd(ticker, period='1y', short_window=12, long_window=26, signal_window=9):
    """
    Calculate the Moving Average Convergence Divergence (MACD) for a given stock.

    Args:
        ticker (str): The stock ticker symbol.
        period (str, optional): The time period for which to fetch the stock data (default is '1y').
        short_window (int, optional): The short window size (default is 12).
        long_window (int, optional): The long window size (default is 26).
        signal_window (int, optional): The signal window size (default is 9).

    Returns:
        str: The MACD value for the given stock.
    """
    try:
        stock_data = yf.Ticker(ticker).history(period=period)
        short_ema = stock_data['Close'].ewm(span=short_window, min_periods=1, adjust=False).mean()
        long_ema = stock_data['Close'].ewm(span=long_window, min_periods=1, adjust=False).mean()
        macd = short_ema - long_ema
        signal_line = macd.ewm(span=signal_window, min_periods=1, adjust=False).mean()
        macd_histogram = macd - signal_line
        return str(macd_histogram.iloc[-1])
    except Exception as e:
        return f"Error calculating MACD for {ticker}: {str(e)}"


def plot_stock_price(ticker, period='1y'):
    """
    Plot the historical stock prices for a given stock.

    Args:
        ticker (str): The stock ticker symbol.
        period (str, optional): The time period for which to fetch the stock data (default is '1y').
    """
    stock_data = yf.Ticker(ticker).history(period=period)
    if not stock_data.empty:
        plt.figure(figsize=(10, 6))
        plt.plot(stock_data.index, stock_data['Close'], label=f'{ticker} Close Price')
        plt.title(f'{ticker} Stock Price')
        plt.xlabel('Date')
        plt.ylabel('Price (USD)')
        plt.legend()
        plt.grid(True)
        plt.savefig(f'{ticker}.png')
        plt.close()
    else:
        print(f"Error fetching stock data for {ticker}")


function_metadata = {
    "get_stock_price": {
        "name": "get_stock_price",
        "description": "Get the latest closing price of a stock.",
        "parameters": {
            "type": "object",
            "properties": {
                "ticker": {
                    "type": "string",
                    "description": "The stock ticker symbol."
                },
                "period": {
                    "type": "string",
                    "description": "The time period for which to fetch the stock data (default is '1y').",
                    "default": "1y"
                }
            },
            "required": ["ticker"]
        }
    },
    "get_stock_volume": {
        "name": "get_stock_volume",
        "description": "Get the historical volume data for a stock.",
        "parameters": {
            "type": "object",
            "properties": {
                "ticker": {
                    "type": "string",
                    "description": "The stock ticker symbol."
                }
            },
            "required": ["ticker"]
        }
    },
    "calculate_sma": {
        "name": "calculate_sma",
        "description": "Calculate the Simple Moving Average (SMA) for a given stock.",
        "parameters": {
            "type": "object",
            "properties": {
                "ticker": {
                    "type": "string",
                    "description": "The stock ticker symbol."
                },
                "period": {
                    "type": "string",
                    "description": "The time period for which to fetch the stock data (default is '1y').",
                    "default": "1y"
                },
                "window": {
                    "type": "integer",
                    "description": "The window size for the SMA calculation (default is 50).",
                    "default": 50
                }
            },
            "required": ["ticker"]
        }
    },
    "calculate_ema": {
        "name": "calculate_ema",
        "description": "Calculate the Exponential Moving Average (EMA) for a given stock.",
        "parameters": {
            "type": "object",
            "properties": {
                "ticker": {
                    "type": "string",
                    "description": "The stock ticker symbol."
                },
                "period": {
                    "type": "string",
                    "description": "The time period for which to fetch the stock data (default is '1y').",
                    "default": "1y"
                },
                "window": {
                    "type": "integer",
                    "description": "The window size for the EMA calculation (default is 50).",
                    "default": 50
                }
            },
            "required": ["ticker"]
        }
    },
    "calculate_rsi": {
        "name": "calculate_rsi",
        "description": "Calculate the Relative Strength Index (RSI) for a given stock.",
        "parameters": {
            "type": "object",
            "properties": {
                "ticker": {
                    "type": "string",
                    "description": "The stock ticker symbol."
                },
                "period": {
                    "type": "string",
                    "description": "The time period for which to fetch the stock data (default is '1y').",
                    "default": "1y"
                },
                "window": {
                    "type": "integer",
                    "description": "The window size for RSI calculation (default is 14).",
                    "default": 14
                }
            },
            "required": ["ticker"]
        }
    },
    "calculate_macd": {
        "name": "calculate_macd",
        "description": "Calculate the Moving Average Convergence Divergence (MACD) for a given stock.",
        "parameters": {
            "type": "object",
            "properties": {
                "ticker": {
                    "type": "string",
                    "description": "The stock ticker symbol."
                },
                "period": {
                    "type": "string",
                    "description": "The time period for which to fetch the stock data (default is '1y').",
                    "default": "1y"
                },
                "short_window": {
                    "type": "integer",
                    "description": "The short window size (default is 12).",
                    "default": 12
                },
                "long_window": {
                    "type": "integer",
                    "description": "The long window size (default is 26).",
                    "default": 26
                },
                "signal_window": {
                    "type": "integer",
                    "description": "The signal window size (default is 9).",
                    "default": 9
                }
            },
            "required": ["ticker"]
        }
    }
}

function_mapping = {
    "get_stock_price": get_stock_price,
    # "get_stock_volume": get_stock_volume,
    "calculate_sma": calculate_sma,
    "calculate_ema": calculate_ema,
    "calculate_rsi": calculate_rsi,
    "calculate_macd": calculate_macd
}

# Example usage
# sma_50 = get_stock_price('AAPL', '1y')
# print(f"50-day SMA for AAPL: {sma_50}")