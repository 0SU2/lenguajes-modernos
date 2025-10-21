import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import FormError from "../../components/ui/FormError";

import * as React from 'react';
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [ usuario, setUsuario ] = React.useState<string>('');
  const [ password, setPassword ] = React.useState<string>('');

  const  [ loading, setLoading ] = React.useState<boolean>(false);
  const [ error, setError ] =  React.useState<string | undefined>('');
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);
    setLoading(true);
    try {
      await login(usuario, password);
      navigate('/dashboard');
    } catch (error) {
      setError('Error de autenticacion');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white">Iniciar Session</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <Input label="Usuario" value={usuario} required onChange={(e) => setUsuario(e.target.value)}/>
        <Input label="Password" value={password} required onChange={(e) => setPassword(e.target.value)}/>
        { error ? <FormError message={error}/> : <></>}
        <Button type="submit" loading={loading} className="w-full text-orange-600 font-semibold">Entrar</Button>
      </form>
      <div className="mt-3 text-sm text-white">
        No tienes cuenta? &nbsp;
        <Link to="/register" className="link link-primary">Registrate</Link>
      </div>
    </div>
  )
}