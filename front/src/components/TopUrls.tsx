import { useTopUrls } from "../hooks/useTopUrls";

function TopUrls() {
  const { topUrls, handleGetTop } = useTopUrls();

  return (
    <section>
      <h2>Top 10 URLs</h2>
      <button onClick={handleGetTop}>Carregar</button>

      {topUrls.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>URL Original</th>
              <th>Total de Acessos</th>
            </tr>
          </thead>
          <tbody>
            {topUrls.map((u, idx) => (
              <tr key={idx}>
                <td>{u.original_url}</td>
                <td>{u.total_access_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default TopUrls;
