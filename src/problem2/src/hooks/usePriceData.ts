// hooks/usePriceData.ts
import { useState, useEffect } from "react";

const API_URL = "https://interview.switcheo.com/prices.json";

export const usePriceData = () => {
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const priceMap: Record<string, number> = {};
        data.forEach((entry: { currency: string; price: number }) => {
          priceMap[entry.currency] = entry.price;
        });

        setPrices(priceMap);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching prices:", error);
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  return { prices, loading };
};