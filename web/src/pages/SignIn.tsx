import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { LinkButton } from "../components/LinkButton";
import { useState } from "react";
export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [isLoading, setIsLoading] = useState("");
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(email, password);
  }
  return (
    <div>
      <div className="w-full align-center border border-gray-500 rounded-lg mt-6 p-6 ">
        <h2 className="text-xl font-bold text-gray-200 ">Acesse o portal</h2>
        <p className="text-xs text-gray-300 mb-8">
          Entre usando seu e-mail e senha cadastrados
        </p>

        <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
          <Input
            required
            legend="E_MAIL"
            type="email"
            placeholder="exemlo@mail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            required
            legend="SENHA"
            type="password"
            placeholder="Digite sua senha"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit">Entrar</Button>
        </form>
      </div>
      <div className="max-w- align-center border border-gray-500 rounded-lg mt-6 p-6 ">
        <h2 className="text-lg font-bold text-gray-200 ">
          Ainda não tem conta?
        </h2>
        <p className="text-xs text-gray-300 mb-8">Cadastre agora mesmo</p>
        <LinkButton href="/signup">Criar conta</LinkButton>
      </div>
    </div>
  );
}
