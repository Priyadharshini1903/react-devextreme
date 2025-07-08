// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import DataGrid, { Column } from 'devextreme-react/data-grid';
import { Popup } from 'devextreme-react/popup';
import { TextBox } from 'devextreme-react/text-box';
import Button from 'devextreme-react/button';
import 'devextreme/dist/css/dx.light.css';
import './UserList.css';

function UserList() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState({ username: '', email: '' });
  const [popupVisible, setPopupVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [originalEmail, setOriginalEmail] = useState(null); // to track which user is being edited

  // Load users from localStorage when page loads
  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(savedUsers);
  }, []);

  // Save updated users back to localStorage
  const updateStorage = (updatedUsers) => {
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  // Open popup to add a new user
  const handleAddClick = () => {
    setEditUser({ username: '', email: '' });
    setIsEditMode(false);
    setOriginalEmail(null);
    setPopupVisible(true);
  };

  // Open popup to edit an existing user
  const handleEditClick = (user) => {
    setEditUser({ ...user });
    setOriginalEmail(user.email); // used to find and replace exact user
    setIsEditMode(true);
    setPopupVisible(true);
  };

  // Delete user based on email
  const handleDeleteClick = (email) => {
    const updatedUsers = users.filter((u) => u.email !== email);
    updateStorage(updatedUsers);
  };

  // Save user from popup (add or update)
  const handleSaveUser = () => {
    const { username, email } = editUser;

    if (!username || !email) {
      alert('Both username and email are required.');
      return;
    }

    let updatedUsers;

    if (isEditMode) {
      // Update existing user
      updatedUsers = users.map((u) =>
        u.email === originalEmail ? editUser : u
      );
    } else {
      // Add new user, prevent duplicates
      if (users.some((u) => u.email === email)) {
        alert('User with this email already exists.');
        return;
      }
      updatedUsers = [...users, editUser];
    }

    updateStorage(updatedUsers);
    setPopupVisible(false);
  };

  return (
    <div className="userlist-container">
      <h2>User List</h2>

      <div style={{ marginBottom: 20 }}>
        <Button text="Add User" type="success" onClick={handleAddClick} />
      </div>

      <DataGrid dataSource={users} keyExpr="email" showBorders={true}>
        <Column dataField="username" caption="Username" />
        <Column dataField="email" caption="Email" />
        <Column
          caption="Actions"
          cellRender={({ data }) => (
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button text="Edit" onClick={() => handleEditClick(data)} />
              <Button text="Delete" onClick={() => handleDeleteClick(data.email)} />
            </div>
          )}
        />
      </DataGrid>

      {/* Add/Edit Popup */}
      <Popup
        visible={popupVisible}
        onHiding={() => setPopupVisible(false)}
        title={isEditMode ? 'Edit User' : 'Add User'}
        showTitle={true}
        width={400}
        height={300}
      >
        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 15 }}>
          <TextBox
            placeholder="Username"
            value={editUser.username}
            onValueChanged={(e) =>
              setEditUser((prev) => ({ ...prev, username: e.value }))
            }
          />
          <TextBox
            placeholder="Email"
            value={editUser.email}
            onValueChanged={(e) =>
              setEditUser((prev) => ({ ...prev, email: e.value }))
            }
          />
          <Button
            text={isEditMode ? 'Update' : 'Add'}
            type="default"
            onClick={handleSaveUser}
          />
        </div>
      </Popup>
    </div>
  );
}

export default UserList;
