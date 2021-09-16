import {db} from './firebase';
import { collection, query, getDocs } from "firebase/firestore";

export async function get(coll) {
    const req = query(collection(db, coll));

    const snapshot = await getDocs(req);
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return data;
}