import "./App.css";
import { CountryProgressMap } from "./components/saudiMap";

function App() {
  return (
    <div className="app-container">
      <header className="kiosk-header">
        <div className="header-content">
          <div className="header-text">
            <h1>كنز الوطن</h1>
            <p>اكتشف كنوز المملكة ومشاريع رؤية 2030</p>
          </div>
        </div>
        <div className="header-logo">
          <img src="/LOGO.svg" alt="Saudi National Day 95" className="main-logo" />
        </div>
      </header>
      <main className="map-container">
        <CountryProgressMap />
      </main>
      <div className="decorative-patterns">
        <div className="pattern pattern-1"></div>
        <div className="pattern pattern-2"></div>
        <div className="pattern pattern-3"></div>
      </div>
    </div>
  );
}

export default App;
