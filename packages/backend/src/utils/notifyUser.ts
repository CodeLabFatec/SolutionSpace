import { notificationsRepository } from "../repos/postgres/repositories/notificationsRepository";
import { Request } from "../repos/postgres/entitites/Request";
import { sendEmail } from "../services";
import { Rating } from "../repos/postgres/entitites/Rating";

export async function notifyUserByRequest(request: Request, rating: Rating): Promise<boolean> {

    const title = 'Novas atualizações sobre o seu chamado!'
    const message = `Olá ${request.user.name}, estamos notificando você de que houve uma nova avaliação realizada referente ao seu chamado '${request.title}', que agora passa a estar com o status '${request.status}'. Acesse o sistema para visualizar maiores detalhes.`
    await sendEmail({ 
        to: request.user.email, 
        subject: title, 
        text: message 
    })

    await notificationsRepository.save({
        user: request.user,
        title: `Atualização de status do chamado '${request.title}'`,
        message: `O seu chamado '${request.title}' foi atualizado para o status '${request.status}' após uma avaliação realizada pelo usuário ${rating.user.name} durante a etapa de ${rating.requestStep}.`
    })

    return true;
}