// src/hooks/useRetrieveUrl.ts
import { useState } from "react";

export function useRetrieveUrl() {
  const [alias, setAlias] = useState("");

  const handleRetrieve = (alias: string) => {
    if (!alias) return;
    const url = `http://localhost:3000/u/${alias}`;
    window.open(url, "_blank");
  };

  return {
    alias,
    setAlias,
    handleRetrieve,
  };
}
