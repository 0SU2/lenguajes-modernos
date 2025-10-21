import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }

export default function Button({ children, loading, className = '', ...rest}: Props) {
  return (
    <button className={`bnt bnt-primary ${className} disabled=${loading || rest.disabled }`} { ...rest }>
      { loading && <span className="loading loading-spinner"/>}
      { children }
    </button>
  )
}