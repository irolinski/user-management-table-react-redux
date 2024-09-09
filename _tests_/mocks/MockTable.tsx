import React from "react";
import User from "../../src/models/User";

const MockTable = ({ users }: { users: User[] }) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Username</th>
        <th>Email</th>
        <th>Phone</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user, index) => (
        <tr key={index} className="users-row">
          <td>{user.name}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default MockTable;
