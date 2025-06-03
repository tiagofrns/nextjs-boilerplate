import React from "react";

const Header: React.FC = () => {
  return (
    <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 40px", borderBottom: "1px solid #eaeaea" }}>
      <img src="/logo.png" alt="Midori Logo" style={{ height: 48 }} />
      <nav style={{ display: "flex", gap: 32 }}>
        <a href="#">As nossas opções</a>
        <a href="#">Como funciona</a>
        <a href="#">Porquê a Midori</a>
      </nav>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <span>🇵🇹/🇬🇧</span>
        <button style={{ background: "#1b8c4c", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 600 }}>
          Sou fornecedor/admin
        </button>
      </div>
    </header>
  );
};

export default Header;