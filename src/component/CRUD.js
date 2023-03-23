import React, { useState } from 'react';

function CRUD() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: Date.now(),
      name,
      email,
      phone
    };
    setUsers([...users, newUser]);
    setName('');
    setEmail('');
    setPhone('');
  };

  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  const handleUpdate = (id, newName, newEmail, newPhone) => {
    const updatedUsers = users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          name: newName,
          email: newEmail,
          phone: newPhone
        };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  return (
    <div>
      <h1>Users List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type="submit">Add User</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                <input
                  type="text"
                  defaultValue={user.name}
                  onChange={(e) =>
                    handleUpdate(user.id, e.target.value, user.email, user.phone)
                  }
                />
              </td>
              <td>
                <input
                  type="email"
                  defaultValue={user.email}
                  onChange={(e) =>
                    handleUpdate(user.id, user.name, e.target.value, user.phone)
                  }
                />
              </td>
              <td>
                <input
                  type="tel"
                  defaultValue={user.phone}
                  onChange={(e) =>
                    handleUpdate(user.id, user.name, user.email, e.target.value)
                  }
                />
              </td>
              <td>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CRUD;