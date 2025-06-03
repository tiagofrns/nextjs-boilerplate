import React from "react";

const testimonials = [
  {
    name: "João Silva",
    feedback: "A experiência foi incrível! Recomendo a todos.",
    rating: 5,
  },
  {
    name: "Maria Fernandes",
    feedback: "Serviço excelente e muito fácil de usar.",
    rating: 4,
  },
  {
    name: "Pedro Costa",
    feedback: "Ótima plataforma, ajudou-me a encontrar o que precisava rapidamente.",
    rating: 5,
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section style={{ padding: "40px 20px", background: "#f8f8f8", borderRadius: 12 }}>
      <h2 style={{ color: "#1b8c4c", fontSize: 28, fontWeight: 700, marginBottom: 24 }}>O que dizem os nossos utilizadores</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {testimonials.map((testimonial, index) => (
          <div key={index} style={{ padding: 20, background: "#fff", borderRadius: 8, boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
            <h3 style={{ margin: 0 }}>{testimonial.name}</h3>
            <p style={{ margin: "8px 0" }}>"{testimonial.feedback}"</p>
            <p style={{ margin: 0 }}>⭐️ {testimonial.rating}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;