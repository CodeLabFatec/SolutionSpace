import { notificationsRepository } from "@/repos/postgres/repositories/notificationsRepository";
import { Request } from "../repos/postgres/entitites/Request";
import { sendEmail } from "../services";

export async function notifyUserByRequest(request: Request): Promise<boolean> {

    const title = 'Novas atualizações sobre o seu chamado!'
    const message = `Olá ${request.user.name}, estamos notificando você de que houve uma nova avaliação realizada referente ao seu chamado '${request.title}', que agora passa a estar com o status '${request.status}'. Acesse o sistema para visualizar maiores detalhes.`
    await sendEmail({ 
        to: request.user.email, 
        subject: title, 
        text: message 
    })

    await notificationsRepository.save({
        user: request.user,
        title: title,
        message: message
    })

    return true;
}