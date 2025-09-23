"use client";
import React, { useState } from "react";
import "./style.css";

export default function PagCadMedico() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    sexo: "",
    especialização: "",
    CRM: "",
    formação: "",
    endereço: "",
    data_de_nascimento: "",
    senha: "",
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

    // obrigatórios segundo o schema (opcionais: especialização, endereço)
    const required = [
      "nome",
      "email",
      "formação",
      "senha",
      "data_de_nascimento",
      "sexo",
      "CRM",
    ];
    const faltando = required.filter((k) => !form[k]?.trim());
    if (faltando.length) {
      return setStatus({
        type: "error",
        message: "Preencha todos os campos obrigatórios.",
      });
    }
    if (form.senha !== form.confirmarSenha) {
      return setStatus({ type: "error", message: "As senhas não coincidem." });
    }

    try {
      setLoading(true);
      const params = new URLSearchParams();
      // nomes exatamente como estão no seu banco (com acentos)
      params.append("nome", form.nome);
      params.append("email", form.email);
      params.append("formação", form.formação);
      params.append("endereço", form.endereço || "");
      params.append("senha", form.senha);
      params.append("data_de_nascimento", form.data_de_nascimento);
      params.append("sexo", form.sexo);
      params.append("especialização", form.especialização || "");
      params.append("CRM", form.CRM);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/medico/cadastrar.php`,
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: params.toString(),
        }
      );

      const data = await res.json();
      if (data?.sucesso) {
        setStatus({
          type: "success",
          message: "Médico cadastrado com sucesso!",
        });
        setForm({
          nome: "",
          email: "",
          sexo: "",
          especialização: "",
          CRM: "",
          formação: "",
          endereço: "",
          data_de_nascimento: "",
          senha: "",
          confirmarSenha: "",
        });
      } else {
        setStatus({
          type: "error",
          message: data?.mensagem || "Falha ao cadastrar.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        message: "Erro ao conectar com o servidor.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="cadGeneric">
      <h1 className="title">Cadastro Médico</h1>

      <section className="card">
        <form className="form" onSubmit={handleSubmit} noValidate>
          <input
            name="nome"
            placeholder="Nome*"
            value={form.nome}
            onChange={onChange}
            aria-label="Nome"
            required
          />

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

          <select
            name="sexo"
            value={form.sexo}
            onChange={onChange}
            aria-label="Sexo"
            required
          >
            <option value="" disabled>
              Sexo*
            </option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Outro">Outro</option>
          </select>

          <input
            name="especialização"
            placeholder="Especialização (opcional)"
            value={form.especialização}
            onChange={onChange}
            aria-label="Especialização"
          />

          <input
            name="CRM"
            placeholder="CRM*"
            value={form.CRM}
            onChange={onChange}
            aria-label="CRM"
            required
          />

          <input
            name="formação"
            placeholder="Formação*"
            value={form.formação}
            onChange={onChange}
            aria-label="Formação"
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
            type="date"
            name="data_de_nascimento"
            placeholder="Data de nascimento*"
            value={form.data_de_nascimento}
            onChange={onChange}
            aria-label="Data de nascimento"
            required
          />

          <input
            name="endereço"
            placeholder="Endereço (opcional)"
            value={form.endereço}
            onChange={onChange}
            aria-label="Endereço"
          />

          {status.message && (
            <p
              className={`status ${
                status.type === "error" ? "error" : "success"
              }`}
            >
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
