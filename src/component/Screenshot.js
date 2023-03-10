import React, { createRef, useState,useRef } from 'react'
import { useScreenshot } from 'use-react-screenshot'

const Screenshot=()=>{
    const ref = createRef(null)
  const [image, takeScreenshot] = useScreenshot()
  const getImage = () => takeScreenshot(ref.current)
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [users, setUsers] = useState([]);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newUser = { name: name, age: age };
    setUsers([...users, newUser]);
    setName("");
    setAge("");
  };

  const handleDelete = (index) => {
    const updatedUsers = users.filter((user, i) => i !== index);
    setUsers(updatedUsers);
  };
  const handleDragStart = (event) => {
    const button = buttonRef.current;
    const buttonRect = button.getBoundingClientRect();
    const offsetX = event.clientX - buttonRect.left;
    const offsetY = event.clientY - buttonRect.top;

    const handleMouseMove = (event) => {
      const newX = event.clientX - offsetX;
      const newY = event.clientY - offsetY;
      setPosition({ x: newX, y: newY });
    };

    document.addEventListener("mousemove", handleMouseMove);

    document.addEventListener(
      "mouseup",
      () => {
        document.removeEventListener("mousemove", handleMouseMove);
      },
      { once: true }
    );
  };
  return (
    <div>
      <div>
      <button
        ref={buttonRef}
        style={{ position: "absolute", top: position.y, left: position.x }}
        onMouseDown={handleDragStart} onDoubleClick={getImage}
      >
        Take Screenshot
      </button>
    </div>
      <img  src={image}  />
      <div ref={ref}>
      <h1>User Management System</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Age:
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        </label>
        <br />
        <button type="submit">Add User</button>
      </form>
      <br />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}
export default Screenshot;