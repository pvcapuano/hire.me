import { useRetrieveUrl } from "../hooks/useRetrieveUrl";

function RetrieveUrl() {
  const { alias, setAlias, handleRetrieve } = useRetrieveUrl();

  return (
    <section>
      <h2>Buscar URL</h2>
      <input
        type="text"
        placeholder="Digite o alias"
        value={alias}
        onChange={(e) => setAlias(e.target.value)}
      />
      <button onClick={() => handleRetrieve(alias)}>Abrir URL</button>
    </section>
  );
}

export default RetrieveUrl;
