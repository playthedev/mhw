import Image from "next/image"

export default function Logo({ className = "h-10 w-auto", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <>
      <Image src="/images/logo.png" alt="MHW Consultancy" width={225} height={109} className={`logo-light ${className}`} priority={priority} />
      <Image src="/images/logo-dark.png" alt="MHW Consultancy" width={225} height={109} className={`logo-dark ${className}`} priority={priority} />
    </>
  )
}
