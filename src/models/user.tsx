interface user {
    username: string | null;
    email: string;
    uid: string;
    type?: string;
    subjects?: string[];
}
export default user;
