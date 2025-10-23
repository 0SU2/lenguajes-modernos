import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import FormError from "../../components/ui/FormError";

import * as React from 'react';
import { empleadosService } from "../../services/empleados.service";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import type { CreateEmpleadoDto } from "../../types/empleado";

const schema = z.object({
  nombre   : z.string().min(2),
  apaterno : z.string().min(3),
  amaterno : z.string().min(3),
  direccion: z.string().min(5),
  telefono : z.string().min(10),
  ciudad   : z.string().min(4),
  estado   : z.string().min(4),
  usuario  : z.string().min(5),
  password : z.string().min(6),
  rol      : z.string().min(2),
});

type FormState = z.infer<typeof schema>

export default function Register() {
  const navigate = useNavigate();
  const [ form, setForm ] = React.useState<FormState>({
    nombre   : '',
    apaterno : '',
    amaterno : '',
    direccion: '',
    telefono : '',
    ciudad   : '',
    estado   : '',
    usuario  : '',
    password : '',
    rol      : 'ADMIN',
  });

  const [ loading, setLoading ] = React.useState(false);
  const [ error, setError ] = React.useState<string | undefined>('');

  const onChange = (k: keyof FormState) => (e:React.ChangeEvent<HTMLInputElement>) => setForm((s) => ({ ...s, [k]: e.target.value}));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);
    const parse = schema.safeParse(form);
    if (!parse) {
      setError('Revisa los datos del formulario');
      return;
    }

    setLoading(true);
    try {
      await empleadosService.create(parse.data as CreateEmpleadoDto);
      navigate('/login')
    } catch (error) {
      console.log('Error: ', error)
      setError('No se pudo registrar')
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white mb-2">Crear Cuenta</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Input label="Nombre" value={form.nombre} onChange={onChange('nombre')} required />
          <Input label="A. Paterno" value={form.apaterno} onChange={onChange('apaterno')} required />
          <Input label="A. Materno" value={form.amaterno} onChange={onChange('amaterno')} />
        </div>
        <div className="grid grid-cols-1">
          <Input label="Direccion" value={form.direccion} onChange={onChange('direccion')} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Input label="Telefono" value={form.telefono} onChange={onChange('telefono')} />
          <Input label="Ciudad" value={form.ciudad} onChange={onChange('ciudad')} />
          <Input label="Estado" value={form.estado} onChange={onChange('estado')} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Input label="Usuario" value={form.usuario} onChange={onChange('usuario')} required />
          <Input label="Password" value={form.password} onChange={onChange('password')} required />
          <Input label="Rol" value={form.rol} onChange={onChange('rol')} required />
        </div>
        { error ? <FormError message={error}/> : <></> }
        <Button type="submit" loading={loading} className="w-full text-orange-600 font-semibold">Registrar Usuario</Button>
      </form>
      <div className="mt-3 text-sm text-white">
        Ya tienes cuenta? &nbsp;
        <Link to='/login' className='link link-primary'>Inicia Session</Link>
      </div>
    </div>
  )
}