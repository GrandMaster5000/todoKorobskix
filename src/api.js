import {db, auth} from './firebase';

export function loginUser(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}

export function signOutUser() {
    return auth.signOut();
}

export function registerUser(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
}

export function getList(userId) {
  return db.collection('lists')
    .where('userId', '==', userId)
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
    });
}

export function getTodos(userId = '') {
    return db.collection('todos')
        .where('userId', '==', userId)
        .get()
        .then(mapSnapshot);
}

export function getListTodos(listId) {
  return db.collection('todos')
  .where('listId', '==', listId)
    .get()
    .then(snapshot => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      return items;
    })
}
export function createTodo(data) {
  if(data.listId === undefined) {
    delete data.listId;
  }
  return db.collection("todos").add({
    completed: false,
    important: false,
    notes: '',
    dueDate: null,
    steps: [],
    listId: '',
    ...data,
  })
  .then(docRef => docRef.get())
  .then(mapDoc);
}
export function createList(data) {
  return db.collection("lists").add({
    icon: '',
    sort: '',
    ...data,
  })
  .then(docRef => docRef.get())
  .then(mapDoc);
}

export function updateList(listId, data) {
  console.log(listId, data);
  return db.collection("lists").doc(listId).update({...data})
    .then(() => ({
      id: listId,
      ...data
    }));
}

export function deleteList(listId) {
  return db.collection("lists").doc(listId).delete()
  .then(() => listId);
}

export function updateTodo(todoId, data) {
  return db.collection("todos").doc(todoId).update({...data})
    .then(() => ({
      id: todoId,
      ...data
    }));
}

export function deleteTodo(todoId) {
  return db.collection("todos").doc(todoId).delete()
  .then(() => todoId);
}

export function initAuth(handleAuth) {
  auth.onAuthStateChanged(handleAuth);
}

function mapSnapshot(snapshot) {
    return snapshot.docs.map(mapDoc);
}

function mapDoc(doc) {
  return {
    id: doc.id,
    ...doc.data()
  }
}