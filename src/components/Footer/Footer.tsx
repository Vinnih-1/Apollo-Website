import apolloIcon from '@/assets/apollo-icons/apollo-isologo.svg'

import Image from 'next/image'

export const Footer = () => {
  return (
    <div className="bg-bgFrosted mt-8 divide-y divide-zinc-400">
      <div className="flex flex-col items-center md:justify-start md:flex-row md:justify-between md:mx-20 my-6">
        <div className="flex flex-col items-center md:items-start text-center md:text-start">
          <Image
            src={apolloIcon}
            width={275}
            height={112}
            alt="Isologo da Apollo"
          />
          <p className="text-zinc-500 font-light text-md md:w-96">
            A empresa tem a intenção de prover o serviço de hospedagem de
            servidores, inicialmente de Minecraft e, posteriormente de vários
            outros tipos de jogos, como FiveM, MTA, Minecraft Bedrock, etc...
            Qualidades e proteções contra qualquer tipo de ataques em nossos
            servidores.
          </p>
        </div>
        <div className="mt-10 md:mt-0">
          <h1 className="text-zinc-400 font-bold text-lg">Suporte</h1>
          <ul className="text-zinc-400 font-light text-sm mt-2">
            <li>Área do cliente</li>
            <li>Email</li>
            <li>Discord</li>
            <li>Termos e serviços</li>
          </ul>
        </div>
      </div>
      <div className="text-zinc-400 font-light text-xs block text-center md:flex md:justify-between pb-6">
        <span className="block mt-6 md:mx-20">
          Apollo Services Ltda. Copyright © 2023 - 2023
        </span>
        <span className="block mt-6 md:mx-20">Termos & políticas</span>
      </div>
    </div>
  )
}
