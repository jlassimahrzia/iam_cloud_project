import {User} from "@testing/mocks";

export const SERVER_API_URL: string = ' http://localhost:8000/';

export function getHeaders(): any {
    const token = localStorage.getItem('authenticationToken');
    return {Authorization: `Bearer ${token}`};
}


export function getFakeUsers(): User[] {
  return [];
}
