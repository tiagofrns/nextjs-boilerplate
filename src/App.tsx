import React, { useState } from "react";
import Select, { SingleValue } from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/main.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Resultados from "./Resultados";
import Login from "./Login";
import Dashboard from "./Dashboard";

const translations = {
  pt: {
    options: "As nossas opções",
    how: "Como funciona",
    why: "Porquê a Midori",
    admin: "Sou fornecedor/admin",
    heroTitle: (
      <>
        Encontra,<br />
        reserva e aluga<br />
        com facilidade
      </>
    ),
    heroDesc: "Descarrega a app e começa a tua viagem agora mesmo!",
    searchLocation: "Procurar na tua localização",
    searchStart: "Data de partida",
    searchEnd: "Data de chegada",
    searchBtn: "Pesquisar",
    stepsTitle: "Aluga em 3 passos simples",
    step1: "Escolhe a localização",
    step2: "Reserva a data",
    step3: "Desfruta do passeio",
    featuresTitle: (
      <>
        Não oferecemos o melhor do mercado,<br />oferecemos o melhor para ti
      </>
    ),
    features: [
      "Veículos elétricos modernos",
      "Preços acessíveis",
      "Reserva fácil e rápida",
      "Suporte ao cliente dedicado",
    ],
    optionsTitle: "Escolhe o teu veículo",
    option1: "Bicicleta Urbana",
    option2: "Bicicleta Elétrica",
    option3: "Trotinete",
    testimonialsTitle: "O que os nossos clientes dizem",
    testimonial1: "Serviço excelente, recomendo a todos!",
    testimonial2: "Fácil de usar e muito prático.",
    downloadTitle: "Baixa a aplicação gratuitamente",
    copyright: "Todos os direitos reservados.",
  },
  en: {
    options: "Our options",
    how: "How it works",
    why: "Why Midori",
    admin: "I'm a provider/admin",
    heroTitle: (
      <>
        Find,<br />
        book and rent<br />
        with ease
      </>
    ),
    heroDesc: "Download the app and start your trip now!",
    searchLocation: "Search your location",
    searchStart: "Start date",
    searchEnd: "End date",
    searchBtn: "Search",
    stepsTitle: "Rent in 3 simple steps",
    step1: "Choose location",
    step2: "Book the date",
    step3: "Enjoy the ride",
    featuresTitle: (
      <>
        We don't offer the best on the market,<br />we offer the best for you
      </>
    ),
    features: [
      "Modern electric vehicles",
      "Affordable prices",
      "Easy and fast booking",
      "Dedicated customer support",
    ],
    optionsTitle: "Choose your vehicle",
    option1: "Urban Bike",
    option2: "Electric Bike",
    option3: "Scooter",
    testimonialsTitle: "What our customers say",
    testimonial1: "Excellent service, I recommend it to everyone!",
    testimonial2: "Easy to use and very practical.",
    downloadTitle: "Download the app for free",
    copyright: "All rights reserved.",
  },
};

// Lista de localizações (exemplo)
const locations = [
{ value: "agueda", label: "Águeda" },
{ value: "albergaria-a-velha", label: "Albergaria-a-Velha" },
{ value: "anadia", label: "Anadia" },
{ value: "aveiro", label: "Aveiro" },
{ value: "castelo-de-paiva", label: "Castelo de Paiva" },
{ value: "espinho", label: "Espinho" },
{ value: "estarreja", label: "Estarreja" },
{ value: "ília", label: "Ílhavo" },
{ value: "murtosa", label: "Murtosa" },
{ value: "oliveira-de-azemeis", label: "Oliveira de Azeméis" },
{ value: "oliveira-do-bairro", label: "Oliveira do Bairro" },
{ value: "ovar", label: "Ovar" },
{ value: "santa-maria-da-feira", label: "Santa Maria da Feira" },
{ value: "são-joão-da-madeira", label: "São João da Madeira" },
{ value: "sever-do-vouga", label: "Sever do Vouga" },
{ value: "vagos", label: "Vagos" },
{ value: "vale-de-cambra", label: "Vale de Cambra" },

  // ...adicione mais cidades
];

