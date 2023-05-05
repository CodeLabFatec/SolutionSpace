import { EmailType } from '@/types'
import 'dotenv/config'
import nodemailer from 'nodemailer'

const hostMail = process.env.MAIL_HOST
const portMail = parseInt(process.env.MAIL_PORT || '')
const userAuth = process.env.MAIL_USER || ''
const passAuth = process.env.MAIL_PASS || ''

const mailService = nodemailer.createTransport({
    host: hostMail,
    port: portMail,
    secure: false,
    auth: {
      user: userAuth,
      pass: passAuth
    },
});

export const sendEmail = async (email: EmailType) => {
    await mailService.sendMail({
        from: `SolutionSpace <${userAuth}>`, // sender address
        to: email.to, // list of receivers
        subject: email.subject, // Subject line
        text: email.text, // plain text body
      });
}