export class Pivot {
    model_id: number;
    role_id: number;
    permission_id: number;
    model_type: string;
}
export class Permission {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
    roles: Role[];
    pivot: Pivot;
}
export class Role {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
    pivot: Pivot;
    permissions : Permission[]
}

export interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
    roles: Role[];
}
