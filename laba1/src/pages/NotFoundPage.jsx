import { Link } from "react-router";

function NotFoundPage() {
  return (
    <div>
      <h1>404. Сторінку не знайдено</h1>
      <p>Такої адреси в застосунку немає.</p>
      <Link to="/">Повернутися на головну</Link>
    </div>
  );
}

export default NotFoundPage;