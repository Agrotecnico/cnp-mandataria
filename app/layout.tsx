import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import type { Metadata } from "next"

export const metadata: Metadata = {
  description:
    "Aqui harás consultas relacionadas a gestiones/registros del automotor y obtendrás una respuesta",
  icons: {icon:"/faviconCnp.png"} ,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full  antialiased bg-[#39507f1b] text-[#020b1ddd]`}>
        {children}
      </body>
    </html>
  );
}