// Defina o tipo para as opções
type LocationOption = { value: string; label: string };

function App() {
  const [lang, setLang] = useState<"pt" | "en">("pt");
  const [selectedLocation, setSelectedLocation] = useState<LocationOption | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const t = translations[lang];
  const navigate = useNavigate();

  function handleSearch() {
    if (!selectedLocation || !startDate || !endDate) return;
    navigate(`/resultados?loc=${selectedLocation.value}&start=${startDate.toISOString()}&end=${endDate.toISOString()}`);
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header__left">
          <img src="/logo.png" alt="Midori Logo" className="logo" />
        </div>
        <nav className="header__nav">
          <a href="#">{t.options}</a>
          <a href="#">{t.how}</a>
          <a href="#">{t.why}</a>
        </nav>
        <div className="header__right">
          <span className="lang" style={{ cursor: "pointer" }}>
            <span
              onClick={() => setLang("pt")}
              style={{
                fontWeight: lang === "pt" ? "bold" : "normal",
                opacity: lang === "pt" ? 1 : 0.6,
                marginRight: 4,
              }}
              role="img"
              aria-label="Português"
            >
              🇵🇹
            </span>
            /
            <span
              onClick={() => setLang("en")}
              style={{
                fontWeight: lang === "en" ? "bold" : "normal",
                opacity: lang === "en" ? 1 : 0.6,
                marginLeft: 4,
              }}
              role="img"
              aria-label="English"
            >
              🇬🇧
            </span>
          </span>
          <button className="admin-btn" onClick={() => navigate(`/login?lang=${lang}`)}>{t.admin}</button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero__content">
          <h1>{t.heroTitle}</h1>
          <p>{t.heroDesc}</p>
          <div className="hero__apps">
            <img src="/google-play-badge.png" alt="Google Play" style={{ height: 102, marginRight: 12 }} />
            <img src="/app-store-badge.png" alt="App Store" style={{ height: 102 }} />
          </div>
          <div className="search-bar">
            <div className="search-field">
              <span className="search-icon">
                {/* Localização SVG */}
                <svg width="24" height="24" fill="none" stroke="#888" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 1 8 8c0 5.25-8 12-8 12S4 15.25 4 10a8 8 0 0 1 8-8z"/></svg>
              </span>
              <div>
                <div className="search-label">{lang === "pt" ? "Localização" : "Location"}</div>
                <Select
                  options={locations}
                  value={selectedLocation}
                  onChange={(option: SingleValue<LocationOption>) => setSelectedLocation(option)}
                  placeholder={t.searchLocation}
                  isClearable
                  styles={{
                    container: base => ({ ...base, minWidth: 180 }),
                    control: base => ({ ...base, border: "none", boxShadow: "none", background: "transparent" }),
                    menu: base => ({ ...base, zIndex: 9999 }),
                  }}
                />
              </div>
            </div>
            <div className="search-divider" />
            {/* Data de partida */}
            <div className="search-field">
              <span className="search-icon">
                {/* Calendário SVG */}
                <svg width="24" height="24" fill="none" stroke="#888" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="4"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              </span>
              <div>
                <div className="search-label">{lang === "pt" ? "Data de partida" : "Start date"}</div>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Escolha a data de partida"
                  dateFormat="dd MMMM yyyy, HH:mm"
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  className="datepicker-input"
                />
              </div>
            </div>
            <div className="search-divider" />
            {/* Data de chegada */}
            <div className="search-field">
              <span className="search-icon">
                {/* Calendário SVG */}
                <svg width="24" height="24" fill="none" stroke="#888" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="4"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              </span>
              <div>
                <div className="search-label">{lang === "pt" ? "Data de chegada" : "End date"}</div>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate ?? undefined}
                  placeholderText="Escolha a data de chegada"
                  dateFormat="dd MMMM yyyy, HH:mm"
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  className="datepicker-input"
                />
              </div>
            </div>
            <button className="search-btn" onClick={handleSearch}>{t.searchBtn}</button>
          </div>
        </div>
        <div className="hero__image">
          <img src="/bike-illustration.png" alt="Bike" />
        </div>
      </section>

      {/* Steps Section */}
      <section className="steps">
        <h2>{t.stepsTitle}</h2>
        <div className="steps__list">
          <div className="step">
            <div className="step__icon">📍</div>
            <div className="step__text">{t.step1}</div>
          </div>
          <div className="step">
            <div className="step__icon">📅</div>
            <div className="step__text">{t.step2}</div>
          </div>
          <div className="step">
            <div className="step__icon">🚲</div>
            <div className="step__text">{t.step3}</div>
          </div>
        </div>
      </section>

      {/* Partners Bar */}
      <section className="partners" style={{
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 32,
  background: "#fff",
  borderRadius: 16,
  boxShadow: "0 2px 12px #0001",
  padding: "24px 0",
  margin: "32px auto",
  maxWidth: 700,
}}>
  <img src="/visa.png" alt="Visa" style={{ height: 38, filter: "grayscale(0.3)" }} />
  <img src="/mbway.png" alt="MBWay" style={{ height: 38, filter: "grayscale(0.3)" }} />
  <img src="/mastercard.png" alt="Mastercard" style={{ height: 38, filter: "grayscale(0.3)" }} />
  <img src="/paypal.png" alt="Paypal" style={{ height: 38, filter: "grayscale(0.3)" }} />
  <img src="/applepay.png" alt="Apple Pay" style={{ height: 38, filter: "grayscale(0.3)" }} />
</section>

      {/* Features Section */}
      <section className="features">
        <div className="features__image">
          <img src="/trotinete2.png" alt="Trotinete" />
        </div>
        <div className="features__content">
          <h2 style={{ fontSize: 32, fontWeight: 700 }}>{t.featuresTitle}</h2>
          <ul>
            {t.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Options Section */}
      <section className="options">
        <h2>{t.optionsTitle}</h2>
        <div className="options__list">
          <div className="option">
            <img src="/bike1.png" alt={t.option1} />
            <div>{t.option1}</div>
          </div>
          <div className="option">
            <img src="/bike2.png" alt={t.option2} />
            <div>{t.option2}</div>
          </div>
          <div className="option">
            <img src="/trotinete2.png" alt={t.option3} />
            <div>{t.option3}</div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>{t.testimonialsTitle}</h2>
        <div className="testimonials__list">
          <div className="testimonial">
            <div className="testimonial__rating">5.0 ★★★★★</div>
            <p>{t.testimonial1}</p>
            <div className="testimonial__user">
              <img src="/user1.jpg" alt="User 1" />
              <span>João Silva</span>
            </div>
          </div>
          <div className="testimonial">
            <div className="testimonial__rating">5.0 ★★★★★</div>
            <p>{t.testimonial2}</p>
            <div className="testimonial__user">
              <img src="/user2.jpg" alt="User 2" />
              <span>Maria Costa</span>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="download">
        <h2>{t.downloadTitle}</h2>
        <div className="download__apps">
          <img
            src="/google-play-badge.png"
            alt="Google Play"
            style={{ height: 100, marginRight: 12 }} // badge mais pequena
          />
          <img
            src="/app-store-badge.png"
            alt="App Store"
            style={{ height: 100 }} // badge mais pequena
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div>
          © {new Date().getFullYear()} Midori. {t.copyright}
        </div>
      </footer>
    </div>
  );
}

export default function MainApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/resultados" element={<Resultados />} />
      </Routes>
    </BrowserRouter>
  );
}
