import { useActionState } from 'react';

import { auth } from 'auth';
import EmailVerified from '@/app/ui/email-verified';
import { fetchUserByEmail, fetchCommentLast } from '@/app/lib/data';


// function  PaginaVerificaciónEmail() {
export default async function Page() {
    
  return (
    <div>
      <EmailVerified />
    </div>
  )
}

