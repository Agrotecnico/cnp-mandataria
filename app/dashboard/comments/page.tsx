import { Metadata } from 'next';
import { auth } from '@/auth';
import Image from 'next/image';
import { notFound } from 'next/navigation';


import Search from '@/app/ui/search';
import Pagination from '@/app/ui/invoices/pagination';
import { fetchCommentsPages } from '@/app/lib/data';
import { fetchCommentsPagesM } from '@/app/lib/data';
import { fetchFilteredCommentsA, fetchFilteredCommentsM } from '@/app/lib/data';
import { Fondo, Frente } from "@/app/ui/marcos";
import  distanceToNow  from "@/app/lib/dateRelative";
import UpdateComment from '@/app/ui/consultas/comments/update-comment';
import DeleteComment from '@/app/ui/comments/delete-comment';
import { fetchUserByEmail } from "@/app/lib/data";


export const metadata: Metadata = {
  title: 'Consultas',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {

  const session = await auth();
  const id= session?.user?.email

  const user = await fetchUserByEmail(session?.user.email);

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const {totalPages, countcomm} = await fetchCommentsPages(query);

  const comments = await fetchFilteredCommentsA(query, currentPage);

  const {totalPagesMember, countcommM} = await fetchCommentsPagesM(id);

  const commentsMember = await fetchFilteredCommentsM( id, currentPage );

  
  // if ( user?.role === "admin" ) {
  //   if ( user?.account === "abierto")
  //     return (
  //       <main>
  //         <h1 className={`mb-4 mt-2 text-xl lg:text-2xl`}>
  //           Comentarios admin abierto
  //         </h1>

  //         <div className="mt-4 mb-6 flex items-center justify-between gap-2">
  //           <Search placeholder="Buscar comentarios..." />
  //         </div>
          
  //         {comments.length ? (
  //           <div className='relative '>
  //             {comments &&
  //               comments.map((comment, index) => {
  //                 const isAuthor = session && session.user.email === comment.email_id;
  //                 const isAdmin = session && session.user.role === "admin";
  //                 const numeroFormateado = ( ( countcomm - currentPage * 6 ) + 6 - index ).toString().padStart(3, "0")

  //                 return (
  //                   <div key={index} className={`flex flex-col mb-4 gap-1.5`}>
  //                     <div className="flex flex-wrap items-center gap-2 ml-3 sm:gap-3">
  //                       <div className="" data-testid="image-container">
  //                         { comment.image ? (
  //                             <Image
  //                               src= {comment.image}
  //                               width={20}
  //                               height={20}
  //                               className="w-11 max-w-2xl rounded-full " alt="avatar user">
                                
  //                             </Image>
  //                           ) : (
  //                             <div className="flex w-12 h-12 text-2xl items-center justify-center rounded-full bg-[#020b1d11] text-[#666] ">
  //                               {comment?.email_id?.substring(0, 1).toUpperCase()}
  //                             </div>
  //                           )} 
  //                       </div>

  //                       <div className="flex flex-col justify-center items-start ">
  //                         <h2 className="text-md font-semibold m-0" data-testid="username-test">
  //                           {comment?.name}
  //                         </h2>
  //                         <div className="flex text-[13px]">
  //                           <p className="text-[#020b1daa] ">{comment?.email_id}</p>
  //                         </div>
  //                       </div>
  //                     </div>

  //                     <Frente key={comment.id} className="flex text-[#020b1dbb] space-x-4 w-full p-3 !bg-[#ffffff88] !rounded-[6px] sm:p-4 ">
  //                       <div className="flex-grow">
  //                         <div className="flex items-center justify-between">
  //                           <div className="flex items-center flex-wrap">
  //                             <p className="font-medium text-sm">COMENTARIO<span className="bg-[#548effdd] mx-2 px-1 py-[1px] text-[13px] text-[#ffffff] rounded-[4px] ">{numeroFormateado}</span></p>
                              
  //                             <time className="text-[#020b1d77] text-[14px]">
  //                               realizado {distanceToNow(new Date(`${comment.created_at}`))}
  //                             </time>
  //                           </div>
  //                           <div className='relative flex items-center gap-0'>
  //                             { isAdmin ?
  //                               <DeleteComment id={comment.id}/> : isAuthor &&
  //                               <UpdateComment id={comment.id} /> 
  //                             }
  //                           </div>
  //                         </div>
  //                         <div className="text-sm mt-4 leading-relaxed text-[#020b1db6]">
  //                           {comment.comment }
  //                         </div>
  //                       </div>
  //                     </Frente>
  //                   </div>
  //                 );
  //               })
  //             }
  //             <div className="-z-10 my-5 flex w-full justify-center">
  //               <Pagination totalPages={totalPages} />
  //             </div>
  //           </div>
  //         ) : (
  //           <div className="flex flex-col  justify-center">
  //             <p>{/* Todavía no realizaste un commentario */ }Todavía no se realizó ningún commentario</p>
  //           </div>
  //         )}
  //       </main>
  //   );
  //   return (
  //     <>
  //       {/* <main>
  //         <h1 className={`mb-[22px] mt-1.5 text-xl lg:mb-[22px] lg:text-2xl`}>
  //           Mis Comentarios
  //         </h1>
          
  //         {commentsMember.length ? (
  //           <div className='relative '>
  //             {commentsMember &&
  //               commentsMember.map((comment, index) => {
  //                 const isAuthor = session && session.user.email === comment.email_id;
  //                 const isAdmin = session && session.user.role === "admin";
  //                 const numeroFormateado = ( ( countcommM - currentPage * 6 ) + 6 - index ).toString().padStart(3, "0")

  //                 return (
  //                   <div key={index} className={`flex flex-col mb-3 gap-[2px]`}>
  //                     <Frente className="flex flex-col text-[#020b1dbb] w-full p-3 !bg-[#ffffff88] !rounded-[6px] sm:p-4 ">
  //                         <div className="w-full flex items-center justify-between">
  //                           <div className="flex items-center flex-wrap gap-[2px]">
  //                             <div className="flex items-center font-medium text-[13px] mr-2 sm:text-sm ">
  //                               <p>COMENTARIO</p>
  //                               <p className="bg-[#548effdd] ml-1 px-1 text-[13px] text-[#ffffff] rounded-md">{numeroFormateado}</p>
  //                             </div>
  //                             <p className="flex flex-nowrap items-center">
  //                               <span className="text-[14px] mb-0.5">realizado</span>
  //                               <time className="text-[#020b1d77] text-[13px] ml-1 rounded-lg px-1.5 bg-[#ffffff] sm:text-sm">
  //                                 {distanceToNow(new Date(`${comment.created_at}`))}
  //                               </time>
  //                             </p>
  //                           </div> 
                            
  //                           <div className='relative h-[30px] flex items-center gap-0 mb-auto'>
  //                             { (isAdmin || isAuthor ) &&
  //                               <UpdateComment id={comment.id} /> 
  //                             }
  //                           </div>
  //                         </div>
  //                         <div className="mt-2 mx-2 text-[#020b1db6] text-sm sm:text-[15px] lg:mx-4">
  //                           {comment.comment }
  //                         </div>
  //                     </Frente>
  //                   </div>
  //                 );
  //               })
  //             }
  //             <div className="-z-10 my-5 flex w-full justify-center">
  //               <Pagination totalPages={totalPagesMember} />
  //             </div>
  //           </div>
  //         ) : (
  //           <div className="flex flex-col  justify-center">
  //             <p>Todavía no realizaste un commentario</p>
  //           </div>
  //         )}
  //       </main> */}

  //       <main>
  //         <h1 className={`mb-4 mt-2 text-xl lg:text-2xl`}>
  //           Comentarios admin cerrrado
  //         </h1>

  //         <div className="mt-4 mb-6 flex items-center justify-between gap-2">
  //           <Search placeholder="Buscar comentarios..." />
  //         </div>
          
  //         {comments.length ? (
  //           <div className='relative '>
  //             {comments &&
  //               comments.map((comment, index) => {
  //                 const isAuthor = session && session.user.email === comment.email_id;
  //                 const isAdmin = session && session.user.role === "admin";
  //                 const numeroFormateado = ( ( countcomm - currentPage * 6 ) + 6 - index ).toString().padStart(3, "0")

  //                 return (
  //                   <div key={index} className={`flex flex-col mb-4 gap-1.5`}>
  //                     <div className="flex flex-wrap items-center gap-2 ml-3 sm:gap-3">
  //                       <div className="" data-testid="image-container">
  //                         { comment.image ? (
  //                             <Image
  //                               src= {comment.image}
  //                               width={20}
  //                               height={20}
  //                               className="w-11 max-w-2xl rounded-full " alt="avatar user">
                                
  //                             </Image>
  //                           ) : (
  //                             <div className="flex w-12 h-12 text-2xl items-center justify-center rounded-full bg-[#020b1d11] text-[#666] ">
  //                               {comment?.email_id?.substring(0, 1).toUpperCase()}
  //                             </div>
  //                           )} 
  //                       </div>

  //                       <div className="flex flex-col justify-center items-start ">
  //                         <h2 className="text-md font-semibold m-0" data-testid="username-test">
  //                           {comment?.name}
  //                         </h2>
  //                         <div className="flex text-[13px]">
  //                           <p className="text-[#020b1daa] ">{comment?.email_id}</p>
  //                         </div>
  //                       </div>
  //                     </div>

  //                     <Frente key={comment.id} className="flex text-[#020b1dbb] space-x-4 w-full p-3 !bg-[#ffffff88] !rounded-[6px] sm:p-4 ">
  //                       <div className="flex-grow">
  //                         <div className="flex items-center justify-between">
  //                           <div className="flex items-center flex-wrap">
  //                             <p className="font-medium text-sm">COMENTARIO<span className="bg-[#548effdd] mx-2 px-1 py-[1px] text-[13px] text-[#ffffff] rounded-[4px] ">{numeroFormateado}</span></p>
                              
  //                             <time className="text-[#020b1d77] text-[14px]">
  //                               realizado {distanceToNow(new Date(`${comment.created_at}`))}
  //                             </time>
  //                           </div>
  //                           <div className='relative flex items-center gap-0'>
  //                             { isAdmin ?
  //                               <DeleteComment id={comment.id}/> : isAuthor &&
  //                               <UpdateComment id={comment.id} /> 
  //                             }
  //                           </div>
  //                         </div>
  //                         <div className="text-sm mt-4 leading-relaxed text-[#020b1db6]">
  //                           {comment.comment }
  //                         </div>
  //                       </div>
  //                     </Frente>
  //                   </div>
  //                 );
  //               })
  //             }
  //             <div className="-z-10 my-5 flex w-full justify-center">
  //               <Pagination totalPages={totalPages} />
  //             </div>
  //           </div>
  //         ) : (
  //           <div className="flex flex-col  justify-center">
  //             <p>{/* Todavía no realizaste un commentario */ }Todavía no se realizó ningún commentario</p>
  //           </div>
  //         )}
  //       </main>
  //     </>
  //   );
  // }
  
  // if ( user?.role === "memberAccount" ) {
  //   if (user?.account === "abierto") {
  //     <main>
  //       <h1 className={`mb-[22px] mt-1.5 text-xl lg:mb-[22px] lg:text-2xl`}>
  //         Mis Comentarios memberAccount abierto
  //       </h1>
        
  //       {commentsMember.length ? (
  //         <div className='relative '>
  //           {commentsMember &&
  //             commentsMember.map((comment, index) => {
  //               const isAuthor = session && session.user.email === comment.email_id;
  //               const isAdmin = session && session.user.role === "admin";
  //               const numeroFormateado = ( ( countcommM - currentPage * 6 ) + 6 - index ).toString().padStart(3, "0")

  //               return (
  //                 <div key={index} className={`flex flex-col mb-3 gap-[2px]`}>
  //                   <Frente className="flex flex-col text-[#020b1dbb] w-full p-3 !bg-[#ffffff88] !rounded-[6px] sm:p-4 ">
  //                       <div className="w-full flex items-center justify-between">
  //                         <div className="flex items-center flex-wrap gap-[2px]">
  //                           <div className="flex items-center font-medium text-[13px] mr-2 sm:text-sm ">
  //                             <p>COMENTARIO</p>
  //                             <p className="bg-[#548effdd] ml-1 px-1 text-[13px] text-[#ffffff] rounded-md">{numeroFormateado}</p>
  //                           </div>
  //                           <p className="flex flex-nowrap items-center">
  //                             <span className="text-[14px] mb-0.5">realizado</span>
  //                             <time className="text-[#020b1d77] text-[13px] ml-1 rounded-lg px-1.5 bg-[#ffffff] sm:text-sm">
  //                               {distanceToNow(new Date(`${comment.created_at}`))}
  //                             </time>
  //                           </p>
  //                         </div> 
                          
  //                         <div className='relative h-[30px] flex items-center gap-0 mb-auto'>
  //                           { (isAdmin || isAuthor ) &&
  //                             <UpdateComment id={comment.id} /> 
  //                           }
  //                         </div>
  //                       </div>
  //                       <div className="mt-2 mx-2 text-[#020b1db6] text-sm sm:text-[15px] lg:mx-4">
  //                         {comment.comment }
  //                       </div>
  //                   </Frente>
  //                 </div>
  //               );
  //             })
  //           }
  //           <div className="-z-10 my-5 flex w-full justify-center">
  //             <Pagination totalPages={totalPagesMember} />
  //           </div>
  //         </div>
  //       ) : (
  //         <div className="flex flex-col  justify-center">
  //           <p>Todavía no realizaste un commentario</p>
  //         </div>
  //       )}
  //     </main>
  //   }
  //   return (
  //     <main>
  //       <h1 className={`mb-[22px] mt-1.5 text-xl lg:mb-[22px] lg:text-2xl`}>
  //         Mis Comentarios memberAccount cerrado
  //       </h1>
        
  //       {commentsMember.length ? (
  //         <div className='relative '>
  //           {commentsMember &&
  //             commentsMember.map((comment, index) => {
  //               const isAuthor = session && session.user.email === comment.email_id;
  //               const isAdmin = session && session.user.role === "admin";
  //               const numeroFormateado = ( ( countcommM - currentPage * 6 ) + 6 - index ).toString().padStart(3, "0")

  //               return (
  //                 <div key={index} className={`flex flex-col mb-3 gap-[2px]`}>
  //                   <Frente className="flex flex-col text-[#020b1dbb] w-full p-3 !bg-[#ffffff88] !rounded-[6px] sm:p-4 ">
  //                       <div className="w-full flex items-center justify-between">
  //                         <div className="flex items-center flex-wrap gap-[2px]">
  //                           <div className="flex items-center font-medium text-[13px] mr-2 sm:text-sm ">
  //                             <p>COMENTARIO</p>
  //                             <p className="bg-[#548effdd] ml-1 px-1 text-[13px] text-[#ffffff] rounded-md">{numeroFormateado}</p>
  //                           </div>
  //                           <p className="flex flex-nowrap items-center">
  //                             <span className="text-[14px] mb-0.5">realizado</span>
  //                             <time className="text-[#020b1d77] text-[13px] ml-1 rounded-lg px-1.5 bg-[#ffffff] sm:text-sm">
  //                               {distanceToNow(new Date(`${comment.created_at}`))}
  //                             </time>
  //                           </p>
  //                         </div> 
                          
  //                         <div className='relative h-[30px] flex items-center gap-0 mb-auto'>
  //                           { (isAdmin || isAuthor ) &&
  //                             <UpdateComment id={comment.id} /> 
  //                           }
  //                         </div>
  //                       </div>
  //                       <div className="mt-2 mx-2 text-[#020b1db6] text-sm sm:text-[15px] lg:mx-4">
  //                         {comment.comment }
  //                       </div>
  //                   </Frente>
  //                 </div>
  //               );
  //             })
  //           }
  //           <div className="-z-10 my-5 flex w-full justify-center">
  //             <Pagination totalPages={totalPagesMember} />
  //           </div>
  //         </div>
  //       ) : (
  //         <div className="flex flex-col  justify-center">
  //           <p>Todavía no realizaste un commentario</p>
  //         </div>
  //       )}
  //     </main>
  //   )
  // }

  // if ( user?.role === "memberVerified" ) {
  //   return (
  //     <main>
  //       <h1 className={`mb-[22px] mt-1.5 text-xl lg:mb-[22px] lg:text-2xl`}>
  //         Mis Comentarios memberVerified
  //       </h1>
        
  //       {commentsMember.length ? (
  //         <div className='relative '>
  //           {commentsMember &&
  //             commentsMember.map((comment, index) => {
  //               const isAuthor = session && session.user.email === comment.email_id;
  //               const isAdmin = session && session.user.role === "admin";
  //               const numeroFormateado = ( ( countcommM - currentPage * 6 ) + 6 - index ).toString().padStart(3, "0")

  //               return (
  //                 <div key={index} className={`flex flex-col mb-3 gap-[2px]`}>
  //                   <Frente className="flex flex-col text-[#020b1dbb] w-full p-3 !bg-[#ffffff88] !rounded-[6px] sm:p-4 ">
  //                       <div className="w-full flex items-center justify-between">
  //                         <div className="flex items-center flex-wrap gap-[2px]">
  //                           <div className="flex items-center font-medium text-[13px] mr-2 sm:text-sm ">
  //                             <p>COMENTARIO</p>
  //                             <p className="bg-[#548effdd] ml-1 px-1 text-[13px] text-[#ffffff] rounded-md">{numeroFormateado}</p>
  //                           </div>
  //                           <p className="flex flex-nowrap items-center">
  //                             <span className="text-[14px] mb-0.5">realizado</span>
  //                             <time className="text-[#020b1d77] text-[13px] ml-1 rounded-lg px-1.5 bg-[#ffffff] sm:text-sm">
  //                               {distanceToNow(new Date(`${comment.created_at}`))}
  //                             </time>
  //                           </p>
  //                         </div> 
                          
  //                         <div className='relative h-[30px] flex items-center gap-0 mb-auto'>
  //                           { (isAdmin || isAuthor ) &&
  //                             <UpdateComment id={comment.id} /> 
  //                           }
  //                         </div>
  //                       </div>
  //                       <div className="mt-2 mx-2 text-[#020b1db6] text-sm sm:text-[15px] lg:mx-4">
  //                         {comment.comment }
  //                       </div>
  //                   </Frente>
  //                 </div>
  //               );
  //             })
  //           }
  //           <div className="-z-10 my-5 flex w-full justify-center">
  //             <Pagination totalPages={totalPagesMember} />
  //           </div>
  //         </div>
  //       ) : (
  //         <div className="flex flex-col  justify-center">
  //           <p>Todavía no realizaste un commentario</p>
  //         </div>
  //       )}
  //     </main>
  //   )
  // }

  return notFound();
}
