import '@/app/globals.css'
import icon from '@/assets/apollo-icons/apollo-isologo.svg'
import discordSmallIcon from '@/assets/component-icons/discordsmall-icon.svg'
import planIcon from '@/assets/component-icons/professionalplan-icon.svg'
import qrcodeIcon from '@/assets/component-icons/qrcode-icon.svg'
import termsSmallIcon from '@/assets/component-icons/terms-icon.svg'
import { Navbar } from '@/components/Navbar'
import { useAuth } from '@/hooks/useAuth'
import { Purchase, PurchaseProps } from '@/hooks/usePurchase'
import MenuIcon from '@mui/icons-material/Menu'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { clearInterval } from 'timers'

const Professional = () => {
  const validation = useAuth()
  const router = useRouter()
  const [purchase, setPurchase] = useState<PurchaseProps>()
  const [expirate, setExpirate] = useState<number>(0)

  useEffect(() => {
    if (purchase) {
      const intervalId = setInterval(() => {
        const expirate = new Date(purchase.expirateAt)
        const create = new Date()
        const differenceInMinutes = Math.ceil(
          (expirate.getTime() - create.getTime()) / (1000 * 60),
        )
        setExpirate(differenceInMinutes)
        if (differenceInMinutes <= 0) {
          clearInterval(intervalId)
        }
      }, 1000)
    }
  }, [purchase])

  useEffect(() => {
    console.log(expirate)
  }, [expirate])

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
      <div className="w-full mt-8">
        <div className="flex mb-8">
          <span className="mx-auto text-lg text-zinc-400 text-center">
            Este QRCode expira em:{' '}
            <span className="font-bold text-lg text-red-600">
              00:{expirate.toString().padStart(2, '0')}
            </span>{' '}
            minutos
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-32">
          <div className="flex flex-col gap-12 bg-zinc-100 rounded-xl shadow-xl h-96">
            <Image
              src={
                purchase !== undefined
                  ? 'data:image/png;base64, ' + purchase?.qrcodeBase64
                  : qrcodeIcon
              }
              alt="Imagem do QRCode"
              width={10}
              height={10}
              className="max-w-[250px] max-h-[250px] mt-4 border border-blue-600 shadow-xl rounded-xl"
            />
            <div className="mx-auto">
              <button
                className="py-2 px-4 bg-blue-600 hover:bg-blue-400 duration-300 text-zinc-200 text-sm rounded-lg"
                onClick={() => {
                  Purchase(validation.token)
                    .then((success) => {
                      const purchase: PurchaseProps = success.data
                      setPurchase(purchase)
                    })
                    .catch(() => {
                      console.log('error')
                    })
                }}
              >
                Gerar pagamento
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col items-center bg-zinc-100 w-64 h-96 rounded-xl shadow-xl">
              <div className="py-5">
                {/* Header Card */}
                <div className="flex flex-col items-center mt-4">
                  <Image
                    src={planIcon}
                    width={60}
                    height={60}
                    alt="Icone do plano profissional"
                    className="w-32"
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Professional
