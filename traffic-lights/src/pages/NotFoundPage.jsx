
import { Link } from "react-router";

function NotFoundPage() {
  return (
    <section>
      <h1>404</h1>
      <h2>Сторінку не знайдено</h2>

      <Link to="/">Повернутися на головну</Link>
    </section>
  );
}

export default NotFoundPage;
