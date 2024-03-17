from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import openai
import json
import os
import re
from dotenv import load_dotenv
from stock_functions import function_mapping
import numpy as np

load_dotenv()

openai.api_key = os.getenv("API_KEY")

app = FastAPI()


class UserInput(BaseModel):
    selected_stock: str
    user_input: str


def generate_response(messages):
    """
    Generate a response using the OpenAI API.

    Args:
        messages (List[Dict[str, str]]): The messages to send to the API.

    Returns:
        str: The generated response.
    """
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo-0125",
            messages=messages,
            max_tokens=150,
            temperature=0.5,
            stop=["\n", "User:", "System:"]
        )

        return response.choices[0].message.content
    except openai.error.RateLimitError as e:
        return "I'm currently unable to process your request due to high demand. Please try again later."


def find_matching_function(prompt):
    """
    Find the matching stock function based on the user prompt using regex.

    Args:
        prompt (str): The user's prompt related to the stock.

    Returns:
        str: The name of the matching stock function.
    """
    patterns = {
        "get_stock_price": r"price|current price|stock price|price of",
        "get_stock_volume": r"volume|stock volume|trading volume|number of shares traded",
        "calculate_sma": r"SMA|simple moving average",
        "calculate_ema": r"EMA|exponential moving average",
        "calculate_rsi": r"RSI|relative strength index",
        "calculate_macd": r"MACD|moving average convergence divergence"
    }

    for func_name, pattern in patterns.items():
        if re.search(pattern, prompt, re.IGNORECASE):
            return func_name

    return None


def handle_trading_decision(selected_stock, prompt):
    """
    Handle user input related to trading decisions (e.g., buying or selling a stock).

    Args:
        selected_stock (str): The selected stock ticker.
        prompt (str): The user's prompt related to the trading decision.

    Returns:
        str: A response providing guidance or recommendations.
    """
    return "It's important to conduct thorough research before making trading decisions. Consider factors such as the company's financial health, growth prospects, and market conditions before deciding whether to buy or sell stocks."


def handle_user_input(selected_stock, prompt):
    """
    Handle user input and call the appropriate stock function based on the prompt.

    Args:
        selected_stock (str): The selected stock ticker.
        prompt (str): The user's prompt related to the stock.

    Returns:
        str: The result of the called function or a response to the user query.
    """
    prompt_lower = prompt.lower()

    if "exit" in prompt_lower:
        return {"response": "Chat ended. Type a stock symbol to start a new chat."}

    if "change stock" in prompt_lower:
        return {"response": "Enter a new stock symbol to continue."}

    if any(word in prompt_lower for word in ["buy", "sell"]):
        return handle_trading_decision(selected_stock, prompt)

    if "better than" in prompt_lower or "worse than" in prompt_lower:
        return compare_stocks(prompt, selected_stock, None)

    function_name = find_matching_function(prompt)

    if function_name:
        if function_name in function_mapping:
            result = function_mapping[function_name](selected_stock)
            return result
        else:
            return f"Error: Unknown function '{function_name}'."
    else:
        return "Error: No matching function found for the given prompt."


@app.post("/stock-info/")
async def get_stock_info(user_input: UserInput):
    selected_stock = user_input.selected_stock
    user_input_text = user_input.user_input

    if user_input_text.strip().lower() == "exit":
        return {"response": "Chat ended. Type a stock symbol to start a new chat."}

    if user_input_text.strip().lower() == "change stock":
        return {"response": "Enter a new stock symbol to continue."}

    if user_input_text.strip():
        result = handle_user_input(selected_stock, user_input_text)

        if "better than" in user_input_text.lower() or "worse than" in user_input_text.lower():
            comparison_result = compare_stocks(user_input_text, selected_stock, result)
            return {"result": comparison_result}
        else:
            function_context = get_function_context(user_input_text)
            messages = [
                {"role": "system", "content": f"You are asking about {selected_stock} stock."},
                {"role": "user", "content": f"Explain this result: {result} {function_context}"}
            ]
            response = generate_response(messages)
            return {"response": response}
    else:
        raise HTTPException(status_code=400, detail="Error: Please provide a valid input.")


def get_function_context(user_input):
    """
    Get additional context based on the function selected by the user.

    Args:
        user_input (str): The user input indicating the selected function.

    Returns:
        str: Additional context or commentary based on the function.
    """
    patterns = {
        "get_stock_price": r"price|current price|stock price|price of",
        "get_stock_volume": r"volume|stock volume|trading volume|number of shares traded",
        "calculate_sma": r"SMA|simple moving average",
        "calculate_ema": r"EMA|exponential moving average",
        "calculate_rsi": r"RSI|relative strength index",
        "calculate_macd": r"MACD|moving average convergence divergence"
    }

    for func_name, pattern in patterns.items():
        if re.search(pattern, user_input, re.IGNORECASE):
            if "sma" in user_input.lower():
                return ("(Simple Moving Average is a commonly used indicator to analyze stock trends. A higher SMA "
                        "value may indicate a bullish trend, while a lower value may suggest a bearish trend.)")
            elif "ema" in user_input.lower():
                return ("(Exponential Moving Average is a type of moving average that places more weight on recent "
                        "data points. It is often used to identify trend direction.)")
            elif "rsi" in user_input.lower():
                return ("(Relative Strength Index is a momentum oscillator that measures the speed and change of "
                        "price movements. RSI values above 70 may indicate overbought conditions, while values "
                        "below 30 may indicate oversold conditions.)")
            elif "macd" in user_input.lower():
                return ("(Moving Average Convergence Divergence is a trend-following momentum indicator that "
                        "shows the relationship between two moving averages of a security’s price. MACD signals "
                        "potential buy and sell opportunities.)")
            elif "price" in user_input.lower():
                return "(Price refers to the current trading price of the selected stock.)"
            elif "volume" in user_input.lower():
                return "(Volume refers to the number of shares traded for the selected stock.)"
            else:
                return "(Additional context or commentary for the selected function can be added here.)"

    return "(No specific context found for the given function.)"


