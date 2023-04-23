import { Group } from "../repos/postgres/entitites/Group";
import { groupRepository } from "../repos/postgres/repositories/groupRepository";

export interface GroupPermissions {
    groupName: string
    canRateAnalise: boolean
    mustRateAnalise: boolean
    canRateAlinhamento: boolean
    mustRateAlinhamento: boolean
}

export async function checkGroupPermission(group_id: string): Promise<GroupPermissions> {
    const group: Group = await groupRepository.findOneBy({ group_id })
        .catch(error => {
            return error
        });

    return {
        groupName: group.group_name,
        canRateAnalise: group.canRateAnalise,
        mustRateAnalise: group.mustRateAnalise,
        canRateAlinhamento: group.canRateAnalinhamento,
        mustRateAlinhamento: group.mustRateAnalinhamento
    };
}