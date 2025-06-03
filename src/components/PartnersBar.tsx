import React from "react";

const PartnersBar: React.FC = () => {
  const partners = [
    { name: "Partner 1", logo: "/partner1-logo.png" },
    { name: "Partner 2", logo: "/partner2-logo.png" },
    { name: "Partner 3", logo: "/partner3-logo.png" },
    { name: "Partner 4", logo: "/partner4-logo.png" },
  ];

  return (
    <section style={{ padding: "40px 0", textAlign: "center" }}>
      <h2 style={{ marginBottom: 24 }}>Nossos Parceiros</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: 40 }}>
        {partners.map((partner) => (
          <img key={partner.name} src={partner.logo} alt={partner.name} style={{ height: 60 }} />
        ))}
      </div>
    </section>
  );
};

export default PartnersBar;