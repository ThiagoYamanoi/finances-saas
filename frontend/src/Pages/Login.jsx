import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendLogin } from '../Services/AuthApis';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const result = await sendLogin(email, password);

      if (result.token) {

        localStorage.setItem(
          'token',
          result.token
        );

        navigate('/dashboard');
      }

    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Cabeçalho */}
      <header className="bg-slate-900 px-8 py-7">
        <p className="text-sm tracking-widest text-slate-300">
          FINANCE SAAS
        </p>

        <h1 className="mt-1 text-3xl font-bold text-white">
          Minhas finanças
        </h1>
      </header>


      {/* Área do login */}
      <main className="flex justify-center px-4 py-16">

        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">

          <div className="mb-8">
            <p className="text-sm font-medium tracking-wide text-slate-500">
              BEM-VINDO
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              Entre na sua conta
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Acesse suas contas, transações e planejamento financeiro.
            </p>
          </div>


          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="seuemail@email.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-300
                  px-4
                  py-3
                  text-slate-900
                  outline-none
                  transition
                  placeholder:text-slate-400
                  focus:border-slate-700
                  focus:ring-2
                  focus:ring-slate-200
                "
              />
            </div>


            {/* Senha */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Senha
              </label>

              <input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-300
                  px-4
                  py-3
                  text-slate-900
                  outline-none
                  transition
                  placeholder:text-slate-400
                  focus:border-slate-700
                  focus:ring-2
                  focus:ring-slate-200
                "
              />
            </div>


            {/* Botão */}
            <button
              type="submit"
              className="
                w-full
                rounded-xl
                bg-slate-900
                px-4
                py-3
                font-semibold
                text-white
                transition
                hover:bg-slate-800
                active:scale-[0.99]
              "
            >
              Entrar
            </button>

          </form>

        </div>

      </main>

    </div>
  );
}

export default Login;