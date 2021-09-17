import {db} from './firebase';

export function get(collectionName) {
  const collection = db.collection(collectionName);

  return (query = () => collection) => {
    return query(collection)
    .get()
    .then(snapshot => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      return items;
    })
    .catch(error => {
      console.log("error:" , error);
    })
  }
}