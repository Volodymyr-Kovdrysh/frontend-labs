
import { Link } from "react-router";

function HomePage() {
  return (
    <section>
      <h1>Світлофор</h1>
      <p>Лабораторна робота №4</p>
      <p>React Router та Context API</p>

      <div style={{ marginTop: 25 }}>
        <p>
          <Link to="/traffic-light">Відкрити світлофор</Link>
        </p>

        <p style={{ marginTop: 10 }}>
          <Link to="/stats">Переглянути статистику</Link>
        </p>
      </div>
    </section>
  );
}

export default HomePage;
