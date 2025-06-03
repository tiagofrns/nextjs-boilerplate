import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "60px 40px", background: "#f8f8f8" }}>
      <div>
        <h1 style={{ color: "#1b8c4c", fontSize: 36, fontWeight: 700, marginBottom: 16 }}>
          Encontra,<br />reserva e aluga<br />com facilidade
        </h1>
        <p style={{ marginBottom: 24 }}>Descarrega a app e começa a tua viagem agora mesmo!</p>
        <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
          <img src="/google-play-badge.png" alt="Google Play" style={{ height: 40 }} />
          <img src="/app-store-badge.png" alt="App Store" style={{ height: 40 }} />
        </div>
      </div>
      <img src="/bike-illustration.png" alt="Bike" style={{ height: 220 }} />
    </section>
  );
};

export default HeroSection;