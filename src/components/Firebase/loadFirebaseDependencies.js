const app = import("firebase/app")
const auth = import("firebase/auth")
const database = import("firebase/firestore")
const functions = import("firebase/functions")
const storage = import("firebase/storage")

const dependencyCollection = [app, auth, database, functions, storage]
const loadFirebaseDependencies = Promise.all(dependencyCollection).then(
  function(values) {
    return values[0]
  }
)

export default loadFirebaseDependencies
