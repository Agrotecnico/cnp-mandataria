"use client"

import { User, CommentsPost, Post } from "@/app/lib/definitions";
import  distanceToNow  from "@/app/lib/dateRelative";
import { Fondo } from "@/app/ui/marcos";
import DeleteComment from './delete-comment';


export default function ListComment({ 
  comments,
  user,
  post
  }: {
  comments: CommentsPost[]
  user: User | undefined
  post: Post
  }) {

  return (
    <div className="space-y-5 mt-6">
      {comments &&
        comments.map((comment, index) => {
          // const isAuthor = user && user.email === comment.email_id;
          // const isAdmin =user && user.role === "admin";
          const isAdmin =user?.role === "admin" ? true : false;
          // const isMember =user && user.role === "member";

          return (
            <div key={index} className="flex flex-col gap-1 sm:flex-row">
              <div className="flex-shrink-0 mr-2">
                {comment.image ? (
                  <img
                    src={comment.image}
                    alt={comment.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  ) : (
                  <>
                  <span className="flex h-10 w-10 text-[#39507fcc] items-center justify-center rounded-full bg-[#020b1d18] text-2xl ">
                    {comment.nombre ? `${comment.nombre?.substring(0, 1).toUpperCase()}` : `${comment.name?.substring(0, 1).toUpperCase()}` }
                  </span>
                  </>
                )}
              </div>
              <Fondo key={comment.id} className="flex space-x-4 w-full p-3 pb-2 !bg-[#39507f09] !rounded-[6px] ">
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap">
                      <p className="font-semibold mr-2">{!comment.nombre ? comment.name : comment.nombre}</p>
                    
                      <time className="text-[#020b1d66]">
                        {distanceToNow(new Date(`${comment.created_at}`))}
                      </time>
                    </div>
                    { isAdmin /*|| isAuthor    || isMember */   &&
                      <DeleteComment id={comment.id} />
                    }
                  </div>
                  <div className=" mt-1 leading-relaxed">
                    {comment.comment}
                  </div>
                </div>
              </Fondo>
            </div>
          );
        })}
    </div>
  );
}
