export default function FormError( { message }: { message?: string }) {
  if (!message) {
    message = 'Error'
  }
  return <div className="alert alert-error text-sm"> { message } </div>
}