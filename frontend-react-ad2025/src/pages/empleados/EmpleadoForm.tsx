import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useState } from "react";
import { z } from "zod";
import type { CreateEmpleadoDto, Empleado } from "../../types/empleado";
import { empleadosService } from "../../services/empleados.service";

const createSchema = z.object({
  nombre   : z.string().min(2),
  apaterno : z.string().min(3),
  amaterno : z.string().min(3),
  direccion: z.string().min(5),
  telefono : z.string().min(10),
  ciudad   : z.string().min(4),
  estado   : z.string().min(4),
  usuario  : z.string().min(5),
  password : z.string().min(6).optional().or(z.literal('')),
  rol      : z.string().min(2),
});

type Props = {
  model?: Empleado
  onClose: () => void
  onSaved: () => void
}

export default function EmpleadoForm({ model, onClose, onSaved }: Props) {
  const isEdit = Boolean(model?.id);
  const [ form, setForm ] = useState<CreateEmpleadoDto>({
    nombre   : model?.nombre || '',
    apaterno : model?.apaterno || '',
    amaterno : model?.amaterno || '',
    direccion: model?.direccion || '',
    telefono : model?.telefono || '',
    ciudad   : model?.ciudad || '',
    estado   : model?.estado || '',
    usuario  : model?.usuario || '',
    password : model?.password || '',
    rol      : model?.rol || 'ADMIN',
  });

  const [ saving, setSaving ] = useState(false);
  const [ error, setError ] = useState<string | undefined >();

  const onChange = (k: keyof CreateEmpleadoDto) => (e:React.ChangeEvent<HTMLInputElement>) => {
    setForm((s) => ({  ...s, [k]: e.target.value }));
  }

  const onSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);
    const parsed = createSchema.safeParse(form);
    if (!parsed.success) {
      setError('Revisa los campos');
      return;
    }
    setSaving(true);

    try {
      const { password, ...rest } = parsed.data;
      if( isEdit && model ) {
        await empleadosService.update(model.id, rest);
      } else {
        await empleadosService.create({password: '', ...rest});
      }
    } catch (error: any) {
      setError(error?.message || 'Error al guardar');
    } finally {
      setSaving(false);
    }
  }


  return (
    <div>
      <form onSubmit={onSubmit} className="space-y-4">
        <h3>{ isEdit ? 'Editar' : 'Crear' } empleado</h3>
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

        { error ? <div className="alert alert-error">{ error }</div> : <></> }

        <div className="flex justify-end-gap gap-2 pt-2">
          <button type="button" className="btn" onClick={ onClose }>Cancelar</button>
          <Button type="submit" loading={saving} className="w-full text-orange-600 font-semibold">{ isEdit ? 'Actualizar' : 'Crear' } usuario</Button>
        </div>

      </form>
      {/* <div className="mt-3 text-sm text-white">
         Registar Usuario &nbsp;
      </div> */}
    </div>
  )
}