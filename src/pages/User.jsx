import { useState } from "react";
import { TextField, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import PropTypes from "prop-types";

const User = ({
  user: curUser,
  filteredSearch,
  deleteUser,
  updateUser,
  selectedUserId,
  setSelectedUserId,
  todos,
}) => {
  const [user, setUser] = useState(curUser);
  const [isDataShown, setIsDataShown] = useState(false);
  const [isSelected, setIsSelected] = useState(true);

  const handleSelect = () => {
    setIsSelected(true);
    setSelectedUserId(isSelected ? user.id : null);
  };

  const filter =
    !user.name.toLowerCase().includes(filteredSearch) &&
    !user.email.toLowerCase().includes(filteredSearch);

  const selectedUserIdTodosStatus = todos
    .filter((todo) => todo.userId === user.id)
    .some((todo) => !todo.completed);

  const getStyles = (selectedUserId) => {
    return {
      border: `2px solid ${selectedUserIdTodosStatus ? "red" : "green"}`,
      width: "60vh",
      padding: "10px",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      alignItems: "center",
      backgroundColor: selectedUserId === user.id ? "#FED8B1" : "white",
    };
  };

  const style = getStyles(selectedUserId);

  return filter ? (
    <></>
  ) : (
    <div style={style}>
      <label onClick={handleSelect} style={{ cursor: "pointer" }}>
        ID: {user.id}
      </label>
      <TextField
        id="outlined-basic"
        label="Name"
        type="text"
        value={user.name}
        variant="outlined"
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <TextField
        id="outlined-basic"
        label="Email"
        type="text"
        value={user.email}
        variant="outlined"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <Button
        variant="outlined"
        onMouseOver={() => setIsDataShown(true)}
        onClick={() => setIsDataShown(false)}
      >
        Other Data
      </Button>
      {!isDataShown ? (
        <></>
      ) : (
        <div
          style={{
            border: "2px solid black",
            padding: "10px",
            borderRadius: "30px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            alignItems: "center",
            width: "50vh",
            height: "100%",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Street"
            type="text"
            value={user.address.street}
            variant="outlined"
            onChange={(e) =>
              setUser({
                ...user,
                address: { ...user.address, street: e.target.value },
              })
            }
          />
          <TextField
            id="outlined-basic"
            label="City"
            type="text"
            value={user.address.city}
            variant="outlined"
            onChange={(e) =>
              setUser({
                ...user,
                address: { ...user.address, city: e.target.value },
              })
            }
          />
          <TextField
            id="outlined-basic"
            label="Zip Code"
            type="text"
            value={user.address.zipcode}
            variant="outlined"
            onChange={(e) =>
              setUser({
                ...user,
                address: { ...user.address, zipcode: e.target.value },
              })
            }
          />
        </div>
      )}
      <div>
        <Button
          onClick={() => updateUser(user.id, user)}
          variant="contained"
          color="success"
          startIcon={<UpdateIcon />}
          size="small"
        >
          Update
        </Button>
        <Button
          onClick={() => deleteUser(user.id)}
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          size="small"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired,
  filteredSearch: PropTypes.string.isRequired,
  deleteUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number,
  setSelectedUserId: PropTypes.func.isRequired,
  todos: PropTypes.array.isRequired,
};

export default User;