def compare_stocks(user_input, selected_stock, result):
    """
    Compare two stocks based on the user input function and comparison operators.

    Args:
        user_input (str): The user input containing the comparison query.
        selected_stock (str): The selected stock ticker.
        result (str): The result of the called function for the selected stock.

    Returns:
        str: The comparison result.
    """
    other_stock = None
    comparison_operator = None

    for stock in ["AAPL", "MSFT", "GOOGL", "TSLA", "AMZN"]:
        if stock != selected_stock and stock.lower() in user_input.lower():
            other_stock = stock
            break

    if other_stock:
        if "rsi" in user_input.lower():
            # For demonstration purposes, assume random RSI values
            rsi_selected = np.random.uniform(0, 100)
            rsi_other = np.random.uniform(0, 100)
            if "better than" in user_input.lower():
                comparison_operator = "better than"
                if rsi_selected > rsi_other:
                    return f"The RSI for {selected_stock} ({rsi_selected:.2f}) is {comparison_operator} the RSI for {other_stock} ({rsi_other:.2f})."
                else:
                    return f"The RSI for {selected_stock} ({rsi_selected:.2f}) is not {comparison_operator} the RSI for {other_stock} ({rsi_other:.2f})."
            elif "worse than" in user_input.lower():
                comparison_operator = "worse than"
                if rsi_selected < rsi_other:
                    return f"The RSI for {selected_stock} ({rsi_selected:.2f}) is {comparison_operator} the RSI for {other_stock} ({rsi_other:.2f})."
                else:
                    return f"The RSI for {selected_stock} ({rsi_selected:.2f}) is not {comparison_operator} the RSI for {other_stock} ({rsi_other:.2f})."
            else:
                return f"Please specify 'better than' or 'worse than' for comparison."
        elif "sma" in user_input.lower():
            # For demonstration purposes, assume random SMA values
            sma_selected = np.random.uniform(0, 100)
            sma_other = np.random.uniform(0, 100)
            if "better than" in user_input.lower():
                comparison_operator = "better than"
                if sma_selected > sma_other:
                    return f"The SMA for {selected_stock} ({sma_selected:.2f}) is {comparison_operator} the SMA for {other_stock} ({sma_other:.2f})."
                else:
                    return f"The SMA for {selected_stock} ({sma_selected:.2f}) is not {comparison_operator} the SMA for {other_stock} ({sma_other:.2f})."
            elif "worse than" in user_input.lower():
                comparison_operator = "worse than"
                if sma_selected < sma_other:
                    return f"The SMA for {selected_stock} ({sma_selected:.2f}) is {comparison_operator} the SMA for {other_stock} ({sma_other:.2f})."
                else:
                    return f"The SMA for {selected_stock} ({sma_selected:.2f}) is not {comparison_operator} the SMA for {other_stock} ({sma_other:.2f})."
            else:
                return f"Please specify 'better than' or 'worse than' for comparison."
        elif "ema" in user_input.lower():
            # For demonstration purposes, assume random EMA values
            ema_selected = np.random.uniform(0, 100)
            ema_other = np.random.uniform(0, 100)
            if "better than" in user_input.lower():
                comparison_operator = "better than"
                if ema_selected > ema_other:
                    return f"The EMA for {selected_stock} ({ema_selected:.2f}) is {comparison_operator} the EMA for {other_stock} ({ema_other:.2f})."
                else:
                    return f"The EMA for {selected_stock} ({ema_selected:.2f}) is not {comparison_operator} the EMA for {other_stock} ({ema_other:.2f})."
            elif "worse than" in user_input.lower():
                comparison_operator = "worse than"
                if ema_selected < ema_other:
                    return f"The EMA for {selected_stock} ({ema_selected:.2f}) is {comparison_operator} the EMA for {other_stock} ({ema_other:.2f})."
                else:
                    return f"The EMA for {selected_stock} ({ema_selected:.2f}) is not {comparison_operator} the EMA for {other_stock} ({ema_other:.2f})."
            else:
                return f"Please specify 'better than' or 'worse than' for comparison."
        elif "macd" in user_input.lower():
            # For demonstration purposes, assume random MACD values
            macd_selected = np.random.uniform(0, 100)
            macd_other = np.random.uniform(0, 100)
            if "better than" in user_input.lower():
                comparison_operator = "better than"
                if macd_selected > macd_other:
                    return f"The MACD for {selected_stock} ({macd_selected:.2f}) is {comparison_operator} the MACD for {other_stock} ({macd_other:.2f})."
                else:
                    return f"The MACD for {selected_stock} ({macd_selected:.2f}) is not {comparison_operator} the MACD for {other_stock} ({macd_other:.2f})."
            elif "worse than" in user_input.lower():
                comparison_operator = "worse than"
                if macd_selected < macd_other:
                    return f"The MACD for {selected_stock} ({macd_selected:.2f}) is {comparison_operator} the MACD for {other_stock} ({macd_other:.2f})."
                else:
                    return f"The MACD for {selected_stock} ({macd_selected:.2f}) is not {comparison_operator} the MACD for {other_stock} ({macd_other:.2f})."
            else:
                return f"Please specify 'better than' or 'worse than' for comparison."
        else:
            return f"Comparison for the specified function is not supported."
    else:
        return f"Comparison requires two stocks. Please mention the other stock for comparison."


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info", reload=True)
