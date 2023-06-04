import { notificationsRepository } from "../repos/postgres/repositories/notificationsRepository";
import { Request } from "../repos/postgres/entitites/Request";
import { sendEmail } from "../services";
import { Rating } from "../repos/postgres/entitites/Rating";
import { userRepository } from "../repos/postgres/repositories/userRepository";
import { User } from "../repos/postgres/entitites/User";

export async function notifyUserByRequest(request: Request, rating: Rating): Promise<boolean> {

    const title = 'Novas atualizações sobre o seu chamado!'
    const status = request.status ? request.status.status : '-'
    const message = `Olá ${request.user.name}, \nestamos notificando você de que houve uma nova avaliação realizada referente ao seu chamado '${request.title}', atualizado para o status '${status}'. \nAvaliação realizada pelo usuário: ${rating.user.name}. \nEtapa atual do chamado: ${rating.requestStep}. \nAcesse o sistema para visualizar maiores detalhes.`
    await sendEmail({
        to: request.user.email,
        subject: title,
        text: message
    })

    await notificationsRepository.save({
        user: request.user,
        title: `Atualização de status do chamado '${request.title}'`,
        message: `O seu chamado '${request.title}' foi atualizado para o status '${status}' após uma avaliação realizada pelo usuário ${rating.user.name} durante a etapa de ${rating.requestStep}.`
    })

    return true;
}

export async function notifyUserToRecoveryPassword(email: string, accessCode: string): Promise<boolean> {

    let user = await userRepository.findOne({
        where: { email }
    });

    if (!user) {
        user = { name: "Usuário" } as User;
    }

    const title = 'Recuperação de senha de acesso!'
    const message = `Olá ${user.name}, \n\nSegue abaixo o código para alteração de sua senha de acesso: \n\n${accessCode} \n\nInsira este código na área informada para cadastrar uma nova senha. \n\nAcesse o sistema para visualizar maiores detalhes.`
    await sendEmail({
        to: email,
        subject: title,
        text: message
    })

    return true;
}