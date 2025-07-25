'use client';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './styles.css';
import NavInicio from '@/app/ui/navInicio';
import FooterInicio from '@/app/ui/footerInicio';
import IconTiempo from '@/app/ui/logosIconos/icon-tiempo';
import IconConocimiento from '@/app/ui/logosIconos/icon-conocimiento';
import IconSeguridad from '@/app/ui/logosIconos/icon-seguridad';
import { agrotecnico, agrotecnico2, tramites1, tramites2, tramites3, } from '@/app/constant';
import Image from 'next/image'
import {
  Keyboard,
  Scrollbar,
  Navigation,
  Pagination,
  A11y,
  Mousewheel,
  Autoplay,
  EffectFade,
  Parallax,
} from 'swiper/modules';
import { Frente, Fondo } from '@/app/ui/marcos';
import { useSession } from "next-auth/react"
import { User } from '@/app/lib/definitions';
import  IconWhatsApp2  from "@/app/ui/logosIconos/icon-whatsApp2";
import { ChevronRightIcon, } from '@heroicons/react/24/outline';
import { ButtonA } from '@/app/ui/button';
import IconPresupuesto from './ui/logosIconos/icon-presupuesto';
import IconConsulta from './ui/logosIconos/icon-consulta';
import IconLink from './ui/logosIconos/icon-link';




