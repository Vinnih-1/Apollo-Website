import Link from 'next/link'

interface NavbarLinkProps {
  text: string
  url: string
}

export const NavbarLink = ({ text, url }: NavbarLinkProps) => {
  return (
    <Link href={url} className="text-sm text-zinc-400 w-0 lg:w-full">
      {text}
    </Link>
  )
}
