import { Link } from "react-router";

function HomePage() {
  return (
    <div>
      <h1>Світлофор</h1>
      <p>
        Інтерактивний світлофор із ручним та автоматичним режимами. Стан
        спільний для всіх сторінок і не скидається під час навігації.
      </p>
      <ul>
        <li>
          <Link to="/traffic-light">Керування світлофором</Link>
        </li>
        <li>
          <Link to="/stats">Статистика</Link>
        </li>
      </ul>
    </div>
  );
}

export default HomePage;