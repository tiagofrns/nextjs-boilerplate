import React from "react";

const FeaturesSection: React.FC = () => {
  return (
    <section style={{ padding: "60px 40px", background: "#f8f8f8" }}>
      <h2 style={{ color: "#1b8c4c", fontSize: 28, fontWeight: 700, marginBottom: 24 }}>
        Principais Características
      </h2>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 32 }}>
        <div style={{ flex: 1, textAlign: "center" }}>
          <img src="/feature1-icon.png" alt="Feature 1" style={{ height: 80 }} />
          <h3 style={{ fontSize: 20, fontWeight: 600 }}>Característica 1</h3>
          <p>Descrição da característica 1.</p>
        </div>
        <div style={{ flex: 1, textAlign: "center" }}>
          <img src="/feature2-icon.png" alt="Feature 2" style={{ height: 80 }} />
          <h3 style={{ fontSize: 20, fontWeight: 600 }}>Característica 2</h3>
          <p>Descrição da característica 2.</p>
        </div>
        <div style={{ flex: 1, textAlign: "center" }}>
          <img src="/feature3-icon.png" alt="Feature 3" style={{ height: 80 }} />
          <h3 style={{ fontSize: 20, fontWeight: 600 }}>Característica 3</h3>
          <p>Descrição da característica 3.</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;