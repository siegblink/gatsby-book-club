import firebaseConfig from "./config"
// import axios from "axios"

class Firebase {
  constructor(app) {
    if (!firebaseInstance) {
      app.initializeApp(firebaseConfig)

      this.auth = app.auth()
      this.db = app.firestore()
      this.functions = app.functions()
      this.storage = app.storage()
    }
  }

  async getUserProfile({ userId, callback }) {
    return this.db
      .collection("publicProfiles")
      .where("userId", "==", userId)
      .limit(1)
      .onSnapshot(callback)
  }

  async createAuthor({ authorName }) {
    const createAuthorCallable = this.functions.httpsCallable("createAuthor")
    return createAuthorCallable({ authorName })
  }

  async getAuthors() {
    return this.db.collection("authors").get()
  }

  async createBook({ bookName, authorId, bookCover, summary }) {
    const createBookCallable = this.functions.httpsCallable("createBook")
    createBookCallable({ bookName, authorId, bookCover, summary })
  }

  async register({ email, password, username }) {
    await this.auth.createUserWithEmailAndPassword(email, password)
    const createProfileCallable = this.functions.httpsCallable(
      "createPublicProfile"
    )
    return createProfileCallable({ username })
  }

  async postComment({ text, bookId }) {
    const postCommentCallable = this.functions.httpsCallable("postComment")
    return postCommentCallable({ text, bookId })
  }

  subscribeToBookComments({ bookId, callback }) {
    const bookReference = this.db.collection("books").doc(bookId)
    return this.db
      .collection("comments")
      .where("book", "==", bookReference)
      .orderBy("dateCreated", "desc")
      .onSnapshot(callback)
  }

  async login({ email, password }) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  async logout() {
    await this.auth.signOut()
  }
}

let firebaseInstance

function getFirebaseInstance(app) {
  if (!firebaseInstance && app) {
    firebaseInstance = new Firebase(app)
    return firebaseInstance
  } else if (firebaseInstance) {
    return firebaseInstance
  } else {
    return null
  }
}

export default getFirebaseInstance
