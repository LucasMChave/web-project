"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect } from "react";
import './style.css';

const HomePaciente = () => {
  const router = useRouter();

  const usuarioSalvo = null;
  const userName = usuarioSalvo?.nome || "Usuário";
  const tipoUsuario = usuarioSalvo?.tipo;

  useEffect(()=> {
      usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));
      userName = usuarioSalvo?.nome || "Médico";
      tipoUsuario = usuarioSalvo?.tipo;
  }, [])

  // useEffect(() => {
  //   if (tipoUsuario !== "paciente") {
  //     alert("Acesso permitido apenas para pacientes.");
  //     router.push("/");
  //   }
  // }, [tipoUsuario, router]);

  const menuItems = [
    { label: "Falar com Médicos", icon: "💬", path: "/BatePapo" },
    { label: "Agendamentos", icon: "📅", path: "/servicos-oferecidos" },
    { label: "Prescrições Atuais", icon: "💊", path: "/PrescricaoPaciente" },
    { label: "Mapa", icon: "📍" },
    { label: "Conta", icon: "👤" },
    { label: "Configurações", icon: "⚙️" },
  ];

  return (
    <div className="home-wrapper">
      <div className="home-container">
        <header className="home-header">
          <span>MED-ORG</span>
          <span className="hora">
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </header>

        <div className="usuario-nome">{userName}</div>

        <div className="menu-container">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => item.path && router.push(item.path)}
              className="menu-item"
            >
              <span className="menu-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}

          <button onClick={() => router.push("/PagSuporte")} className="menu-item suporte-button">
            <span className="menu-icon">🆘</span>
            <span>Suporte</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePaciente;
