interface post {
    title: string;
    user: string;
    text: string;
    id: string;
    category: string;
    news: boolean;
    userID: string;
    amountOfPhotos?: number;
    indexOfPhotos?: number[];
}
export default post;
