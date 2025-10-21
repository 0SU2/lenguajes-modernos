import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
}

export default function Input({ label, error, className = '', ...rest }: Props)  {
  return (
    <label className="form-contronl w-full">
      {label &&
        <div className="label">
          <span className="label-text">
            {label}
          </span>
        </div>
      }
      <input className={`input input-bordered w-full ${className}`} { ...rest }/>
      { error &&
        <div className="label">
          <span className="label-text-alt text-error">{error}</span>
        </div>
      }
    </label>
  )
}