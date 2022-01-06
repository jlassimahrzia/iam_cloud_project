import { User, Role } from '@modules/auth/models';
export { User };

export class MockUser implements User {
    id = 1;
    firstName = 'TEST_FIRST_NAME';
    lastName = 'TEST_LAST_NAME';
    email = 'TEST_EMAIL';
    type = 'TEST_EMAIL';
    password = 'TEST_EMAIL';
    created_at: string;
    email_verified_at: string;
    firstname: string;
    lastname: string;
    roles: Role[];
    updated_at: string;
}
