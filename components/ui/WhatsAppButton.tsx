const WHATSAPP_NUMBER = "917065127127"
const WHATSAPP_MESSAGE =
  "Hi MHW Consultancy! I'd like to know more about your services."

export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/30 ring-4 ring-[#25D366]/15 transition-all duration-200 hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/40 animate-float"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
      <svg
        viewBox="0 0 32 32"
        className="relative h-8 w-8 fill-white transition-transform duration-200 group-hover:scale-110"
        aria-hidden="true"
      >
        <path d="M16.004 0C7.166 0 0 7.166 0 16.004c0 2.82.738 5.566 2.14 7.99L0 32l8.2-2.108a15.94 15.94 0 0 0 7.804 1.987h.006c8.838 0 16.004-7.166 16.004-16.004C32.014 7.045 24.848 0 16.004 0zm0 29.27a13.24 13.24 0 0 1-6.747-1.847l-.484-.288-4.866 1.252 1.3-4.744-.315-.487a13.21 13.21 0 0 1-2.024-7.152c0-7.305 5.946-13.25 13.252-13.25 7.305 0 13.25 5.945 13.25 13.25 0 7.305-5.945 13.266-13.366 13.266zm7.27-9.93c-.397-.199-2.347-1.158-2.711-1.29-.364-.133-.629-.199-.893.199-.265.397-1.026 1.29-1.258 1.555-.232.265-.463.298-.86.1-.397-.2-1.677-.618-3.195-1.971-1.181-1.053-1.978-2.353-2.21-2.75-.232-.397-.025-.612.174-.81.179-.178.397-.463.596-.695.199-.232.265-.397.397-.662.133-.265.066-.497-.033-.695-.1-.199-.893-2.151-1.224-2.948-.322-.776-.65-.671-.893-.683-.232-.011-.497-.013-.762-.013s-.695.099-1.059.497c-.364.397-1.39 1.358-1.39 3.31 0 1.951 1.423 3.838 1.622 4.103.199.265 2.804 4.28 6.793 6.003.949.41 1.69.655 2.267.838.953.303 1.82.26 2.505.158.764-.114 2.347-.96 2.678-1.886.331-.927.331-1.72.232-1.886-.099-.166-.364-.265-.762-.464z"/>
      </svg>
    </a>
  )
}
