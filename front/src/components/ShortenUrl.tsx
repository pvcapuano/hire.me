import { useShortenUrl } from "../hooks/useShortenUrl";

function ShortenUrl() {
  const {
    originalUrl,
    setOriginalUrl,
    customAlias,
    setCustomAlias,
    shortenedUrl,
    handleShorten,
  } = useShortenUrl();

  return (
    <section>
      <h2>Encurtar URL</h2>
      <input
        type="text"
        placeholder="URL original"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
      />
      <input
        type="text"
        placeholder="Alias customizado (opcional)"
        value={customAlias}
        onChange={(e) => setCustomAlias(e.target.value)}
      />
      <button onClick={handleShorten}>Encurtar</button>
      {shortenedUrl && (
        <p>
          URL encurtada:{" "}
          <a href={shortenedUrl} target="_blank">
            {shortenedUrl}
          </a>
        </p>
      )}
    </section>
  );
}

export default ShortenUrl;
