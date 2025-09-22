"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import './style.css';


export default function CadastroPaciente() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    sexo: '',
    dataNascimento: '',
    cpf: '',
    telefone: '',
    endereco: '',
    possuiPlano: false,
    fornecedoraPlano: '',
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Cadastro de paciente enviado:', formData);
    alert('Cadastro realizado com sucesso!');
    router.push('/HomePaciente');
  };

  return (
    <div className="telaCadastro">
      <button className="voltar-btn" onClick={() => router.push('/TelaEscolhaCadastro')}>← Voltar</button>

      <form onSubmit={handleSubmit}>
        <h1>Cadastro de Paciente</h1>

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
          type="text"
          placeholder="Sexo (Masculino, Feminino, Outro)"
          value={formData.sexo}
          onChange={(e) => handleChange('sexo', e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Data de Nascimento (dd/mm/aaaa)"
          value={formData.dataNascimento}
          onChange={(e) => handleChange('dataNascimento', e.target.value)}
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
          type="tel"
          placeholder="Telefone"
          value={formData.telefone}
          onChange={(e) => handleChange('telefone', e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Endereço"
          value={formData.endereco}
          onChange={(e) => handleChange('endereco', e.target.value)}
          required
        />

        <label className="checkboxLabel">
          <input
            type="checkbox"
            checked={formData.possuiPlano}
            onChange={(e) => handleChange('possuiPlano', e.target.checked)}
          />
          <span className="checkboxText">Possui plano de saúde?</span>
        </label>

        {formData.possuiPlano && (
          <input
            type="text"
            placeholder="Fornecedora do Plano"
            value={formData.fornecedoraPlano}
            onChange={(e) => handleChange('fornecedoraPlano', e.target.value)}
          />
        )}

        <button type="submit" className="botao-cadastrar">Cadastrar</button>
      </form>
    </div>
  );
}
