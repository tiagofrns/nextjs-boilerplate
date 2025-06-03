import React from "react";

const OptionsSection: React.FC = () => {
  return (
    <section style={{ padding: "40px", background: "#f8f8f8", borderRadius: 12, boxShadow: "0 2px 8px #0001" }}>
      <h2 style={{ color: "#1b8c4c", fontSize: 28, fontWeight: 700, marginBottom: 24 }}>As nossas opções</h2>
      <div style={{ display: "flex", gap: 24 }}>
        <div style={{ flex: 1, padding: 20, background: "#fff", borderRadius: 8, boxShadow: "0 1px 4px #0001" }}>
          <h3 style={{ fontSize: 22, fontWeight: 600 }}>Opção 1</h3>
          <p>Descrição da opção 1.</p>
        </div>
        <div style={{ flex: 1, padding: 20, background: "#fff", borderRadius: 8, boxShadow: "0 1px 4px #0001" }}>
          <h3 style={{ fontSize: 22, fontWeight: 600 }}>Opção 2</h3>
          <p>Descrição da opção 2.</p>
        </div>
        <div style={{ flex: 1, padding: 20, background: "#fff", borderRadius: 8, boxShadow: "0 1px 4px #0001" }}>
          <h3 style={{ fontSize: 22, fontWeight: 600 }}>Opção 3</h3>
          <p>Descrição da opção 3.</p>
        </div>
      </div>
    </section>
  );
};

export default OptionsSection;