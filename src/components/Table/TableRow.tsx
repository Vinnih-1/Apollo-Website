interface TableRowProps {
  text?: string
  texts?: string[]
  persist?: boolean
}

export const TableRow = ({ text, texts, persist = false }: TableRowProps) => {
  return (
    <td className="py-4 text-sm text-zinc-400">
      <span className={persist ? 'ml-2' : 'ml-2 hidden md:block'}>
        {text || texts}
      </span>
    </td>
  )
}
