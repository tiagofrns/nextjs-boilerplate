import Cookies from "js-cookie";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const lang = params.get("lang") || "pt"; // padrão para pt

  React.useEffect(() => {
    const user = Cookies.get("user");
    if (user === "joao_maria") {
      navigate(`/dashboard?lang=${lang}`);
    }
  }, [navigate, lang]);

  // Use lang para textos:
  const texts =
    {
      pt: {
        welcome: "Bem-vindo!",
        credentials: "Coloca as tuas credenciais de fornecedor para continuar.",
        email: "Email",
        password: "Palavra-passe",
        forgot: "Esqueci-me da palavra-passe",
        remember: "Lembrar durante 30 dias",
        enter: "Entrar"
      },
      en: {
        welcome: "Welcome!",
        credentials: "Enter your supplier credentials to continue.",
        email: "Email",
        password: "Password",
        forgot: "Forgot password",
        remember: "Remember for 30 days",
        enter: "Sign in"
      }
    }[lang] || {
      welcome: "Bem-vindo!",
      credentials: "Coloca as tuas credenciais de fornecedor para continuar.",
      email: "Email",
      password: "Palavra-passe",
      forgot: "Esqueci-me da palavra-passe",
      remember: "Lembrar durante 30 dias",
      enter: "Entrar"
    };

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [remember, setRemember] = useState(false);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (email === "jfernan@ua.pt" && pass === "jfer") {
      Cookies.set("user", "joao_maria", { expires: 30 }); // 30 dias
      navigate(`/dashboard?lang=${lang}`);
    } else {
      alert(lang === "en" ? "Invalid credentials" : "Credenciais inválidas");
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "stretch",
      background: "#fff"
    }}>
      {/* Esquerda: Login */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "0 40px 0 60px",
        maxWidth: 480
      }}>
        <Link to="/">
          <img src="/logo.png" alt="Midori Mobilidade" style={{ height: 90, marginBottom: 40 }} />
        </Link>
        {/* Título e formulário */}
        <h2 style={{ marginBottom: 8 }}>{texts.welcome}</h2>
        <div style={{ marginBottom: 24, color: "#222", fontSize: 15 }}>
          {texts.credentials}
        </div>
        <form style={{ width: "100%" }} onSubmit={handleLogin}>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontWeight: 500, fontSize: 14 }}>{texts.email}</label>
            <input
              type="email"
              placeholder="Insere o teu email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 10px",
                border: "1px solid #ccc",
                borderRadius: 6,
                marginTop: 4,
                fontSize: 15
              }}
              required
            />
          </div>
          <div style={{ marginBottom: 8 }}>
            <label style={{ fontWeight: 500, fontSize: 14 }}>{texts.password}</label>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <input
                type="password"
                placeholder="••••••••"
                value={pass}
                onChange={e => setPass(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  border: "1px solid #ccc",
                  borderRadius: 6,
                  marginTop: 4,
                  fontSize: 15
                }}
                required
              />
              <a href="#" style={{ fontSize: 12, marginLeft: 8, color: "#178a4c", textDecoration: "none" }}>
                {texts.forgot}
              </a>
            </div>
          </div>
          <div style={{ marginBottom: 16, display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              checked={remember}
              onChange={e => setRemember(e.target.checked)}
              id="remember"
              style={{ marginRight: 6 }}
            />
            <label htmlFor="remember" style={{ fontSize: 13, color: "#444" }}>
              {texts.remember}
            </label>
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              background: "#4a7c3a",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "10px 0",
              fontWeight: 600,
              fontSize: 16,
              cursor: "pointer"
            }}
          >
            {texts.enter}
          </button>
        </form>
      </div>
      {/* Direita: Imagem */}
      <div style={{
        flex: 1.2,
        background: "#f7faf7",
        borderTopRightRadius: 32,
        borderBottomRightRadius: 32,
        overflow: "hidden",
        display: "flex",
        alignItems: "stretch",

        justifyContent: "flex-end" 
      }}>
        <img
          src="/plant.jpg" // Troque para o caminho correto da sua imagem
          alt="Planta"
          style={{
            width: "100%",
            height: "100vh",
            objectFit: "cover",
            textAlign: "right",
            alignItems: "right",
            borderTopRightRadius: 32,
            borderBottomRightRadius: 32
          }}
        />
      </div>
    </div>
  );
}