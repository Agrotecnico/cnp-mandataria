'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import Dropdown from '@/app/ui/Dropdown';
import type { Post } from "@/app/lib/definitions"
import { ButtonA } from '@/app/ui/button';
import IconPresupuesto from '@/app/ui/logosIconos/icon-presupuesto';
import IconConsulta from '@/app/ui/logosIconos/icon-consulta';
import IconMenu from './logosIconos/icon-menu';
import IconWhatsApp from "@/app/ui/logosIconos/icon-whatsApp";


export default  function UserButtonMenuFaq({allPosts}:{allPosts:Post}) {

  const pathname = usePathname();

  return (
    <div 
      // className={`block  min-[1024px]:hidden`}
      className={`${pathname.startsWith('/faq') ? "block" : "hidden" }  min-[1024px]:hidden`}
      >
      <Dropdown>
        <Dropdown.Button>
          <div className="flex items-center gap-2  duration-200 opacity-75 hover:opacity-[0.9]">
            <IconMenu width='18px' className="fill-[#ffffffcc]"/>
            <p className="text-[13px] leading-[1.1] text-[#fff] font-medium ">
              FAQ
            </p>
          </div>
        </Dropdown.Button>

        <Dropdown.Menu >
          <div className="px-4 pt-8 pb-2 flex items-center flex-col space-y-1 mx-4 sm:pt-10 sm:pb-0 md:pt-8 md:pb-1">
            <p className="text-sm font-medium leading-none ">
              CONSULTAS FRECUENTES
            </p>
          </div>

          <div className=" w-screen p-3 pb-5 flex flex-col gap-[1px]">
            {allPosts.length ? (
              allPosts.map((post:Post) => (
                <Link
                  as={`/faq/${post.slug}`}
                  href="/faq/[slug]"
                  key={post.slug}
                  className={clsx(
                    'flex items-center justify-start pl-2 pr-4  text-sm text-[#020b1dcc] duration-200 rounded-lg hover:text-[#020b1d] hover:bg-[#39507f18]',
                    {
                      'bg-[#39507f19] text-[#020b1e]': pathname === `/faq/${post.slug}`,
                    },
                  )}
                >
                  <Dropdown.MenuItem>
                    <div className="flex items-start">
                      <div className="mt-3 mr-2 w-1.5 h-1.5 rounded-full text-transparent bg-[#39507f99]">o</div>
                      <p className="text-sm py-1.5 text-start ">
                        {post.excerpt}
                      </p>
                    </div>
                  </Dropdown.MenuItem>
                </Link>
              ))
            ) : (
              <p>Aún no hay ningúna consulta publicada</p>
            )}
          </div>
          {/* <Link 
            href={"https://api.whatsapp.com/send?phone=543476606595"}
            target="_blank"  
            className="py-1 px-3 mb-3 mx-3 w-max bg-[#020b1d07] duration-150 opacity-80 rounded-lg flex items-center gap-6 text-sm shadow-[inset_0_0_4px_#020b1d5a] hover:opacity-100 hover:bg-[#020b1d11] active:opacity-80 sm:text-[15px]">
            <div className="flex flex-col">
              <div className="h-6 flex items-center justify-start sm:h-[26px]">
                <IconPresupuesto 
                  className="mr-2 w-[15px] h-[15px] sm:w-[16px] sm:h-[16px]"
                  color="#ffffffdd" color2="#020b1d"
                  />
                <p>Pedí presupuesto</p>
              </div>
              <div className="h-6 flex items-center justify-start sm:h-[26px]">
                <IconConsulta 
                  className="mr-2 w-[15px] h-[15px] sm:w-[16px] sm:h-[16px]"
                  color="#ffffffdd" color2="#020b1d"
                  />
                <p>Realizá tu consulta</p>
              </div>
            </div>
            <div className="bg-[#57c061] rounded-lg flex justify-center items-center" >
              <IconWhatsApp size="32" colorFondo="#0000"  className=" " />
            </div>
          </Link> */}
          
          {/* <div className="flex flex-col gap-[1px] text-[14px] mx-3 mb-3" >
            <Link href="/iniciar-tramite/baja-de-vehiculo" >
              <ButtonA className="relative pl-8 h-6 w-full !rounded-none !rounded-t-[4px] !justify-start">
                <IconPresupuesto className="absolute w-[15px] h-[15px] bottom-[3px] left-[9px] "/>
                <p className="">Pedir presupuesto</p>
              </ButtonA>
            </Link>

            <Link href="/realizar-consulta" >
              <ButtonA className=" !bg-[#b2439a] relative pl-8 h-6 w-full !rounded-none !rounded-b-[4px] !justify-start">
                <IconConsulta className="absolute w-[15px] h-[15px] bottom-[3px] left-[9px] "/>
                <p className="">Realizar consulta</p>
              </ButtonA>
            </Link>
          </div> */}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
