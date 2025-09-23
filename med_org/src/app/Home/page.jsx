"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./style.css";

export default function HomeScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [manterConectado, setManterConectado] = useState(false);

  const excluirConta = async () => {
    const ok = window.confirm("Tem certeza que deseja excluir sua conta? Esta ação é irreversível.");
    if (!ok) return;

    try {
      const params = new URLSearchParams();
      params.append("email", email);
      params.append("senha", senha);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/paciente/delete.php`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });

      const data = await res.json();
      if (data?.sucesso) {
        alert("Conta excluída com sucesso!");
        setEmail(""); setSenha("");
      } else {
        alert(data?.mensagem || "Falha ao excluir.");
      }
    } catch {
      alert("Erro ao conectar com o servidor.");
    }
  };

  const handleEntrar = () => {
    // TODO: implemente sua autenticação aqui
  };

  return (
    <div className="telaLogin">
      <Image className="logo" src="/assets/Med-org.jpg" alt="Logo MedOrg" width={200} height={200} />
      <h1>Login</h1>

      <section className="formCard">
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <input
            id="email" type="email" placeholder="Digite seu email"
            value={email} onChange={(e) => setEmail(e.target.value)}
            aria-label="Email" autoComplete="email" required
          />

          <input
            id="senha" type="password" placeholder="Digite sua senha"
            value={senha} onChange={(e) => setSenha(e.target.value)}
            aria-label="Senha" autoComplete="current-password" required
          />

          <div className="actions">
            <button type="button" className="btn btn-neutral" onClick={() => router.push("/TelaEscolhaCadastro")}>
              Criar Conta
            </button>

            <button type="button" className="btn btn-primary" onClick={handleEntrar}>
              Entrar
            </button>

            <button type="button" className="btn btn-danger" onClick={excluirConta}>
              Excluir Conta
            </button>
          </div>

          <label className="row">
            <input
              type="checkbox"
              checked={manterConectado}
              onChange={(e) => setManterConectado(e.target.checked)}
            />
            Manter-me Conectado
          </label>
        </form>
      </section>
    </div>
  );
}
