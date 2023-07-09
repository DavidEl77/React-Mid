import { useState } from "react";
import axios from "axios";
import User from "./User";
import { TextField, Button } from "@mui/material";
import { useEffect } from "react";
import Todo from "./Todo";
import Post from "./Post";

const usersUrl = "https://jsonplaceholder.typicode.com/users";
const todosUrl = "https://jsonplaceholder.typicode.com/todos";
const postsUrl = "https://jsonplaceholder.typicode.com/posts";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [maxUserId, setMaxUserId] = useState(10);
  const [todos, setTodos] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState();
  const [filteredSearch, setFilteredSearch] = useState("");
  const [isNewTodo, setIsNewTodo] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [isNewPost, setIsNewPost] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostBody, setNewPostBody] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");

  useEffect(() => {
    if (selectedUserId) setIsNewUser(false);
  }, [selectedUserId]);

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      const getUsers = async () => {
        const { data } = await axios.get(usersUrl);
        setUsers(data);
        localStorage.setItem("users", JSON.stringify(data));
      };
      getUsers();
    }

    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    } else {
      const getTodos = async () => {
        const { data } = await axios.get(todosUrl);
        setTodos(data);
        localStorage.setItem("todos", JSON.stringify(data));
      };

      getTodos();
    }

    const storedPosts = localStorage.getItem("posts");
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    } else {
      const getPosts = async () => {
        const { data } = await axios.get(postsUrl);
        setPosts(data);
        localStorage.setItem("posts", JSON.stringify(data));
      };
      getPosts();
    }
  }, []);

  const deleteUser = (userId) => {
    const newUsers = users.filter((user) => user.id !== userId);
    setUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers));
  };

  const updateUser = (id, obj) => {
    const newUsers = users.map((user) => {
      if (user.id === id) {
        return { ...user, ...obj };
      }
      return user;
    });
    setUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers));
    window.location.reload();
  };

  const updateTodos = (id, obj) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, ...obj };
      }
      return todo;
    });
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const addTodo = () => {
    const newTodo = {
      id: todos.length + 1,
      title: newTodoTitle,
      completed: false,
      userId: selectedUserId,
    };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setNewTodoTitle("");
    setIsNewTodo(false);
  };

  const addPost = () => {
    const newPost = {
      id: posts.length + 1,
      title: newPostTitle,
      body: newPostBody,
      userId: selectedUserId,
    };
    const newPosts = [...posts, newPost];
    setPosts(newPosts);
    localStorage.setItem("posts", JSON.stringify(newPosts));
    setNewPostTitle("");
    setNewPostBody("");
    setIsNewPost(false);
  };

  const addUser = () => {
    const newUser = {
      id: maxUserId + 1,
      name: newUserName,
      email: newUserEmail,
      address: {
        street: "",
        city: "",
        zipcode: "",
      },
    };
    const newUsers = [...users, newUser];
    setUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers));
    setMaxUserId(maxUserId + 1);
    setNewUserName("");
    setNewUserEmail("");
    setIsNewUser(false);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "30px",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Search"
          type="text"
          value={filteredSearch}
          variant="outlined"
          onChange={(e) => setFilteredSearch(e.target.value)}
        />
        <Button onClick={() => setIsNewUser(true)} variant="contained">
          Add
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "20px",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            gap: "10px",
            alignItems: "center",
          }}
        >
          {users.map((user) => {
            return (
              <User
                key={user.id}
                user={user}
                filteredSearch={filteredSearch}
                deleteUser={deleteUser}
                updateUser={updateUser}
                selectedUserId={selectedUserId}
                setSelectedUserId={setSelectedUserId}
                todos={todos}
              />
            );
          })}
        </div>
        {isNewUser ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              alignContent: "center",
              padding: "20px",
              width: "30vh",
              border: "2px solid black",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Name"
              type="text"
              value={newUserName}
              variant="outlined"
              onChange={(e) => setNewUserName(e.target.value)}
            ></TextField>
            <TextField
              id="outlined-basic"
              label="Email"
              type="text"
              value={newUserEmail}
              variant="outlined"
              onChange={(e) => setNewUserEmail(e.target.value)}
            ></TextField>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <Button
                onClick={() => setIsNewUser(false)}
                variant="contained"
                color="error"
              >
                Cancel
              </Button>
              <Button onClick={addUser} variant="contained" color="success">
                Add
              </Button>
            </div>
          </div>
        ) : (
          selectedUserId && (
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: "10px",
                }}
              >
                <p>Todos - User {selectedUserId}</p>
                <Button onClick={() => setIsNewTodo(true)} variant="outlined">
                  Add
                </Button>
              </div>
              <div
                style={{
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <div
                  style={{
                    border: "2px solid black",
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  {isNewTodo ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        alignContent: "center",
                        padding: "20px",
                        width: "20vh",
                      }}
                    >
                      <TextField
                        id="outlined-basic"
                        label="Title"
                        type="text"
                        value={newTodoTitle}
                        variant="outlined"
                        onChange={(e) => setNewTodoTitle(e.target.value)}
                      ></TextField>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <Button
                          onClick={() => setIsNewTodo(false)}
                          variant="contained"
                          color="error"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={addTodo}
                          variant="contained"
                          color="success"
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  ) : (
                    todos
                      .filter((todo) => todo.userId === selectedUserId)
                      .map((todo) => {
                        return (
                          <Todo
                            key={todo.id}
                            todo={todo}
                            updateTodos={updateTodos}
                          />
                        );
                      })
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: "10px",
                  }}
                >
                  <p>Posts - User {selectedUserId}</p>
                  <Button onClick={() => setIsNewPost(true)} variant="outlined">
                    Add
                  </Button>
                </div>
                <div
                  style={{
                    border: "2px solid black",
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    gap: "10px",
                    alignItems: "flex-start",
                  }}
                >
                  {isNewPost ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        alignContent: "center",
                        padding: "20px",
                      }}
                    >
                      <TextField
                        id="outlined-basic"
                        label="Title"
                        type="text"
                        value={newPostTitle}
                        variant="outlined"
                        onChange={(e) => setNewPostTitle(e.target.value)}
                      ></TextField>
                      <TextField
                        id="outlined-basic"
                        label="Body"
                        type="text"
                        value={newPostBody}
                        variant="outlined"
                        onChange={(e) => setNewPostBody(e.target.value)}
                      ></TextField>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <Button
                          onClick={() => setIsNewPost(false)}
                          variant="contained"
                          color="error"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={addPost}
                          variant="contained"
                          color="success"
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  ) : (
                    posts
                      .filter((post) => post.userId === selectedUserId)
                      .map((post) => {
                        return <Post key={post.id} post={post} />;
                      })
                  )}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default Users;
