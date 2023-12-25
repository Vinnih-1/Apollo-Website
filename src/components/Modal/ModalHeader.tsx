interface ModalHeaderProps {
  title: string
}

export const ModalHeader = ({ title }: ModalHeaderProps) => {
  return (
    <div>
      <span className="text-lg text-blue-600 font-bold">{title}</span>
    </div>
  )
}
