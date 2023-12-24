import Link from 'next/link'

interface NavbarDropdownItemProps {
  title: string
  description: string
  url: string
}

export const NavbarDropdownItem = ({
  title,
  description,
  url,
}: NavbarDropdownItemProps) => {
  return (
    <div className="flex-auto">
      <Link href={url} className="block font-semibold text-gray-900">
        {title}
        <span className="absolute inset-0"></span>
      </Link>
      <p className="mt-1 text-gray-600">{description}</p>
    </div>
  )
}
