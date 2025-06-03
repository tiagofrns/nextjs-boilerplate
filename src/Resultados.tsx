import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";

const PRECO = {
  mecanica: 0.1,
  eletrica: 0.2,
  trotinete: 0.25,
};

function getMinutes(start: Date, end: Date) {
  return Math.max(1, Math.round((end.getTime() - start.getTime()) / 60000));
}

const veiculos = [
  {
    nome: "Bicicleta Mecânica",
    img: "/bike1.png",
    preco: PRECO.mecanica,
    key: "mecanica",
  },
  {
    nome: "Bicicleta elétrica",
    img: "/bike2.png",
    preco: PRECO.eletrica,
    key: "eletrica",
  },
  {
    nome: "Trotinete",
    img: "/trotinete2.png",
    preco: PRECO.trotinete,
    key: "trotinete",
  },
];

export default function Resultados() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const loc = params.get("loc");
  const start = params.get("start");
  const end = params.get("end");

  const [showModal, setShowModal] = useState(false);

  if (!loc || !start || !end) return <div>Dados em falta.</div>;

  const startDate = new Date(start);
  const endDate = new Date(end);
  const minutos = getMinutes(startDate, endDate);

  return (
    <div style={{ minHeight: "100vh", background: "#fafafa" }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 60,
        marginBottom: 40,
        paddingTop: 40
      }}>
        <Link to="/">
          <img
            src="/logo.png"
            alt="Midori Mobilidade"
            style={{
              height: 100,
              width: "auto",
              objectFit: "contain",
              display: "block"
            }}
          />
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 60 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 28, color: "#178a4c" }}>📍</span>
            <span style={{ fontWeight: 500 }}>{loc}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 28, color: "#178a4c" }}>📅</span>
            <span>
              {startDate.toLocaleString("pt-PT", { day: "2-digit", month: "long", weekday: "short", hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 28, color: "#178a4c" }}>📅</span>
            <span>
              {endDate.toLocaleString("pt-PT", { day: "2-digit", month: "long", weekday: "short", hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        </div>
      </div>
      <div style={{ padding: "40px 0" }}>
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: 40,
          flexWrap: "wrap"
        }}>
          {veiculos.map((v) => (
            <div
              key={v.key}
              style={{
                background: "#f7f7f7",
                borderRadius: 8,
                boxShadow: "0 4px 24px #0001",
                width: 400,
                minHeight: 420,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                marginBottom: 24
              }}
            >
              <div style={{ padding: "32px 32px 0 32px", minHeight: 220, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={v.img} alt={v.nome} style={{ maxWidth: "100%", maxHeight: 180 }} />
              </div>
              <div style={{ padding: "24px 32px 0 32px" }}>
                <div style={{ fontSize: 2 + "rem", color: "#888", fontWeight: 500, marginBottom: 8 }}>{v.nome}</div>
                <div style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 8 }}>
                  {(v.preco * minutos).toFixed(2)}€
                </div>
                <div style={{ color: "#888", fontSize: "1rem" }}>{minutos} minutos</div>
              </div>
              <div style={{ padding: "0 32px 32px 32px" }}>
                <button
                  style={{
                    width: "100%",
                    background: "#178a4c",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "16px 0",
                    fontWeight: 600,
                    fontSize: "1.2rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                  }}
                  onClick={() => setShowModal(true)}
                >
                  <span style={{ fontSize: 22 }}>📞</span> Alugar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Modal */}
      {showModal && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000
        }}>
          <div style={{
            background: "#fff",
            borderRadius: 16,
            padding: "32px 40px",
            boxShadow: "0 8px 32px #0002",
            maxWidth: 340,
            textAlign: "center"
          }}>
            <h2 style={{ color: "#178a4c", marginBottom: 16 }}>Reserva</h2>
            <p style={{ marginBottom: 24 }}>
              Para pagar a reserva e obter o código NFC para desbloquear o veículo, baixe a app Midori.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 24 }}>
              <img src="/googleplay.png" alt="Google Play" style={{ height: 40 }} />
              <img src="/appstore.png" alt="App Store" style={{ height: 40 }} />
            </div>
            <button
              style={{
                background: "#178a4c",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "10px 24px",
                fontWeight: 600,
                cursor: "pointer"
              }}
              onClick={() => setShowModal(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}