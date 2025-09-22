"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import './style.css';

const HomeSecretario = () => {
  const navigate = useRouter();
  const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));
  const userName = usuarioSalvo?.nome || "Secretário";
  const tipoUsuario = usuarioSalvo?.tipo;

  const [hora, setHora] = useState(new Date());

  // useEffect(() => {
  //   if (!usuarioSalvo || tipoUsuario !== "secretario") {
  //     alert("Acesso permitido apenas para secretários.");
  //     navigate("/");
  //   }
  // }, [usuarioSalvo, tipoUsuario, navigate]);

  useEffect(() => {
    const timer = setInterval(() => setHora(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const menuItems = [
    { label: "Agendar Consulta", icon: "📅", path: "/agendar-consulta" },
    { label: "Listar Consultas", icon: "📋", path: "/listar-consultas" },
    { label: "Mapa", icon: "📍", path: "/mapa" },
    { label: "Configuração", icon: "⚙️", path: "/configuracao" },
    { label: "Conta", icon: "👤", path: "/conta" },
    { label: "Suporte", icon: "🆘", path: "/suporte" },
  ];

  return (
    <div className="home-wrapper">
      <div className="home-container">
        <header className="home-header">
          <span>MED-ORG</span>
          <span className="hora">
            {hora.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </header>

        <div className="usuario-nome">{userName}</div>

        <div className="menu-container">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => item.path && router.push(item.path)}
              className="menu-item"
              aria-label={item.label}
            >
              <span className="menu-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeSecretario;
