export enum TeamSpaceRole {
    READ_ONLY = 10,
    EDITOR = 20,
    OWNER = 30
}

export type SpaceRole = keyof typeof TeamSpaceRole

export const ChangeSpaceRoleToValue = (role: SpaceRole | string): number => {
    return TeamSpaceRole[role as SpaceRole];
}