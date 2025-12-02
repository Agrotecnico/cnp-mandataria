import CustomLink from "@/app/ui/custom-link"


export default async function FooterConsultas() {

  return (
    <footer className="bg-[#d9e1f0] [box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#00000000] w-[100vw] pt-2 pb-1.5 border text-[13px] sm:text-sm">
      <div className="flex w-full h-full flex-col gap-3 max-w-[1280px] mx-auto sm:gap-2">
        <div className="flex gap-16 justify-center items-center sm:-mb-6 sm:gap-72 ">
          <div className="flex items-center justify-end gap-5 w-36 ">
            <CustomLink href="/" className="flex [text-shadow:1px_1px_0_#ffffff] duration-150 underline decoration-[#020b1d55] underline-offset-2 hover:decoration-[#020b1d] ">
              CNP
            </CustomLink>

            <CustomLink href="/iniciar-tramite/cambio-de-radicacion" className="flex [text-shadow:1px_1px_0_#ffffff] duration-150 underline decoration-[#020b1d55] underline-offset-2 hover:decoration-[#020b1d] ">
              Presupuesto
            </CustomLink>
          </div>

          <div className="flex items-center justify-start gap-5 w-36 ">
            <CustomLink href="/realizar-consulta" className="flex [text-shadow:1px_1px_0_#ffffff] duration-150 underline decoration-[#020b1d55] underline-offset-2 hover:decoration-[#020b1d] ">
              Consulta
            </CustomLink>

            <CustomLink href="/faq/compra-venta-vehiculo" className="flex [text-shadow:1px_1px_0_#ffffff] duration-150 underline decoration-[#020b1d55] underline-offset-2 hover:decoration-[#020b1d] ">
              FAQ
            </CustomLink>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center mb-2 leading-[1.1rem] text-[#39507f]  max-w-[1100px] mx-auto">
          <div className="flex items-center">
            <span className="font-semibold">C</span><div className="opacity-80 mr-1 flex h-full items-center">arina</div>
            <span className="font-semibold">N</span><div className="opacity-80 mr-1 flex h-full items-center">oemí</div>
            <span className="font-semibold">P</span><div className="opacity-80 mr-1 flex h-full items-center">acheco</div>
          </div>
          <div className=" ">cnp.mandataria@gmail.com</div>
        </div>
      </div>
    </footer>
  )
}
