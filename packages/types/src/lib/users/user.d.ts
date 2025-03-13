import { Node } from '../node';
export type User = Node & {
    username: string;
    name: string;
    email: string;
    password: string;
    dateTimeCreated: Date;
    dateTimeLastUpdated: Date;
};
