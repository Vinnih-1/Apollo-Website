'use client'

import icon from '@/assets/apollo-icons/apollo-isologo.svg'
import discordIcon from '@/assets/component-icons/discord-icon.svg'
import discordSmallIcon from '@/assets/component-icons/discordsmall-icon.svg'
import mercadoPagoIcon from '@/assets/component-icons/mercadopago-icon.svg'
import planIcon from '@/assets/component-icons/professionalplan-icon.svg'
import termsSmallIcon from '@/assets/component-icons/terms-icon.svg'
import trialIcon from '@/assets/component-icons/trialplan-icon.svg'
import circleIcon from '@/assets/statistic-icons/circle-icon.svg'
import cloudIcon from '@/assets/statistic-icons/cloud-icon.svg'
import dataIcon from '@/assets/statistic-icons/data-icon.svg'
import statisticIcon from '@/assets/statistic-icons/statistic-icon.svg'
import supportIcon from '@/assets/statistic-icons/support-icon.svg'
import { Footer } from '@/components/Footer/Footer'
import { Loading } from '@/components/Loading/Loading'
import { Navbar } from '@/components/Navbar'
import { useAuth } from '@/hooks/useAuth'
import MenuIcon from '@mui/icons-material/Menu'
import PaidIcon from '@mui/icons-material/Paid'
import PersonIcon from '@mui/icons-material/Person'
import StorefrontIcon from '@mui/icons-material/Storefront'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home() {
  const validation = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!validation.loading) {
      setLoading(false)
    }
  }, [validation])

  if (loading) {
    return <Loading />
  }

  if (!validation.success) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <span className="text-sm text-zinc-400 font-light">
          Algo de errado não está certo...
        </span>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between bg-sky-700 w-full py-2 px-0 px-5 md:px-20">
        <a href="#" className="flex gap-4">
          <Image
            src={discordSmallIcon}
            width={17}
            height={17}
            alt="Icone do Discord"
          />
          <span className="text-xs text-white">Atendimento via Discord</span>
        </a>
        <a href="#" className="flex gap-4">
          <Image
            src={termsSmallIcon}
            width={17}
            height={17}
            alt="Icone dos termos"
          />
          <span className="text-xs text-white">Termos e Políticas</span>
        </a>
      </div>
      <Navbar.Root icon={icon}>
        <Navbar.Links>
          <Navbar.Link text="Início" url="/" />
          <Navbar.Link text="Planos" url="/planos" />
          <Navbar.Link text="Parceiros" url="/parceiros" />
          <Navbar.Link text="Suporte" url="/suporte" />
        </Navbar.Links>
        <Navbar.Actions>
          {validation.isValid ? (
            <span className="text-sm text-zinc-400 font-light">
              {validation.email}
            </span>
          ) : (
            <Navbar.Link text="Registrar" url="/register" />
          )}
          <Navbar.Button
            text={validation.isValid ? 'Dashboard' : 'Minha conta'}
            onClick={() => {
              if (validation.isValid) {
                router.push('/dashboard')
              } else {
                router.push('/login')
              }
            }}
          />
          <Navbar.Toggler icon={MenuIcon} id="openDropdown" />
        </Navbar.Actions>
      </Navbar.Root>
      <div>
        <div className="flex justify-center h-80 bg-gradient-to-b from-sky-700 to-sky-950 w-full px-4 md:px-28 md:justify-between">
          <div className="flex flex-col max-w-md self-center gap-5 items-center text-center md:items-start md:text-start">
            <h1 className="text-white font-bold text-xl md:text-3xl">
              Automatização de Pagamentos pelo Discord utilizando Mercado Pago.
            </h1>
            <p className="text-zinc-400 text-xs md:text-sm">
              Crie quantos produtos quiser, com o preço que você desejar, e com
              os cupons que você quiser com poucos cliques! Tenha acesso ao
              painel onde poderá gerenciar seu Serviço.
            </p>
            <button className="py-4 md:py-2 bg-blue-600 rounded w-40 text-white text-xs mt-5 md:mt-0">
              Contratar Plano
            </button>
          </div>
          <div className="flex items-center justify-center  gap-10 invisible w-0 invisible lg:w-auto md:visible">
            <Image
              src={discordIcon}
              width={127}
              height={127}
              alt="Icone do Discord"
            />
            <Image
              src={mercadoPagoIcon}
              width={127}
              height={127}
              alt="Icone do Mercado Pago"
            />
          </div>
        </div>
      </div>
      <div className="flex gap-16 md:justify-center md:gap-20 bg-white overflow-x-auto h-20 md:mx-10">
        <div className="flex items-center gap-4">
          <Image
            src={supportIcon}
            width={50}
            height={50}
            alt="Icone de Suporte"
          />
          <span className="text-zinc-400 font-bold text-xs w-24">
            Suporte Personalizado
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Image src={dataIcon} width={50} height={50} alt="Icone de Dados" />
          <span className="text-zinc-400 font-bold text-xs w-24">
            Proteção de Dados
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Image
            src={statisticIcon}
            width={50}
            height={50}
            alt="Icone de Estatisticas"
          />
          <span className="text-zinc-400 font-bold text-xs w-24">
            Acesse Estatísticas
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Image src={cloudIcon} width={50} height={50} alt="Icone de Nuvem" />
          <span className="text-zinc-400 font-bold text-xs w-24">
            Qualidade & Performance
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Image
            src={circleIcon}
            width={50}
            height={50}
            alt="Icone de Circulo"
          />
          <span className="text-zinc-400 font-bold text-xs w-24">
            Sistemas Inteligentes
          </span>
        </div>
      </div>
      <div className="bg-bgFrosted">
        <div className="flex flex-col items-center gap-8 py-12">
          <div className="flex flex-col gap-4 text-center">
            <h1 className="text-xl font-bold text-blue-600 max-w-sm">
              Confira o nosso plano ideal para impulsionar as vendas do seu
              projeto
            </h1>
            <p className="text-xs text-zinc-500 font-light max-w-sm">
              Promova hoje seu projeto com uma qualidade de vendas sem precisar
              se preocupar com os pagamentos.
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:justify-center items-center overflow-hidden gap-8 py-8">
            {/* Card */}
            <div className="flex flex-col items-center bg-zinc-100 w-72 h-96 rounded-xl shadow-xl">
              <div className="py-5">
                {/* Header Card */}
                <div className="flex flex-col items-center mt-4">
                  <Image
                    src={trialIcon}
                    width={60}
                    height={60}
                    alt="Icone do plano de testes"
                  />
                  <h1 className="font-bold text-sm text-black mt-2">
                    Fazer uma Amostra Grátis
                  </h1>
                </div>

                {/* Body Card */}
                <div className="mt-4">
                  <div className="text-center">
                    <span className="text-xs font-normal text-zinc-500 block">
                      Planos a partir de
                    </span>
                    <span className="inline-block text-lg font-bold text-zinc-400">
                      R$ 00,00
                    </span>
                    <span className="inline text-xs font-bold">/mensal</span>
                    <p className="text-sm font-light text-zinc-400 mx-4 mt-4">
                      Para garantir ao usuário que este é um bom negócio, nós
                      damos um plano gratuito para o mesmo poder testar nossas
                      funcionalidades.
                    </p>
                    <button className="py-4 md:py-2 bg-zinc-400 rounded w-40 text-white text-xs mt-5 md:mt-8">
                      Contratar Amostra Grátis
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Card */}
            <div className="flex flex-col items-center bg-zinc-100 w-72 h-96 rounded-xl shadow-xl">
              <div className="py-5">
                {/* Header Card */}
                <div className="flex flex-col items-center mt-4">
                  <Image
                    src={planIcon}
                    width={60}
                    height={60}
                    alt="Icone do plano profissional"
                  />
                  <h1 className="font-bold text-sm text-black mt-2">
                    Plano de Serviço Profissional
                  </h1>
                </div>

                {/* Body Card */}
                <div className="mt-4">
                  <div className="text-center">
                    <span className="text-xs font-normal text-zinc-500 block">
                      Planos a partir de
                    </span>
                    <span className="inline-block text-lg font-bold text-blue-600">
                      R$ 29,99
                    </span>
                    <span className="inline text-xs font-bold">/mensal</span>
                    <p className="text-sm font-light text-zinc-400 mx-4 mt-4">
                      Obtenha o processo de automatização na hora de vender seus
                      produtos sem precisar se preocupar em verificar se algo
                      foi pago ou não.
                    </p>
                    <button
                      className="py-4 md:py-2 bg-blue-600 rounded w-40 text-white text-xs mt-5 md:mt-8"
                      onClick={() => {
                        router.push('/purchase/professional')
                      }}
                    >
                      Contratar este plano
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center py-12">
        <div className="text-center max-w-sm pb-12">
          <h1 className="font-bold text-lg text-blue-600">
            Estatísticas dos nossos Serviços
          </h1>
          <p className="font-light text-sm text-zinc-400">
            Veja algumas estatísticas de vendas utilizando nossos serviços.
          </p>
        </div>
        <div className="flex overflow-x-auto w-full md:w-auto gap-16 text-center">
          <div className="flex flex-col items-center gap-2 mx-4 md:mx-0">
            <PersonIcon className="font-bold text-blue-600 text-3xl" />
            <span className="text-zinc-600 font-bold">
              USUÁRIOS CADASTRADOS
            </span>
            <span className="text-blue-600 font-bold">194</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <StorefrontIcon className="font-bold text-blue-600 text-3xl" />
            <span className="text-zinc-600 font-bold">VENDAS EFETUADAS</span>
            <span className="text-blue-600 font-bold">847</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <PaidIcon className="font-bold text-blue-600 text-3xl" />
            <span className="text-zinc-600 font-bold">TOTAL MOVIMENTADO</span>
            <span className="text-blue-600 font-bold">R$ 13.843,22</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center ">
        <h1 className="text-blue-600 font-bold text-lg pb-10">
          Perguntas Frequentes
        </h1>
        <div className="flex flex-col gap-8">
          {/* FAQ - 1 */}
          <div>
            <div className="flex flex-col bg-zinc-300 divide-y divide-zinc-500 rounded-md">
              <span className="text-zinc-500 font-bold text-md px-8 py-2">
                Qual é o tempo de ativação do serviço?
              </span>
              <span className="text-zinc-400 font-light text-sm px-8 py-4">
                Após a efetuação do pagamento, o seu serviço é criado
                instantâneamente e já pode ser usado.
              </span>
            </div>
          </div>
          {/* FAQ - 2 */}
          <div>
            <div className="flex flex-col bg-zinc-300 divide-y divide-zinc-500 rounded-md">
              <span className="text-zinc-500 font-bold text-md px-8 py-2">
                Qual é o tempo de ativação do serviço?
              </span>
              <span className="text-zinc-400 font-light text-sm px-8 py-4">
                Após a efetuação do pagamento, o seu serviço é criado
                instantâneamente e já pode ser usado.
              </span>
            </div>
          </div>
          {/* FAQ - 3 */}
          <div>
            <div className="flex flex-col bg-zinc-300 divide-y divide-zinc-500 rounded-md">
              <span className="text-zinc-500 font-bold text-md px-8 py-2">
                Qual é o tempo de ativação do serviço?
              </span>
              <span className="text-zinc-400 font-light text-sm px-8 py-4">
                Após a efetuação do pagamento, o seu serviço é criado
                instantâneamente e já pode ser usado.
              </span>
            </div>
          </div>
          {/* FAQ - 4 */}
          <div>
            <div className="flex flex-col bg-zinc-300 divide-y divide-zinc-500 rounded-md">
              <span className="text-zinc-500 font-bold text-md px-8 py-2">
                Qual é o tempo de ativação do serviço?
              </span>
              <span className="text-zinc-400 font-light text-sm px-8 py-4">
                Após a efetuação do pagamento, o seu serviço é criado
                instantâneamente e já pode ser usado.
              </span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
