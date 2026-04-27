import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { LinkButton } from "../components/LinkButton";
import { useState } from "react";
export function SignUp() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(nome, email, password);
  }
  return (
    <div>
      <div className="w-full align-center border border-gray-500 rounded-lg mt-6 p-6 ">
        <h2 className="text-xl font-bold text-gray-200 ">Crie sua conta</h2>
        <p className="text-xs text-gray-300 mb-8">
          Informe seu nome, e-mail e senha
        </p>

        <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
          <Input
            required
            legend="nome"
            placeholder="Digite o nome completo"
            onChange={(e) => setNome(e.target.value)}
          />
          <Input
            required
            legend="E_MAIL"
            type="email"
            placeholder="exemplo@mail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            required
            legend="SENHA"
            type="password"
            placeholder="Digite sua senha"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit">Cadastrar</Button>
        </form>
      </div>
      <div className="max-w- align-center border border-gray-500 rounded-lg mt-6 p-6 ">
        <h2 className="text-lg font-bold text-gray-200 ">Já uma conta?</h2>
        <p className="text-xs text-gray-300 mb-8">Entre agora mesmo</p>
        <LinkButton href="/">Acessar conta</LinkButton>
      </div>
    </div>
  );
}
