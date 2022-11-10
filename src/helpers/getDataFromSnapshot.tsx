import { DataSnapshot } from "firebase/database";
const getDataFromSnapshot = async (fetch: () => DataSnapshot) => {
    const snapshot = await fetch();
    const result = [];
    if (snapshot.exists()) {
        const snapshotVal = snapshot.val();
        for (const id in snapshotVal) {
            result.push(snapshotVal[id]);
        }
    }
    return result;
};
export default getDataFromSnapshot;
