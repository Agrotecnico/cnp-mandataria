import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import type { Metadata } from "next"
import { ToastContainer, toast } from "react-toastify";
import { Providers } from "@/app/providers";

export const metadata: Metadata = {
  title: 'CNPmandataria',
  description:
    "Servicios de asesoramiento y gestión en la compra/venta de vehículos automotor y náutico, transferencia de dominio, cédula de identificación y otros trámites de registros de la propiedad automotor. Podés realizar consultas o iniciar trámites",
  // icons: {icon:"favicon.ico"} ,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full overflow-x-hidden antialiased bg-[#548eff16] text-[#020b1ddd]`}>
        <Providers>
          {children}
        </Providers>
        {/* <ToastContainer /> */}
      </body>
    </html>
  );
}
