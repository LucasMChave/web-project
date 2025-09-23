"use client";
import React, { useState } from "react";
import "./style.css";

export default function PagCadPaciente() {
  const [form, setForm] = useState({
    email: "",
    senha: "",
    CPF: "",
    endereço: "",
    nome: "",
    data_de_nascimento: "",
    sexo: "",
    confirmarSenha: "",
  });

  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    // validações mínimas
    const required = [
      "email",
      "senha",
      "CPF",
      "nome",
      "data_de_nascimento",
      "sexo",
    ];
    const faltando = required.filter((k) => !form[k]?.trim());
    if (faltando.length) {
      return setStatus({ type: "error", message: "Preencha todos os campos obrigatórios." });
    }
    if (form.senha !== form.confirmarSenha) {
      return setStatus({ type: "error", message: "As senhas não coincidem." });
    }

    try {
      setLoading(true);
      const params = new URLSearchParams();
      // chaves iguais às colunas do banco
      params.append("email", form.email);
      params.append("senha", form.senha);
      params.append("CPF", form.CPF);
      params.append("endereço", form.endereço || "");              // opcional
      params.append("nome", form.nome);
      params.append("data_de_nascimento", form.data_de_nascimento);
      params.append("sexo", form.sexo);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/paciente/cadastrar.php`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });

      const data = await res.json();
      if (data?.sucesso) {
        setStatus({ type: "success", message: "Paciente cadastrado com sucesso!" });
        setForm({
          email: "",
          senha: "",
          CPF: "",
          endereço: "",
          nome: "",
          data_de_nascimento: "",
          sexo: "",
          confirmarSenha: "",
        });
      } else {
        setStatus({ type: "error", message: data?.mensagem || "Falha ao cadastrar." });
      }
    } catch {
      setStatus({ type: "error", message: "Erro ao conectar com o servidor." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="cadGeneric">
      <h1 className="title">Cadastro Paciente</h1>

      <section className="card">
        <form className="form" onSubmit={handleSubmit} noValidate>
          <input
            type="email"
            name="email"
            placeholder="E-mail*"
            value={form.email}
            onChange={onChange}
            aria-label="E-mail"
            autoComplete="email"
            required
          />

          <input
            type="password"
            name="senha"
            placeholder="Senha*"
            value={form.senha}
            onChange={onChange}
            aria-label="Senha"
            autoComplete="new-password"
            required
          />

          <input
            type="password"
            name="confirmarSenha"
            placeholder="Confirmar Senha*"
            value={form.confirmarSenha}
            onChange={onChange}
            aria-label="Confirmar Senha"
            autoComplete="new-password"
            required
          />

          <input
            name="CPF"
            placeholder="CPF*"
            value={form.CPF}
            onChange={onChange}
            aria-label="CPF"
            maxLength={16}
            required
          />

          <input
            name="endereço"
            placeholder="Endereço"
            value={form.endereço}
            onChange={onChange}
            aria-label="Endereço"
          />

          <input
            name="nome"
            placeholder="Nome*"
            value={form.nome}
            onChange={onChange}
            aria-label="Nome"
            required
          />

          <input
            type="date"
            name="data_de_nascimento"
            placeholder="Data de nascimento*"
            value={form.data_de_nascimento}
            onChange={onChange}
            aria-label="Data de nascimento"
            required
          />

          <select
            name="sexo"
            value={form.sexo}
            onChange={onChange}
            aria-label="Sexo"
            required
          >
            <option value="" disabled>Sexo*</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Outro">Outro</option>
          </select>

          {status.message && (
            <p className={`status ${status.type === "error" ? "error" : "success"}`}>
              {status.message}
            </p>
          )}

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>
      </section>
    </main>
  );
}
