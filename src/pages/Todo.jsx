import PropTypes from "prop-types";
import { Button } from "@mui/material";

const Todo = ({ todo, updateTodos }) => {
  return (
    <div
      style={{
        border: "2px solid purple",
        padding: "10px",
        width: "40vh",
        justifyContent: "space-around",
      }}
    >
      <div>
        <strong style={{ textDecoration: "blue underline" }}>Title:</strong>{" "}
        {todo.title}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <strong style={{ textDecoration: "blue underline" }}>Completed:</strong>{" "}
        {todo.completed ? "True" : "False"}
        {todo.completed ? (
          <></>
        ) : (
          <Button
            onClick={() => updateTodos(todo.id, { ...todo, completed: true })}
            variant="contained"
            size="small"
            sx={{ backgroundColor: "#FFDB58", color: "black" }}
          >
            Mark Completed
          </Button>
        )}
      </div>
    </div>
  );
};

Todo.propTypes = {
  todo: PropTypes.object.isRequired,
  updateTodos: PropTypes.func.isRequired,
};

export default Todo;
