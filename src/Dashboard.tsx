import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import Cookies from "js-cookie";

const trotinetesPaths = [
  [
    [40.6405, -8.6538],
    [40.641, -8.6545],
    [40.6415, -8.6552],
    [40.642, -8.6558],
    [40.6425, -8.6565],
    [40.643, -8.657],
  ],
  [
    [40.638, -8.65],
    [40.6385, -8.651],
    [40.639, -8.652],
    [40.6395, -8.653],
    [40.64, -8.654],
    [40.6405, -8.655],
  ],
  [
    [40.641, -8.658],
    [40.6412, -8.657],
    [40.6414, -8.656],
    [40.6416, -8.655],
    [40.6418, -8.654],
    [40.642, -8.653],
  ],
  [
    [40.643, -8.651],
    [40.6428, -8.652],
    [40.6426, -8.653],
    [40.6424, -8.654],
    [40.6422, -8.655],
    [40.642, -8.656],
  ],
  [
    [40.637, -8.656],
    [40.6375, -8.6555],
    [40.638, -8.655],
    [40.6385, -8.6545],
    [40.639, -8.654],
    [40.6395, -8.6535],
  ],
];

export default function Dashboard() {
  const params = new URLSearchParams(useLocation().search);
  const lang = params.get("lang") || "pt";
  const texts =
    {
      pt: {
        title: "Principal",
        subtitle: "Visualização em tempo real",
        stats: "Visão estatística",
        users: "Utilizadores",
        orders: "Pedidos",
        last7: "Últimos 7 dias",
        ordersTitle: "Pedidos",
        schedule: "Horário",
        vehicles: "Veículos",
        clients: "Clientes",
        reports: "Denúncias",
        settings: "Definições",
        help: "Ajuda",
        now: "Agora",
        next7: "Próximos 7 dias",
        all: "Ver tudo",
        day: "Dia",
        week: "Semana",
        month: "Mês",
        search: "Pesquisar utilizador, cliente ou outro...",
        map: "Mapa",
      },
      en: {
        title: "Dashboard",
        subtitle: "Real-time overview",
        stats: "Statistic overview",
        users: "Users",
        orders: "Orders",
        last7: "Last 7 days",
        ordersTitle: "Orders",
        schedule: "Schedule",
        vehicles: "Vehicles",
        clients: "Clients",
        reports: "Reports",
        settings: "Settings",
        help: "Help",
        now: "Now",
        next7: "Next 7 days",
        all: "View all",
        day: "Day",
        week: "Week",
        month: "Month",
        search: "Search vehicle, customer and others...",
        map: "Map",
      },
    }[lang] || {
      title: "",
      subtitle: "",
      stats: "",
      users: "",
      orders: "",
      last7: "",
      ordersTitle: "",
      schedule: "",
      vehicles: "",
      clients: "",
      reports: "",
      settings: "",
      help: "",
      now: "",
      next7: "",
      all: "",
      day: "",
      week: "",
      month: "",
      search: "",
      map: "",
    };

  // Defina um ícone personalizado para os veículos
  const bikeIcon = new Icon({
    iconUrl: "/bike-marker.png", // Coloque um ícone de bicicleta em public/bike-marker.png
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  // Estado para as posições atuais dos markers
  const [positions, setPositions] = useState<[number, number][]>(
    trotinetesPaths.map((path) => path[0] as [number, number])
  );
  const stepRef = useRef(Array(trotinetesPaths.length).fill(0));

  // Animação dos markers
  useEffect(() => {
    const interval = setInterval(() => {
      setPositions((prev) =>
        prev.map((pos, i) => {
          const nextStep = (stepRef.current[i] + 1) % trotinetesPaths[i].length;
          stepRef.current[i] = nextStep;
          return trotinetesPaths[i][nextStep] as [number, number];
        })
      );
    }, 1200); // muda de posição a cada 1.2s
    return () => clearInterval(interval);
  }, []);

  const navigate = useNavigate();

  // Verifica login ao montar
  React.useEffect(() => {
    const user = Cookies.get("user");
    if (user !== "joao_maria") {
      navigate(`/login`);
    }
  }, [navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7faf7",
        fontFamily: "Inter, Arial, sans-serif",
        color: "#222",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          width: 220,
          background: "#fff",
          borderRight: "1px solid #e6e6e6",
          padding: "32px 0 0 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        <Link to="/" style={{ display: "block" }}>
          <img
            src="/logo.png"
            alt="Midori"
            style={{ height: 90, marginBottom: 36, cursor: "pointer" }}
          />
        </Link>
        <nav style={{ width: "100%" }}>
          <SidebarItem active icon="🏠" label={texts.title} />
          <SidebarItem icon="🚲" label={texts.vehicles} />
          <SidebarItem icon="👤" label={texts.clients} />
          <SidebarItem icon="🚩" label={texts.reports} />
          <div style={{ height: 32 }} />
          <SidebarItem icon="⚙️" label={texts.settings} />
          <SidebarItem icon="❓" label={texts.help} />
        </nav>
      </div>
      {/* Main */}
      <div style={{ marginLeft: 220, padding: "32px 32px 0 32px" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 24,
          }}
        >
          <div>
            <div style={{ fontWeight: 600, fontSize: 22 }}>{texts.title}</div>
            <div style={{ color: "#6bbf8e", fontSize: 15 }}>
              {texts.subtitle}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <input
              type="text"
              placeholder={texts.search}
              style={{
                border: "1px solid #e6e6e6",
                borderRadius: 8,
                padding: "8px 16px",
                fontSize: 15,
                background: "#fff",
                width: 260,
              }}
            />
            <div
              style={{
                background: "#f7faf7",
                borderRadius: 20,
                padding: "6px 18px",
                fontWeight: 500,
                color: "#178a4c",
                border: "1px solid #e6e6e6",
              }}
            >
              João Maria
            </div>
            <button
              onClick={() => {
                Cookies.remove("user");
                navigate("/login");
              }}
              style={{
                marginLeft: 16,
                background: "#eee",
                border: "none",
                borderRadius: 8,
                padding: "6px 18px",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
        </div>
        {/* Estatísticas e mapa */}
        <div style={{ display: "flex", gap: 32, marginBottom: 32 }}>
          {/* Estatísticas */}
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 2px 12px #0001",
              padding: 24,
              flex: 1.2,
              minWidth: 340,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 18,
              }}
            >
              <div style={{ fontWeight: 600 }}>{texts.stats}</div>
              <select
                style={{
                  border: "1px solid #e6e6e6",
                  borderRadius: 8,
                  padding: "4px 10px",
                  fontSize: 14,
                  background: "#f7faf7",
                }}
              >
                <option>{texts.last7}</option>
              </select>
            </div>
            <div style={{ display: "flex", gap: 24 }}>
              <StatCard
                label={texts.users}
                value="24"
                percent="+7%"
                chartColor="#6bbf8e"
                chartData={[2, 3, 4, 6, 8, 12, 24]}
                date="Terça 23 Abril 2025"
              />
              <StatCard
                label={texts.orders}
                value="32"
                percent="+5%"
                chartColor="#178a4c"
                chartData={[3, 4, 6, 10, 15, 20, 32]}
                date="Pedidos dos últimos 7 dias"
              />
            </div>
          </div>
          {/* Mapa */}
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 2px 12px #0001",
              padding: 0,
              flex: 1.1,
              minWidth: 320,
              minHeight: 220,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "18px 24px 0 24px",
              }}
            >
              <div style={{ fontWeight: 600 }}>{texts.map}</div>
              <button
                style={{
                  background: "#e6f5ec",
                  color: "#178a4c",
                  border: "none",
                  borderRadius: 8,
                  padding: "4px 14px",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                +
              </button>
            </div>
            <div style={{ flex: 1, minHeight: 180 }}>
              <MapContainer
                center={[40.6405, -8.6538]}
                zoom={14}
                style={{
                  width: "100%",
                  height: 180,
                  borderRadius: 12,
                  marginTop: 12,
                }}
                scrollWheelZoom={false}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {positions.map((pos, i) => (
                  <Marker key={i} position={pos as [number, number]} icon={bikeIcon}>
                    <Popup>{`Trotinete ${i + 1}`}</Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>
        {/* Orders e Horário */}
        <div style={{ display: "flex", gap: 32 }}>
          {/* Orders */}
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 2px 12px #0001",
              padding: 24,
              flex: 1.1,
              minWidth: 320,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 18,
              }}
            >
              <div style={{ fontWeight: 600 }}>{texts.ordersTitle}</div>
              <button
                style={{
                  background: "#e6f5ec",
                  color: "#178a4c",
                  border: "none",
                  borderRadius: 8,
                  padding: "4px 14px",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                {texts.all}
              </button>
            </div>
            {/* Orders list */}
            <OrderList lang={lang} />
          </div>
          {/* Horário */}
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 2px 12px #0001",
              padding: 24,
              flex: 1.4,
              minWidth: 420,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 18,
              }}
            >
              <div style={{ fontWeight: 600 }}>{texts.schedule}</div>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={tabBtnStyle}>{texts.day}</button>
                <button
                  style={{
                    ...tabBtnStyle,
                    background: "#e6f5ec",
                    color: "#178a4c",
                  }}
                >
                  {texts.week}
                </button>
                <button style={tabBtnStyle}>{texts.month}</button>
              </div>
            </div>
            {/* Fake schedule */}
            <ScheduleTable lang={lang} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Sidebar item component
function SidebarItem({
  icon,
  label,
  active = false,
}: {
  icon: string;
  label: string;
  active?: boolean;
}) {
  // Adiciona painel de veículos ao clicar em "Veículos"
  const [showVehicles, setShowVehicles] = useState(false);

  if (label === "Veículos" || label === "Vehicles") {
    return (
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 32px",
            background: active ? "#e6f5ec" : "none",
            color: active ? "#178a4c" : "#222",
            fontWeight: active ? 600 : 500,
            borderRadius: 8,
            marginBottom: 6,
            cursor: "pointer",
          }}
          onClick={() => setShowVehicles((v) => !v)}
        >
          <span style={{ fontSize: 20 }}>{icon}</span>
          <span>{label}</span>
        </div>
        {showVehicles && (
          <div style={{
            background: "#f7faf7",
            borderRadius: 8,
            margin: "8px 16px 8px 48px",
            padding: "12px 16px",
            boxShadow: "0 2px 8px #0001",
            fontSize: 15,
            color: "#178a4c"
          }}>
            <div style={{ marginBottom: 6 }}>🚲 {label === "Veículos" ? "Trotinetes" : "Scooters"}: <b>12</b></div>
            <div style={{ marginBottom: 6 }}>🚴 {label === "Veículos" ? "Bicicletas" : "Bikes"}: <b>8</b></div>
            <div>🛵 {label === "Veículos" ? "Motos" : "Motorbikes"}: <b>6</b></div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 32px",
        background: active ? "#e6f5ec" : "none",
        color: active ? "#178a4c" : "#222",
        fontWeight: active ? 600 : 500,
        borderRadius: 8,
        marginBottom: 6,
        cursor: "pointer",
      }}
    >
      <span style={{ fontSize: 20 }}>{icon}</span>
      <span>{label}</span>
    </div>
  );
}

// Estatística card
function StatCard({
  label,
  value,
  percent,
  chartColor,
  chartData,
  date,
}: any) {
  return (
    <div style={{ flex: 1 }}>
      <div style={{ fontWeight: 500, marginBottom: 4 }}>{label}</div>
      <div
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: "#178a4c",
          marginBottom: 2,
        }}
      >
        {value}
      </div>
      <div style={{ color: "#6bbf8e", fontSize: 13, marginBottom: 8 }}>
        {percent}
      </div>
      {/* Fake chart */}
      <div style={{ height: 48, marginBottom: 6 }}>
        <svg width="100%" height="48">
          <polyline
            fill="none"
            stroke={chartColor}
            strokeWidth="3"
            points={chartData
              .map((y: number, i: number) => `${i * 30},${48 - y * 2}`)
              .join(" ")}
          />
        </svg>
      </div>
      <div style={{ color: "#888", fontSize: 12 }}>{date}</div>
    </div>
  );
}

// Orders list (mais pessoas aleatórias)
function OrderList({ lang }: { lang: string }) {
  const orders = [
    {
      id: "23827322",
      type: lang === "en" ? "Scooter 2" : "Trotinete 2",
      user: "Manuel Mendes",
      status: lang === "en" ? "in use" : "em uso",
      date: "24 Abril 2025",
    },
    {
      id: "23827331",
      type: lang === "en" ? "Bike 4" : "Bicicleta 4",
      user: "Sara Chaves",
      status: lang === "en" ? "returned" : "devolvida",
      date: "17 Abril 2025",
    },
    {
      id: "23827345",
      type: lang === "en" ? "Scooter 7" : "Trotinete 7",
      user: "João Silva",
      status: lang === "en" ? "in use" : "em uso",
      date: "25 Abril 2025",
    },
    {
      id: "23827358",
      type: lang === "en" ? "Bike 2" : "Bicicleta 2",
      user: "Ana Martins",
      status: lang === "en" ? "in use" : "em uso",
      date: "25 Abril 2025",
    },
    {
      id: "23827361",
      type: lang === "en" ? "Scooter 3" : "Trotinete 3",
      user: "Pedro Costa",
      status: lang === "en" ? "returned" : "devolvida",
      date: "23 Abril 2025",
    },
    {
      id: "23827377",
      type: lang === "en" ? "Bike 5" : "Bicicleta 5",
      user: "Rita Sousa",
      status: lang === "en" ? "in use" : "em uso",
      date: "26 Abril 2025",
    },
    {
      id: "23827388",
      type: lang === "en" ? "Scooter 5" : "Trotinete 5",
      user: "Tiago Rocha",
      status: lang === "en" ? "in use" : "em uso",
      date: "26 Abril 2025",
    },
    {
      id: "23827399",
      type: lang === "en" ? "Bike 1" : "Bicicleta 1",
      user: "Beatriz Lopes",
      status: lang === "en" ? "returned" : "devolvida",
      date: "22 Abril 2025",
    },
  ];
  return (
    <div>
      {orders.map((o, i) => (
        <div
          key={o.id}
          style={{
            background: "#e6f5ec",
            borderRadius: 8,
            padding: "12px 16px",
            marginBottom: 12,
            fontSize: 15,
          }}
        >
          <div style={{ fontWeight: 600, color: "#178a4c" }}>
            {o.id} - {o.type}
          </div>
          <div style={{ color: "#444" }}>{o.user}</div>
          <div style={{ color: "#888", fontSize: 13 }}>
            {o.status} · {o.date}
          </div>
        </div>
      ))}
    </div>
  );
}

// Lista de clientes (os mesmos nomes e mais alguns)
function ClientList({ lang }: { lang: string }) {
  const clients = [
    "Manuel Mendes",
    "Sara Chaves",
    "João Silva",
    "Ana Martins",
    "Pedro Costa",
    "Rita Sousa",
    "Tiago Rocha",
    "Beatriz Lopes",
    "Carlos Almeida",
    "Mariana Pinto",
    "Sofia Lemos",
    "Rodrigo Torres",
    "Augusto Neves",
    "Raquel Oliveira",
    "Rafael Almeida",
  ];
  return (
    <div style={{ marginTop: 24 }}>
      <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 12 }}>
        {lang === "en" ? "Clients" : "Clientes"}
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {clients.map((name, i) => (
          <li
            key={name}
            style={{
              background: "#f7faf7",
              borderRadius: 8,
              padding: "10px 16px",
              marginBottom: 8,
              fontSize: 15,
              color: "#178a4c",
              fontWeight: 500,
            }}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Exemplo de uso: coloque <ClientList lang={lang} /> onde quiser mostrar a lista de clientes,
// por exemplo, numa nova aba/painel ou na sidebar.

const thStyle = {
  background: "#f7faf7",
  color: "#888",
  fontWeight: 600,
  padding: "8px 8px",
};
const tdStyle = {
  background: "#fff",
  border: "1px solid #e6e6e6",
  minWidth: 80,
  padding: "8px 8px",
};
const tabBtnStyle = {
  background: "#fff",
  color: "#888",
  border: "none",
  borderRadius: 8,
  padding: "6px 18px",
  fontWeight: 500,
  cursor: "pointer",
};

// Simple schedule table component
function ScheduleTable({ lang }: { lang: string }) {
  // Dados de exemplo
  const vehicles = [
    { name: lang === "en" ? "Scooter 2" : "Trotinete 2", id: "7345674" },
    { name: lang === "en" ? "Bike 4" : "Bicicleta 4", id: "8765456" },
    { name: lang === "en" ? "Electric bike 1" : "Bicicleta eletrica 1", id: "2347854" },
    { name: lang === "en" ? "Bike 2" : "Bicicleta 2", id: "8636757" },
    { name: lang === "en" ? "Scooter 1" : "Trotinete 1", id: "6459994" },
  ];

  const days = [
    "1 Abril", "2 Abril", "3 Abril", "4 Abril", "5 Abril", "6 Abril", "7 Abril",
    "8 Abril", "9 Abril", "10 Abril", "11 Abril", "12 Abril", "13 Abril", "14 Abril",
    "15 Abril", "16 Abril", "17 Abril", "18 Abril", "19 Abril", "20 Abril", "21 Abril",
    "22 Abril", "23 Abril", "24 Abril", "25 Abril", "26 Abril", "27 Abril", "28 Abril",
    "29 Abril", "30 Abril", "1 Maio", "2 Maio", "3 Maio", "4 Maio", "5 Maio", "6 Maio"
  ];

  // Reservas de exemplo (vehicleIdx, startDayIdx, endDayIdx, nome, avatar, dataExtra)
  const bookings = [
    { v: 0, start: 0, end: 7, name: "Manuel Mendes", avatar: "/user1.jpg" },
    { v: 1, start: 2, end: 10, name: "Sara Chaves", avatar: "/user2.jpg" },
    { v: 2, start: 5, end: 15, name: "Rafael Almeida", avatar: "/user3.jpg" },
    { v: 3, start: 10, end: 20, name: "Rodrigo Torres", avatar: "/user4.jpg", date: "24 Abril 2025" },
    { v: 4, start: 12, end: 25, name: "Raquel Oliveira", avatar: "/user5.jpg", date: "1 Maio 2025" },
    { v: 3, start: 17, end: 30, name: "Augusto Neves", avatar: "/user6.jpg" },
    { v: 1, start: 20, end: 33, name: "Sofia Lemos", avatar: "/user7.jpg" },
  ];

  return (
    <div style={{
      background: "#f7faf7",
      borderRadius: 12,
      overflowX: "auto",
      padding: 0,
      border: "1px solid #e6e6e6"
    }}>
      <div style={{ display: "flex" }}>
        {/* Coluna veículos */}
        <div style={{ minWidth: 170, borderRight: "1px solid #e6e6e6" }}>
          <div style={{ height: 48 }}></div>
          {vehicles.map((v, i) => (
            <div key={v.id} style={{
              padding: "18px 12px",
              borderBottom: i < vehicles.length - 1 ? "1px solid #e6e6e6" : "none"
            }}>
              <div style={{ fontWeight: 600, color: "#178a4c", fontSize: 15 }}>{v.name}</div>
              <div style={{ color: "#888", fontSize: 13 }}>{v.id}</div>
            </div>
          ))}
        </div>
        {/* Coluna dias */}
        <div style={{ flex: 1, overflowX: "auto" }}>
          {/* Header dias */}
          <div style={{ display: "flex", borderBottom: "1px solid #e6e6e6", background: "#fff" }}>
            {days.map((d, i) => (
              <div key={d} style={{
                minWidth: 80,
                textAlign: "center",
                fontWeight: 500,
                color: i === 15 ? "#178a4c" : "#888",
                fontSize: 13,
                padding: "12px 0",
                borderLeft: i === 0 ? "none" : "1px solid #f0f0f0",
                background: i === 15 ? "#e6f5ec" : "inherit"
              }}>
                {d}
                {i === 15 && (
                  <div style={{
                    width: 4,
                    height: 36,
                    background: "#6bbf8e",
                    borderRadius: 2,
                    margin: "6px auto 0 auto"
                  }}></div>
                )}
              </div>
            ))}
          </div>
          {/* Linhas de reservas */}
          {vehicles.map((v, vi) => (
            <div key={v.id} style={{ display: "flex", position: "relative", height: 56, borderBottom: "1px solid #e6e6e6" }}>
              {/* Blocos de reservas */}
              {bookings.filter(b => b.v === vi).map((b, idx) => (
                <div key={idx} style={{
                  position: "absolute",
                  left: b.start * 80,
                  width: (b.end - b.start + 1) * 80 - 12,
                  top: 8,
                  height: 40,
                  background: "#e6f5ec",
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  boxShadow: "0 2px 8px #0001",
                  border: "1.5px solid #b2e0c7",
                  padding: "0 12px",
                  fontWeight: 500,
                  color: "#178a4c",
                  fontSize: 15,
                  zIndex: 2
                }}>
                  {b.avatar && (
                    <img src={b.avatar} alt={b.name} style={{
                      width: 28, height: 28, borderRadius: "50%", marginRight: 10, border: "2px solid #fff", boxShadow: "0 1px 4px #0001"
                    }} />
                  )}
                  <span style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: 120
                  }}>{b.name}</span>
                  {b.date && (
                    <span style={{
                      background: "#fff",
                      color: "#178a4c",
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: 500,
                      marginLeft: 10,
                      padding: "2px 10px",
                      border: "1px solid #b2e0c7"
                    }}>
                      <span role="img" aria-label="calendar">📅</span> {b.date}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

