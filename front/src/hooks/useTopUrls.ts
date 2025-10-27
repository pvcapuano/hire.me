// src/hooks/useTopUrls.ts
import { useState } from "react";

export function useTopUrls() {
  const [topUrls, setTopUrls] = useState<any[]>([]);

  const handleGetTop = async () => {
    try {
      const res = await fetch("http://localhost:3000/top");
      const data = await res.json();
      if (res.ok) setTopUrls(data);
    } catch (err) {
      console.error("Erro ao buscar top 10 URLs:", err);
    }
  };

  return {
    topUrls,
    handleGetTop,
  };
}
