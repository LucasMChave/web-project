"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import './style.css';


export default function CadastroMedico() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    sexo: '',
    especializacao: '',
    crm: '',
    formacao: '',
    senha: '',
    confirmarSenha: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const senhaValida = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}$/;

    if (formData.senha !== formData.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    if (!senhaValida.test(formData.senha)) {
      alert('A senha deve conter ao menos uma letra maiúscula e um símbolo especial.');
      return;
    }

    console.log('Cadastro médico enviado:', formData);
    alert('Cadastro realizado com sucesso!');
    navigate('/home-medico');
  };

  return (
    <div className="telaCadastro">
      <button className="voltar-btn" onClick={() => router.push('/TelaEscolhaCadastro')}>← Voltar</button>

      <h1>Cadastro Médico</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="sexo"
          placeholder="Sexo"
          value={formData.sexo}
          onChange={handleChange}
        />
        <input
          type="text"
          name="especializacao"
          placeholder="Especialização"
          value={formData.especializacao}
          onChange={handleChange}
        />
        <input
          type="text"
          name="crm"
          placeholder="CRM"
          value={formData.crm}
          onChange={handleChange}
        />
        <input
          type="text"
          name="formacao"
          placeholder="Formação"
          value={formData.formacao}
          onChange={handleChange}
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={formData.senha}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmarSenha"
          placeholder="Confirmar Senha"
          value={formData.confirmarSenha}
          onChange={handleChange}
        />

        <button type="submit" className="botao-cadastrar">Cadastrar</button>
      </form>
    </div>
  );
}
