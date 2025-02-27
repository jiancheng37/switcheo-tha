# Code Review & Refactoring

## Issues Identified

### 1. Incorrect Filtering Logic in `sortedBalances`
- **Issue:** The filtering logic incorrectly used an undefined variable (`lhsPriority`) and had a flawed condition.
- **Fix:** Used `getPriority(balance.blockchain) > -99 && balance.amount > 0` to properly filter out balances.

### 2. Unnecessary `useMemo` Dependency on `prices`
- **Issue:** `prices` was included in `useMemo`, triggering unnecessary recalculations.
- **Fix:** Removed `prices` from the dependency array, as it was not needed for sorting.

### 3. Missing `blockchain` Property in `WalletBalance` Interface
- **Issue:** The `WalletBalance` interface did not define `blockchain`, leading to TypeScript errors.
- **Fix:** Updated the interface to include:
  ```tsx
  interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string;
  }
  ```
  
### 4. Incorrect Key Usage in `.map()`
- **Issue:** Used `index` as the key in React’s `.map()`, which can lead to unnecessary re-renders and UI inconsistencies when the list updates
- **Fix:** Used `balance.currency` as a unique identifier:
  ```tsx
  key={balance.currency}
  ```

### 5. Incorrect `toFixed()` Usage
- **Issue:** `balance.amount.toFixed()` was called without specifying decimal places, leading to potential errors.
- **Fix:** Used `balance.amount.toFixed(2)` for consistent formatting.

### 6. Incorrect `console.err(error)` Usage
- **Issue:** `console.err` does not exist.
- **Fix:** Used `console.error(error);` instead.

### 7. Potential Undefined Price Access
- **Issue:** The code assumed that `prices[balance.currency]` always existed, leading to potential `undefined` values.
- **Fix:** Used `(prices[balance.currency] || 0)` to provide a default value.

---

## Refactored Code

```tsx
interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string;
  }
  
  interface FormattedWalletBalance {
    currency: string;
    amount: number;
    formatted: string;
  }
  
  class Datasource {
    private url: string;
  
    constructor(url: string) {
      this.url = url;
    }
  
    async getPrices(): Promise<Record<string, number>> {
      try {
        const response = await fetch(this.url);
        if (!response.ok) {
          throw new Error(`Failed to fetch prices: ${response.statusText}`);
        }
        return await response.json();
      } catch (error) {
        console.error("Error fetching prices:", error);
        return {};
      }
    }
  }
  
  interface Props extends BoxProps {}
  
  const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const [prices, setPrices] = useState<Record<string, number>>({});
  
    useEffect(() => {
      const datasource = new Datasource("https://interview.switcheo.com/prices.json");
      datasource.getPrices().then(setPrices).catch(console.error);
    }, []);
  
    const getPriority = (blockchain: string): number => {
      switch (blockchain) {
        case "Osmosis":
          return 100;
        case "Ethereum":
          return 50;
        case "Arbitrum":
          return 30;
        case "Zilliqa":
        case "Neo":
          return 20;
        default:
          return -99;
      }
    };
  
    const sortedBalances = useMemo(() => {
      return balances
        .filter(balance => balance.amount > 0 && getPriority(balance.blockchain) > -99)
        .sort((lhs, rhs) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain));
    }, [balances]);
  
    const formattedBalances = sortedBalances.map(balance => ({
      ...balance,
      formatted: balance.amount.toFixed(2),
    }));
  
    return (
      <div {...rest}>
        {formattedBalances.map(balance => {
          const usdValue = (prices[balance.currency] || 0) * balance.amount;
          return (
            <WalletRow
              className={classes.row}
              key={balance.currency}
              amount={balance.amount}
              usdValue={usdValue}
              formattedAmount={balance.formatted}
            />
          );
        })}
      </div>
    );
  };
```

---

## Summary of Fixes
- Improved **filtering and sorting** efficiency.
- Fixed **TypeScript errors** by adding missing properties.
- Removed **unnecessary dependencies** from `useMemo`.
- Ensured **correct key usage** in `.map()`.
- Improved **error handling** in `Datasource`.
- Ensured safe access to **price data** to prevent undefined values.

This refactored version improves **performance, readability, and maintainability** while following best practices in React and TypeScript. 🚀

