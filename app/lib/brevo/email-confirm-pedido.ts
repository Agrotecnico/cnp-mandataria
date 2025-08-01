import * as brevo from "@getbrevo/brevo";

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.NEXT_PUBLIC_BREVO_API_KEY as string
);

interface Params {
    subject: string;
    to: {email: string; name: string}[]
    htmlContent: string;
}

export async function emailConfirmPedido( {subject, to, htmlContent }: Params ) {
    try {
        const smtpEmail = new brevo.SendSmtpEmail()

        smtpEmail.subject =  subject /*"Hola"*/
        smtpEmail.to = to
        // [
        //     { email: "agrotecnicog@gmail.com", name: "Mario" }
        // ];
        // smtpEmail.htmlContent = `<html><body><h1>Hola</h1><p>This is a test email</p><button>Click me</button><a href='https://www.faztweb.com'>Go to my website</a></body></html>`;
        smtpEmail.htmlContent = 
        `<html>
            <body>
                <br>
                <img src="https://res.cloudinary.com/dchmrl6fc/image/upload/v1753280842/logo-cnp-horizontal_yxoecb.png" alt="Logo" width="160" height="46">
                <br>
                <br>
                <p>${htmlContent}</p>
                <b>Te responderemos en la mayor brevedad</b>
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
