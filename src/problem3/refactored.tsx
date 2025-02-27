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