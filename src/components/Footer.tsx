import React from "react";

const Footer = () => {
  return (
    <footer style={{ background: "#f8f8f8", padding: "20px 40px", textAlign: "center", borderTop: "1px solid #eaeaea" }}>
      <p style={{ margin: 0 }}>© {new Date().getFullYear()} Midori. Todos os direitos reservados.</p>
      <div style={{ marginTop: 10 }}>
        <a href="#" style={{ margin: "0 10px" }}>Política de Privacidade</a>
        <a href="#" style={{ margin: "0 10px" }}>Termos de Serviço</a>
      </div>
    </footer>
  );
};

export default Footer;