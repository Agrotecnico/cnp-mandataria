import * as brevo from "@getbrevo/brevo";

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.NEXT_PUBLIC_BREVO_API_KEY as string
);

interface Params {
    // subject: string;
    to: {email: string; name: string}[]
    // htmlContent: string;
    // token: string;
}

export async function emailVerified( {to/* , htmlContent, token */ }: Params ) {

    try {
        const smtpEmail = new brevo.SendSmtpEmail()

        smtpEmail.subject = "Correo electrónico verificado"
        smtpEmail.to = to
        smtpEmail.htmlContent = 
        `<html>
            <body>
                <br>
                <img src="https://res.cloudinary.com/dchmrl6fc/image/upload/v1753280842/logo-cnp-horizontal_yxoecb.png" alt="Logo" width="160" height="46">
                <br>
                <br>
                <p>Gracias</p>
                <p>Email <b>${to[0]}</b> verificado.</p>
            </body>
        </html>
        `
        smtpEmail.sender = {
        name: "CNPmandataria",
        email: "agrotecnicog@gmail.com",
        };
        await apiInstance.sendTransacEmail(smtpEmail);
        console.log("to:", to)
    }   catch (error) {
        console.error(error)
    }
}
