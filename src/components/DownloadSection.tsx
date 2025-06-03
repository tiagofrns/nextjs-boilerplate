import React from "react";

const DownloadSection: React.FC = () => {
  return (
    <section style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 0" }}>
      <h2 style={{ color: "#1b8c4c", fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
        Descarrega a nossa app
      </h2>
      <p style={{ marginBottom: 24 }}>Disponível nas lojas abaixo:</p>
      <div style={{ display: "flex", gap: 12 }}>
        <img src="/google-play-badge.png" alt="Google Play" style={{ height: 40 }} />
        <img src="/app-store-badge.png" alt="App Store" style={{ height: 40 }} />
      </div>
    </section>
  );
};

export default DownloadSection;