"use client"
import React from 'react';
import './style.css';
import { useRouter } from 'next/navigation';

export default function TelaEscolhaCadastro() {
  const router = useRouter();

  const navegarPara = (tipo) => {
    // Navegar para as rotas: /cadastro-medico, /cadastro-paciente, /cadastro-secretario, etc.
    router.push(`/PagCad${tipo}`);
  };

  return (
    <div className="telaEscolha">
      <button className="voltar-btn" onClick={() => router.push('/')}>← Voltar</button>

      <h1 className="titleEscolha">Escolha o tipo de cadastro</h1>

      <button className="botaoEscolha" onClick={() => navegarPara('Medico')}>
        Cadastro Médico
      </button>

      <button className="botaoEscolha" onClick={() => navegarPara('Paciente')}>
        Cadastro Paciente
      </button>

      <button className="botaoEscolha" onClick={() => navegarPara('Secretario')}>
        Cadastro Secretário
      </button>
    </div>
  );
}
