import { useEffect, useState } from 'react';
import usePrivateAxios from '../../hooks/usePrivateAxios';
import { roles } from '../../utils/utils';

function Roles() {
  const privateAxios = usePrivateAxios();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await privateAxios({ method: 'GET', url: '/manager/get-all-users' });
        setUsers(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    getUsers();
  }, [privateAxios]);

  return (
    <section>
      <h1 className="mb-2">Roles</h1>
      <div className="flex flex-col gap-3">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </section>
  );
}

export default Roles;

function UserCard({ user }) {
  const privateAxios = usePrivateAxios();

  function updateRole(roles) {
    try {
      privateAxios({
        method: 'PUT',
        url: '/manager/update-user-roles',
        data: { id: user.id, roles: roles },
      });
    } catch (error) {
      console.error(error);
    }
  }

  function makeManager() {
    updateRole([
      { name: roles.manager, isSelected: true },
      { name: roles.moderator, isSelected: true },
      { name: roles.sales, isSelected: true },
    ]);
  }

  function makeModerator() {
    updateRole([
      { name: roles.manager, isSelected: false },
      { name: roles.moderator, isSelected: true },
      { name: roles.sales, isSelected: true },
    ]);
  }

  function makeSales() {
    updateRole([
      { name: roles.manager, isSelected: false },
      { name: roles.moderator, isSelected: false },
      { name: roles.sales, isSelected: true },
    ]);
  }

  function revokeRole() {
    updateRole([
      { name: roles.manager, isSelected: false },
      { name: roles.moderator, isSelected: false },
      { name: roles.sales, isSelected: false },
    ]);
  }

  return (
    <div className="flex flex-col gap-2 bg-pro-50 p-4 shadow">
      <span>
        Name: {user.firstName} {user.lastName}
      </span>
      <span>Username: {user.username}</span>
      <span>Email: {user.email}</span>
      <span>{JSON.stringify(user.roles)}</span>
      <div className="flex flex-wrap gap-2">
        <button className="btn-primary px-4 py-2" onClick={makeManager}>
          Make a Manger
        </button>
        <button className="btn-primary px-4 py-2" onClick={makeModerator}>
          Make a Moderator
        </button>
        <button className="btn-primary px-4 py-2" onClick={makeSales}>
          Make a Sales
        </button>
        <button className="btn-primary px-4 py-2" onClick={revokeRole}>
          Revoke Role
        </button>
      </div>
    </div>
  );
}
