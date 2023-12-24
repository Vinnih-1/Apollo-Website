import { ReactNode } from 'react'

interface NavbarRootProps {
  icon: React.ImgHTMLAttributes<HTMLImageElement>
  children: ReactNode
}

export const NavbarRoot = ({ icon, children }: NavbarRootProps) => {
  return (
    <div className="bg-zinc-100 sticky top-0 opacity-90">
      <div className="flex">
        <a href="/" className="grow my-auto pl-9">
          <img
            src={icon.src}
            alt={icon.alt}
            className="apolloIcon lg:w-96 md:w-72 sm:w-56 justify-center min-h-[74px]"
          />
        </a>
        {children}
      </div>
    </div>
  )
}
