import { useState } from "react";
import { z, ZodError } from "zod";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";

import { api } from "../services/api";

import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { LinkButton } from "../components/LinkButton";

const signUpSchema = z
  .object({
    name: z.string().trim().min(1, { message: "Informe seu nome" }),
    email: z.string().email({ message: "Email inválido" }),
    password: z
      .string()
      .min(6, { message: "Senha deve ter pelo menos 6 dígitos" }),
    passwordConfirm: z.string({ message: "Confirme a senha" }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "As senhas não são iguais",
    path: ["passwordConfirm"],
  });

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordconfirm] = useState("");

  const navigate = useNavigate();

  async function onSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    try {
      const data = signUpSchema.parse({
        name,
        email,
        password,
        passwordConfirm,
      });

      await api.post("/users", data);

      navigate("/");
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        return alert(error.issues[0].message);
      }
      if (error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      return alert("Não foi possivel cadastrar!");
    }
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
            onChange={(e) => setName(e.target.value)}
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

          <Input
            required
            legend="Confirmação de SENHA"
            type="password"
            placeholder="Confirme sua senha"
            onChange={(e) => setPasswordconfirm(e.target.value)}
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
