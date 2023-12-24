import { ObjectHTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface NavbarDropdownRootProps
  extends ObjectHTMLAttributes<HTMLObjectElement> {
  children: ReactNode
}

export const NavbarDropdownRoot = ({
  children,
  ...rest
}: NavbarDropdownRootProps) => {
  return (
    <div
      {...rest}
      className={twMerge(
        'absolute right-0 top-0 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5',
        rest.className,
      )}
    >
      <div className="divide-y-2 divide-zinc-100 p-4">{children}</div>
    </div>
  )
}
