# Stock Chatbot Backend

This backend is designed to power a chatbot focused on providing information and insights about stocks. It leverages FastAPI for quick and efficient API development and integrates with various libraries such as yfinance, Pandas, and Matplotlib for fetching and visualizing stock data.

## Features:

- **Real-time Stock Data**: Utilizes yfinance to fetch real-time stock data, enabling users to inquire about the latest stock prices, market trends, and historical performance.

- **Interactive Charts**: Integrates Matplotlib for generating interactive charts, allowing users to visualize stock performance trends over time.

- **Natural Language Processing**: Employs OpenAI for natural language processing, enabling the chatbot to understand and respond to user queries in a conversational manner.

## Installation:

1. Clone this repository:
   ```bash
   git clone <https://github.com/Swish78/Stock-Chatbot-Backend/>
   cd stock-chatbot-backend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the backend server:
   ```bash
   uvicorn main:app --reload
   ```

## Usage:

Once the backend server is up and running, the chatbot can be accessed through HTTP requests. Below are some example endpoints:

- **GET /stock/{ticker}**: Retrieve information about a specific stock using its ticker symbol.
- **POST /chatbot**: Send a text query to the chatbot and receive a response.

## Examples:

### Retrieve Stock Information:
```bash
curl http://localhost:8000/stock/AAPL
```

### Query Chatbot:
```bash
curl -X POST -H "Content-Type: application/json" -d '{"query": "What is the current price of AAPL?"}' http://localhost:8000/chatbot
```

## Contributors:

- [Your Name](https://github.com/Swish78)

## License:

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
