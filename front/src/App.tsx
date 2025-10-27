import "./App.css";
import ShortenUrl from "./components/ShortenUrl";
import RetrieveUrl from "./components/RetrieveUrl";
import TopUrls from "./components/TopUrls";

function App() {
  return (
    <div className="container">
      <h1>URL Shortener</h1>
      <p>Transforme links longos em URLs curtas e fáceis de compartilhar</p>

      <ShortenUrl />
      <RetrieveUrl />
      <TopUrls />
    </div>
  );
}

export default App;
