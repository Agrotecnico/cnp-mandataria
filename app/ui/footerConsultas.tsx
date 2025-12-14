import CustomLink from "@/app/ui/custom-link"


export default async function FooterConsultas() {

  return (
    <footer className="bg-[#548eff22] [box-shadow:_inset_0_2px_#ffffff,inset_0_-1px_#0000002e] w-[100vw] py-3.5 text-[13px] sm:text-sm">
      <div className="flex w-full items-end justify-center gap-4 max-w-[1280px] mx-auto min-[400px]:gap-8 md:gap-12 xl:gap-20">
          <div className="flex flex-col items-center mb-[1px] w-20 md:flex-row md:w-32 md:gap-4 ">
            <CustomLink href="/" className="flex [text-shadow:1px_1px_0_#ffffff] duration-150 underline decoration-[#020b1d55] underline-offset-2 hover:decoration-[#020b1d] ">
              CNP
            </CustomLink>

            <CustomLink href="/iniciar-tramite/cambio-de-radicacion" className="flex [text-shadow:1px_1px_0_#ffffff] duration-150 underline decoration-[#020b1d55] underline-offset-2 hover:decoration-[#020b1d] ">
              Presupuesto
            </CustomLink>
          </div>

          <div className="flex flex-col items-center leading-[1.1rem] text-[#39507f]  max-w-[1100px] ">
            <div className="flex items-center">
              <span className="font-semibold">C</span><div className="opacity-80 mr-1 flex h-full items-center">arina</div>
              <span className="font-semibold">N</span><div className="opacity-80 mr-1 flex h-full items-center">oemí</div>
              <span className="font-semibold">P</span><div className="opacity-80 mr-1 flex h-full items-center">acheco</div>
            </div>
            <div className=" ">cnp.mandataria@gmail.com</div>
          </div>

          <div className="flex flex-col-reverse items-center mb-[1px] w-20 md:flex-row md:w-32 md:gap-4">
            <CustomLink href="/realizar-consulta" className="flex [text-shadow:1px_1px_0_#ffffff] duration-150 underline decoration-[#020b1d55] underline-offset-2 hover:decoration-[#020b1d] ">
              Consulta
            </CustomLink>

            <CustomLink href="/faq/compra-venta-vehiculo" className="flex [text-shadow:1px_1px_0_#ffffff] duration-150 underline decoration-[#020b1d55] underline-offset-2 hover:decoration-[#020b1d] ">
              FAQ
            </CustomLink>
          </div>
      </div>
    </footer>
  )
}
