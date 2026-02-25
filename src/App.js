import "./App.css";

export default function App() {
  return (
    <div className="wrap">
      <div className="bg">
        <div className="orb orb1" />
        <div className="orb orb2" />
      </div>

      <div className="card">
        <div className="pill">
          <span className="dot" />
          AutoSenze · Launching soon
        </div>

        <h1 className="title">Próximamente</h1>

        <p className="subtitle">
          El marketplace que conecta clientes con talleres, detailing y personalización.
        </p>

        <div className="cta">
          <a href="#" className="btn primary">Contacto</a>
          <a href="#" className="btn ghost">Instagram</a>
        </div>
      </div>
    </div>
  );
}
