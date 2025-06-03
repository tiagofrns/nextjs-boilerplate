import React from "react";

const StepsSection: React.FC = () => {
  return (
    <section style={{ padding: "40px", background: "#f8f8f8", borderRadius: 12, boxShadow: "0 2px 8px #0001" }}>
      <h2 style={{ color: "#1b8c4c", fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Como funciona</h2>
      <ol style={{ listStyleType: "decimal", paddingLeft: 20 }}>
        <li style={{ marginBottom: 16 }}>
          <strong>Passo 1:</strong> Regista-te na nossa plataforma.
        </li>
        <li style={{ marginBottom: 16 }}>
          <strong>Passo 2:</strong> Escolhe a opção que melhor se adapta a ti.
        </li>
        <li style={{ marginBottom: 16 }}>
          <strong>Passo 3:</strong> Reserva e confirma a tua escolha.
        </li>
        <li style={{ marginBottom: 16 }}>
          <strong>Passo 4:</strong> Desfruta da tua experiência!
        </li>
      </ol>
    </section>
  );
};

export default StepsSection;