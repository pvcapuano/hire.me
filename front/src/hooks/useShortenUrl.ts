import { useState } from "react";

export function useShortenUrl() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");

  const handleShorten = async () => {
    try {
      const params = new URLSearchParams();
      params.append("url", originalUrl);
      if (customAlias) params.append("CUSTOM_ALIAS", customAlias);

      const res = await fetch(
        `http://localhost:3000/create?${params.toString()}`,
        {
          method: "PUT",
        }
      );

      const data = await res.json();
      if (res.ok) {
        setShortenedUrl(data.url);
      } else {
        alert(`${data.err_code}: ${data.description}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return {
    originalUrl,
    setOriginalUrl,
    customAlias,
    setCustomAlias,
    shortenedUrl,
    handleShorten,
  };
}
