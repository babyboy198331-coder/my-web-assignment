import React from 'react';
import './App.css';
import { auth, db } from './firebase/init';
import {collection, addDoc, getDocs, getDoc, doc, query, where, updateDoc} from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  async function updatePost() {
    const hardcodedId = "3fERNXnZ4kvccLl5CZG3";
    const postRef = doc(db, "posts", hardcodedId);

    const post = await getPostById(hardcodedId);

    const newPost = {
      ...post,
      description: "Finish Frontend simplified",
      uid: "1",
      title: "Land a $200k job"
    };

    await updateDoc(postRef, newPost);
  }

  function createPost() {
    const post = {
      title: "Finish Interview Section",
      description: "Do Frontend Simplified",
      uid: user.uid,
    };

    addDoc(collection(db, "posts"), post);
  }

  async function getAllPosts() {
    const { docs } = await getDocs(collection(db, "posts"));
    const posts = docs.map((elem) => ({ ...elem.data(), id: elem.id }));
    console.log(posts);
  }

  async function getPostById(id) {
    const postRef = doc(db, "posts", id);
    const postSnap = await getDoc(postRef);

    const post = postSnap.data();
    console.log(post);

    return post;
  }

  async function getPostByUid() {
    const postCollectionRef = query(
      collection(db, "posts"),
      where("uid", "==", user.uid)
    );

    const { docs } = await getDocs(postCollectionRef);
    const posts = docs.map((elem) => ({ ...elem.data(), id: elem.id }));
    console.log(posts);
  }

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      console.log(user);

      if (user) {
        setUser(user);
      }
    });
  }, []);

  function register() {
    createUserWithEmailAndPassword(auth, 'email@email.com', 'test123')
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function login() {
    signInWithEmailAndPassword(auth, 'email@email.com', 'test123')
      .then((user) => {
        setUser(user.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function logout() {
    signOut(auth);
    setUser({});
  }

  return (
    <div className="App">
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>

      {loading ? 'loading...' : user?.email}

      <button onClick={createPost}>Create Post</button>
      <button onClick={getAllPosts}>Get All Posts</button>

      <button onClick={() => getPostById("3fERNXnZ4kvccLl5CZG3")}>
        Get Post By Id
      </button>

      <button onClick={getPostByUid}>Get Post By Uid</button>
      <button onClick={updatePost}>Update Post</button>
    </div>
  );
}

export default App;