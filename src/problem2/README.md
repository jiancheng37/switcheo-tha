# Switcheo Swap

This is a **Cryptocurrency Swap Interface** built using **React** and **Material UI (MUI)**. The app allows users to select tokens, input amounts, and swap between them using price data fetched from an external API.

---

## **🚀 Features**
- Swap cryptocurrencies dynamically
- Price fetching from an external API
- Two-way token conversion (auto-updating both fields)
- Estimated USD display for selected tokens
- Error handling for invalid transactions
- Wallet connection simulation before swapping
- Interactive UI with Material UI (MUI)

---

## **🛠️ Getting Started**

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-repo/crypto-swap.git
cd crypto-swap
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Start the Development Server**
```sh
npm run dev
```

The application will now be accessible at **`http://localhost:5173/`** (or another port if specified by Vite).

---

## **📂 Project Structure**
```bash
crypto-swap/
│── src/
│   ├── components/
│   │   ├── TokenInput.tsx    # Token input field component
│   │   ├── TokenSelector.tsx # Modal for selecting tokens
│   │   ├── TokenSwap.tsx     # Main swap logic
│   ├── types/
│   │   ├── index.ts          # Type definitions
│   ├── App.tsx               # Main React component
│   ├── main.tsx              # React entry point
│── public/
│── package.json
│── README.md
```

---

## **🔧 Configuration**
- Ensure you have **Node.js** installed (`v16+` recommended).
- The app fetches price data from:
  ```plaintext
  https://interview.switcheo.com/prices.json
  ```
  Make sure your internet connection is active to retrieve the latest token prices.

---

## **📜 License**
This project is **open-source** and available under the **MIT License**.

---

## **🙌 Contributing**
Feel free to fork the repository and submit **pull requests** to improve the functionality.

🚀 **Happy Swapping!**

