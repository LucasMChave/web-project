"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import './style.css';


export default function CadastroSecretario() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    sexo: '',
    dataNascimento: '',
    endereco: '',
    senha: '',
    confirmarSenha: '',
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.senha !== formData.confirmarSenha) {
      alert('As senhas não coincidem.');
      return;
    }

    console.log('Cadastro de secretário enviado:', formData);
    alert('Cadastro realizado com sucesso!');
    router.push('/HomeSecretario');
  };

  return (
    <div className="telaCadastro">
      <button className="voltar-btn" onClick={() => router.push('/TelaEscolhaCadastro')}>← Voltar</button>

      <form onSubmit={handleSubmit}>
        <h1>Cadastro de Secretário</h1>

        <input
          type="text"
          placeholder="Nome"
          value={formData.nome}
          onChange={(e) => handleChange('nome', e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          required
        />

        <input
          type="tel"
          placeholder="Telefone"
          value={formData.telefone}
          onChange={(e) => handleChange('telefone', e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="CPF"
          value={formData.cpf}
          onChange={(e) => handleChange('cpf', e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Sexo"
          value={formData.sexo}
          onChange={(e) => handleChange('sexo', e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Data de Nascimento (DD/MM/AAAA)"
          value={formData.dataNascimento}
          onChange={(e) => handleChange('dataNascimento', e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Endereço"
          value={formData.endereco}
          onChange={(e) => handleChange('endereco', e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={formData.senha}
          onChange={(e) => handleChange('senha', e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirmar Senha"
          value={formData.confirmarSenha}
          onChange={(e) => handleChange('confirmarSenha', e.target.value)}
          required
        />

        <button type="submit" className="botao-cadastrar">Cadastrar</button>
      </form>
    </div>
  );
}