export default function CNPMandataria({
  user,
  linkDatos,
}: {
  user: User | undefined 
  linkDatos: {
    slug: string;
    excerpt: string;
  }[];
}) {
  const { data: session, update } = useSession()
  
  return (
    <Swiper
      className="swiper1 relative"
      centeredSlides={true}
      modules={[
        Keyboard,
        Scrollbar,
        Navigation,
        Pagination,
        A11y,
        Mousewheel,
        Parallax,
      ]}
      pagination={{
        clickable: true,
        renderBullet: function (index, className) {
          return (
            '<span class="' +
            className +
            '">' +
            agrotecnico2[index] +
            '</span>'
          );
        },
      }}
      slidesPerView={1}
      spaceBetween={0}
      direction="vertical"
      mousewheel={true}
      speed={600}
      parallax={true}
      breakpoints={{
        640: {
          pagination: {
            clickable: true,
            renderBullet: function (index, className) {
              return (
                '<span class="' +
                className +
                '">' +
                agrotecnico[index] +
                '</span>'
              );
            },
          },
        },
      }}
    >
      <NavInicio  user={user}  />
      
      <div className= "group fixed z-20 flex justify-end bottom-12 right-[8px] rounded-xl bg-[linear-gradient(#fff0,_#fff0,_#fff)] shadow-[0_20px_25px_-5px_rgb(0_0_0_/_0.2),_0_8px_10px_-6px_rgb(0_0_0_/_0.2)] lg:max-w-5xl lg:mx-[calc((100vw_-_64rem)_/_2)] ">
        
        <Link 
          href= "https://api.whatsapp.com/send?phone=543476606595"
          // href= "https://wa.me/543476606595?text=CNPmandataria"  
          target="_blank"  
          className="flex flex-col items-center" 
        >
          {/* <p className="px-2 pb-0.5 leading-[0.5] text-[13px] rounded-b-xl opacity-80 group-hover:opacity-100">msj</p> */}
          <div className=" w-11 flex items-end justify-center">
            <IconWhatsApp2 className=" w-9 opacity-80 duration-150 sm:w-10 group-hover:opacity-100 " />
          </div>
          
        </Link>
      </div>

      {/* Inicio */}
      <SwiperSlide id="ini" className= "">
        <div className="flex flex-col items-center justify-center w-full h-[70vh] gap-[2%]">
          <div className="flex flex-col justify-center h-[37%] w-full sm:mb-6">
            <h1 className="font-bold text-3xl mx-auto mb-1.5 sm:mb-5 sm:mt-4">
              CNP mandataria
            </h1>
            <Frente className=" mx-2 !rounded-xl max-w-[700px] sm:mx-auto sm:w-full sm:rounded-lg">
              <p className="text-sm px-3 leading-snug py-2 text-center sm:px-4 sm:py-3 sm:text-[15px]">
              Un servicio con la facultad en representación legal, asesoramiento y gestión en la compra/venta de vehículos automotor y náutico. 
              Esto incluye la transferencia de dominio, cédula de identificación y otros trámites.
              </p>
          </Frente>
          </div>
          <Swiper
            className="swiper2 !h-[61%] "
            centeredSlides={true}
            grabCursor={false}
            modules={[
              Keyboard,
              Scrollbar,
              Navigation,
              Pagination,
              A11y,
              Mousewheel,
            ]}
            pagination={{
              clickable: true,
            }}
            slidesPerView={1.25}
            spaceBetween={10}
            speed={600}
            breakpoints={{
              425: {
                slidesPerView: 1.25,
                spaceBetween: 10,
                centeredSlides: true,
              },
              500: {
                slidesPerView: 1.5,
                spaceBetween: 10,
                centeredSlides: true,
              },
              768: {
                slidesPerView: 1.75,
                spaceBetween: 10,
                centeredSlides: true,
              },
              880: {
                slidesPerView: 2,
                spaceBetween: 10,
                centeredSlides: true,
                keyboard: true,
              },
              1024: {
                slidesPerView: 2.15,
                spaceBetween: 10,
                centeredSlides: false,
                keyboard: true,
                grabCursor: true,
              },
            }}
          >
            {/* Manos */}
            <SwiperSlide className="">
              <div
                className="absolute top-0 flex w-full h-full flex-col items-center justify-start rounded-xl text-4xl bg-cover bg-[linear-gradient(90deg,#0005,transparent_1.5%,transparent_98.5%,#0005),linear-gradient(180deg,#0005,transparent_1.5%,transparent_98.5%,#0005)]"
                >
                <Image
                  src='https://res.cloudinary.com/dchmrl6fc/image/upload/v1740689220/mano-b_dq8ctv.jpg'
                  alt="imagen estrechar la mano"
                  width={960}
                  height={720}
                  priority
                  // objectFit={"container"}
                  className="absolute -z-10 object-cover top-[0px] flex h-full w-full items-center justify-center rounded-[10px]"
                >
                </Image>

                <div className='absolute top-[5%] mx-4 flex items-center justify-center'>
                  <div className='flex flex-col'>
                    <h1 className="mb-2.5 text-xl min-[376px]:text-3xl">
                      {/* Hola! */} Bienvenido
                    </h1>
                    <div className="flex flex-col items-center text-sm min-[376px]:text-base sm:mx-10">
                      <p className="flex justify-center mb-1 w-full text-center">
                        Podés
                        <Link href={session ? '/dashboard/consultas' : '/realizar-consulta'}  className="flex px-1.5 rounded-md duration-200 underline decoration-[#1d021581] underline-offset-2 hover:decoration-[#1d0215] hover:underline-offset-[3px] hover:text-[#020b1d] ">
                          {session ? "ver las consultas" : "realizá una consulta" }
                          {/* <IconLink size="13px" className="ml-1"/> */}
                        </Link>
                      </p>
                      <div className="flex w-full text-center">
                        o
                        <Link href={session ? '/dashboard/tramites' : '/iniciar-tramite/cambio-de-radicacion'}  className="flex px-1.5 duration-200 underline decoration-[#1d021581] underline-offset-2 rounded-md hover:decoration-[#1d0215] hover:underline-offset-[3px] hover:text-[#020b1d] ">
                          {session ? "ver los trámites" : "pedí presupuesto"}
                          {/* <IconLink size="13px" className='ml-1'/> */}
                        </Link> 
                        <span className={`${user && "hidden" }`} >por tu trámite.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* Oficina */}
            <SwiperSlide className="">
              <div
                className="absolute top-0 flex w-full h-full flex-col items-center justify-start rounded-xl text-4xl bg-cover bg-[linear-gradient(90deg,#0005,transparent_1.5%,transparent_98.5%,#0005),linear-gradient(180deg,#0005,transparent_1.5%,transparent_98.5%,#0005)]"
              >
                <Image
                  src='https://res.cloudinary.com/dchmrl6fc/image/upload/v1740689272/carina-oficina_whue5m.jpg'
                  alt="Reempadronamiento"
                  width={960}
                  height={720}
                  // objectFit={"container"}
                  className="absolute -z-10 object-cover top-[0px] mb-2 flex h-full w-full items-center justify-center rounded-[10px]"
                >
                </Image>

                <Link 
                  href={"https://www.dnrpa.gov.ar/portal_dnrpa/mandatarios2.php?CONSULTAS2=true"} 
                  target='_blank'
                  className="w-full text-[#ffffffdd] decoration-[#ffffff77] underline underline-offset-2 duration-150 opacity-60 hover:opacity-80 hover:decoration-[#ffffffdd]">
                  <p className="flex justify-center items-center gap-2 w-full h-8 leading-5 rounded-t-xl border border-[#111] bg-[#000d] text-[12.5px] font-normal backdrop-blur-[1px] [font-variant-caps:_small-caps] [text-shadow:_1px_1px_black] sm:text-[14px]">
                    Mandataria Nacional{' '}
                    <span className="text-[11px] sm:text-xs">
                      CUIT{' '}&#160;<span className="text-[12.5px] sm:text-[13.5px]">27 30615135 0
                    </span></span><IconLink size="12px" color="#ffffff"/*#d400aa" */ color2="#ffffff" />
                  </p>
                </Link>
                <div className="text-[12.5px] text-[#ffffff99] absolute -bottom-2.5">Mat: <span className="text-[12px] ">M202427306151350 DN</span></div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div> 
      </SwiperSlide>

      {/* Trámites */}
      <SwiperSlide id="ev" className="">
        <div id="polo" className="flex flex-col items-center justify-center w-full h-[70vh] sm:gap-[2vh] sm:h-[76vh] sm:mt-12">
          <Swiper
            className="swiper2 !h-[85%] sm:!h-[70vh]"
            centeredSlides={true}
            grabCursor={false}
            modules={[
              Keyboard,
              Scrollbar,
              Navigation,
              Pagination,
              A11y,
              Mousewheel,
            ]}
            pagination={{
              clickable: true,
            }}
            slidesPerView={1}
            spaceBetween={0}
            speed={600}
            breakpoints={{
              320: {
                slidesPerView: 1.25,
                spaceBetween: 0,
                centeredSlides: true,
              },
              524: {
                slidesPerView: 1.5,
                spaceBetween: 0,
                centeredSlides: true,
              },
              768: {
                slidesPerView: 2.5,
                spaceBetween: 0,
                centeredSlides: true,
              },
              880: {
                slidesPerView: 2.75,
                spaceBetween: 0,
                centeredSlides: true,
                keyboard: true,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 0,
                centeredSlides: false,
                keyboard: true,
                grabCursor: true,
              },
            }}
          >
            {/* Trámites 1 */}
            <SwiperSlide className="">
              <Swiper
                speed={600}
                loop={true}
                className="text-[#1d0215] swiper3"
                spaceBetween={30}
                effect={'fade'}
                navigation={false}
                pagination={{
                  clickable: false,
                  renderBullet: function (index, className) {
                    return (
                      '<span class="' +
                      className +
                      '">' +
                      tramites1[index] +
                      '</span>'
                    );
                  },
                }}
                modules={[EffectFade, Navigation, Pagination, Autoplay]}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
              >
                <h2 className="text-lg absolute z-10 left-3 top-[23vh] text-[#ffffff96] [text-shadow:_1px_1px_0_#00000082] font-extrabold md:top-[25vh]">TRÁMITES</h2>
                <SwiperSlide>
                  <Image
                    src='/tramite1.jpg'
                    alt="Baja de vehículo"
                    width={960}
                    height={720}
                    className="absolute object-cover h-[28vh] top-[0px] flex w-full items-center justify-center rounded-tl-xl sm:h-[30vh]"
                  >
                  </Image>
                </SwiperSlide>

                <SwiperSlide>
                  <Image
                    src='/tramite2.jpg'
                    alt="Cambio de radicación y domicilio"
                    width={660}
                    height={490}
                    className="absolute object-cover h-[28vh] top-[0px] flex w-full items-center justify-center rounded-tl-xl sm:h-[30vh]"
                  ></Image>
                </SwiperSlide>

                <SwiperSlide>
                  <Image
                    src='/tramite3.png'
                    alt="Denuncia de venta"
                    width={660}
                    height={490}
                    className="absolute object-fill h-[28vh] top-[0px] flex w-full items-center justify-center rounded-tl-xl sm:h-[30vh]"
                  ></Image>
                </SwiperSlide>  
              </Swiper>
              <div className="flex flex-col justify-start absolute z-10 top-[70%] items-center sm:top-[55%] sm:mt-[2vh] sm:pt-[4vh]">
                <div className="mb-[5px] flex items-center w-full justify-center">
                  <IconConocimiento size="33" className="h-9 sm:h-10" />
                </div>
                <div className="px-4">
                  <h4 className="font-bold text-base m-0">Conocimiento Especializado</h4>
                  <p className="hidden mt-[1vh] mx-0 mb-0 font-normal text-sm text-center lg:block sm:text-[15px] sm:mt-[2vh] ">
                    Profesional matriculada  por la <dfn title="Dirección Nacional de Registros y Propiedad del Automotor" className="text-[#2e37e6] font-medium ">DNRPA</dfn>.
                    Capacitada para realizar los trámites de la manera más eficiente en los Registros Seccionales.
                  </p>
                </div>
              </div>
            </SwiperSlide>

            {/* Trámite 2 */}
            <SwiperSlide className="border-x-0.5 border-[#f1eef0]">
              <Swiper
                speed={600}
                loop={true}
                className="text-[#1d0215] swiper3"
                spaceBetween={30}
                effect={'fade'}
                navigation={false}
                pagination={{
                  clickable: false,
                  renderBullet: function (index, className) {
                    return (
                      '<span class="' +
                      className +
                      '">' +
                      tramites2[index] +
                      '</span>'
                    );
                  },
                }}
                modules={[EffectFade, Navigation, Pagination, Autoplay]}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
              >
                <h2 className="text-lg absolute z-10 left-3 top-[23vh] text-[#ffffff96] [text-shadow:_1px_1px_0_#00000082] font-extrabold md:top-[25vh]">TRÁMITES</h2>
                <SwiperSlide>
                  <Image
                    src='/tramite4.jpg'
                    alt="Duplicado de título o cédula"
                    width={960}
                    height={720}
                    className="absolute object-cover h-[28vh] top-[0px] flex w-full items-center justify-center sm:h-[30vh]"
                  >{/*  border-x-1 border-white */}
                  </Image>

                </SwiperSlide>

                <SwiperSlide>
                  <Image
                    src='/tramite5.jpg'
                    alt="Informe de Estado de Dominio"
                    width={653}
                    height={490}
                    className="absolute object-cover h-[28vh] top-[0px] flex w-full items-center justify-center sm:h-[30vh]"
                  ></Image>
                    
                </SwiperSlide>

                <SwiperSlide>
                  <Image
                    src='/tramite6.png'
                    alt="Inscripción inicial"
                    width={653}
                    height={490}
                    className="absolute object-cover h-[28vh] top-[0px] flex w-full items-center justify-cente sm:h-[30vh]"
                  ></Image>
                    
                </SwiperSlide>  

              </Swiper>
              <div className="flex flex-col justify-start absolute z-10 top-[70%] items-center sm:top-[55%] sm:mt-[2vh] sm:pt-[4vh]">
                <div className="mb-[5px] flex items-center w-full justify-center">
                  <IconTiempo  className="h-9 sm:h-10"/>
                </div>
                <div className="px-2">
                  <h4 className="font-bold text-base m-0">Ahorra Tiempo y Esfuerzo</h4>
                  <p className="hidden mt-[1vh] mx-0 mb-0 font-normal text-sm text-center sm:text-[15px] sm:mt-[2vh] lg:block">
                  Si no estás familiarizado con los procedimientos o si no tenés tiempo para gestionarlos tú mismo, 
                  nos encargaremos de los detalles para cursar el trámite.
                  </p>
                </div>
              </div>
            </SwiperSlide>

            {/* Trámites 3 */}
            <SwiperSlide className="">
              <Swiper
                speed={600}
                loop={true}
                className="text-[#1d0215] swiper3"
                spaceBetween={30}
                effect={'fade'}
                navigation={false}
                pagination={{
                  clickable: false,
                  renderBullet: function (index, className) {
                    return (
                      '<span class="' +
                      className +
                      '">' +
                      tramites3[index] +
                      '</span>'
                    );
                  },
                }}
                modules={[EffectFade, Navigation, Pagination, Autoplay]}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
              >
                <h2 className="text-lg absolute z-10 left-3 top-[23vh] text-[#ffffff96] [text-shadow:_1px_1px_0_#00000082] font-extrabold md:top-[25vh]">TRÁMITES</h2>
                <SwiperSlide>
                  <Image
                    src='/tramite7.jpg'
                    alt="Reempadronamiento"
                    width={960}
                    height={720}
                    className="absolute object-cover h-[28vh] top-[0px] flex w-full items-center justify-center rounded-tr-xl sm:h-[30vh]"
                  >
                  </Image>

                </SwiperSlide>

                <SwiperSlide>
                  <Image
                    src='/tramite8.jpg'
                    alt="Renovación de Cédula"
                    width={660}
                    height={490}
                    className="absolute object-cover h-[28vh] top-[0px] flex w-full items-center justify-center rounded-tr-xl sm:h-[30vh]"
                  ></Image>
                </SwiperSlide>

                <SwiperSlide>
                  <Image
                    src='/tramite9.jpg'
                    alt="Transferencia de dominio"
                    width={660}
                    height={490}
                    className="absolute object-cover h-[28vh] top-[0px] flex w-full items-center justify-center rounded-tr-xl sm:h-[30vh]"
                  ></Image>
                </SwiperSlide>      
              </Swiper>
              <div className="flex flex-col justify-start absolute z-10 top-[70%] items-center sm:top-[55%] sm:mt-[2vh] sm:pt-[4vh]">
                <div className="mb-[5px] flex items-center w-full justify-center">
                  <IconSeguridad size="33"  className="h-9 sm:h-10"/>
                </div>
                <div className="px-4">
                  <h4 className="font-bold text-base m-0">Seguridad y Legalidad</h4>
                  <p className="hidden mt-[1vh] mx-0 mb-0 font-normal text-sm text-center sm:text-[15px] sm:mt-[2vh] lg:block">
                  Debidamente habilitada y registrada, se garantiza que todos los trámites se realizán de manera legal y segura, evitando posibles problemas a futuro.
                  </p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>

          <div className="flex flex-col gap-0.5 text-sm rounded-lg shadow-[0_10px_20px_#020b1d33] sm:text-[15px] sm:flex-row">
            <Link 
              href={"/iniciar-tramite/cambio-de-radicacion"} 
              className="group h-7 flex items-center rounded-t-lg px-3 bg-[#ffffffaa] duration-150 justify-start sm:rounded-tr-none sm:rounded-l-lg sm:h-8 hover:bg-white active:opacity-80">
              <IconPresupuesto 
                className="mr-2 w-[15px] h-[15px] duration-150 opacity-70 group-hover:opacity-100 sm:w-[16px] sm:h-[16px]"
                color="#ffffffdd" color2="#020b1d"
                />
              <p className="text-[#020b1dcc] duration-150 group-hover:text-[#020b1d]">Pedí presupuesto</p>
            </Link>
            <Link 
              href={"/realizar-consulta"} 
              className="group h-7 flex items-center rounded-b-lg px-3 bg-[#ffffffaa] duration-150 justify-start sm:rounded-bl-none sm:rounded-r-lg sm:h-8 hover:bg-white active:opacity-80">
              <IconConsulta 
                className="mr-2 w-[15px] h-[15px] duration-150 opacity-70 group-hover:opacity-100 sm:w-[16px] sm:h-[16px]"
                color="#ffffffdd" color2="#020b1d"
                />
              <p className="text-[#020b1dcc] duration-150 group-hover:text-[#020b1d]">Realizá tu consulta</p>
            </Link>
          </div>
        </div> 
      </SwiperSlide>

      {/* Consultas */}
      <SwiperSlide id="cp"className="" >
        <div className="flex flex-col items-center justify-center w-full h-[70vh] gap-[7%]">
          <div className="p-2 mx-2 sm:p-4">
            <div className="mb-1.5 w-full text-[17px] text-center font-medium sm:text-xl sm:mt-2.5 sm:mb-4">
              CONSULTAS FRECUENTES
            </div>
            
            <div className=" flex flex-col gap-[3px] sm:gap-1 ">
              {linkDatos.length ? (
                linkDatos.map((linkDato) => (
                  <Link
                    as={`/faq/${linkDato.slug}`}
                    href="/faq/[slug]"
                    className=" "
                    key={linkDato.slug}
                  >
                    <Frente className="py-1 px-3 gap-5 flex justify-between items-center duration-200 hover:bg-[#ffffffcc] hover:text-[#020b1d] sm:px-4 sm:py-3">
                      <p className="text-sm text-start sm:text-[15px]">
                        {linkDato.excerpt}
                      </p>
                      <div>
                        <ChevronRightIcon className="w-4 "  />
                      </div>
                    </Frente>
                  </Link>
                ))
              ) : (
                <p>Ninguna consulta publicado todavía</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-0.5 text-sm rounded-lg shadow-[0_10px_20px_#020b1d33] sm:text-[15px] sm:mt-12 sm:flex-row">
            <Link 
              href={"/iniciar-tramite/cambio-de-radicacion"} 
              className="group h-7 flex items-center rounded-t-lg px-3 bg-[#ffffffaa] duration-150 justify-start sm:rounded-tr-none sm:rounded-l-lg sm:h-8 hover:bg-white active:opacity-80">
              <IconPresupuesto 
                className="mr-2 w-[15px] h-[15px] duration-150 opacity-70 group-hover:opacity-100 sm:w-[16px] sm:h-[16px]"
                color="#ffffffdd" color2="#020b1d"
                />
              <p className="text-[#020b1dcc] duration-150 group-hover:text-[#020b1d]">Pedí presupuesto</p>
            </Link>
            <Link 
              href={"/realizar-consulta"} 
              className="group h-7 flex items-center rounded-b-lg px-3 bg-[#ffffffaa] duration-150 justify-start sm:rounded-bl-none sm:rounded-r-lg sm:h-8 hover:bg-white active:opacity-80">
              <IconConsulta 
                className="mr-2 w-[15px] h-[15px] duration-150 opacity-70 group-hover:opacity-100 sm:w-[16px] sm:h-[16px]"
                color="#ffffffdd" color2="#020b1d"
                />
              <p className="text-[#020b1dcc] duration-150 group-hover:text-[#020b1d]">Realizá tu consulta</p>
            </Link>
          </div>

          <div className="flex flex-col justify-center items-center leading-[1.1rem] text-[#39507f] text-[13px] sm:text-[14px] max-w-[1100px] sm:hidden">
            <div className="flex items-center gap-1">
              <div className="flex "><span className="font-semibold">C</span><span className="opacity-80 flex h-full items-center">arina</span></div>
              <div className="flex "><span className="font-semibold">N</span><span className="opacity-80 flex h-full items-center">oemí</span></div>
              <div className="flex "><span className="font-semibold">P</span><span className="opacity-80 flex h-full items-center">acheco</span></div>
            </div>

            <div className=" ">
              cnp.mandataria@gmail.com
            </div>
          </div>
        </div>
        <FooterInicio />
      </SwiperSlide>
    </Swiper>
  );
}
