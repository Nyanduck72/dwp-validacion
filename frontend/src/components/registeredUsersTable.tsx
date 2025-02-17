import { useState } from "react";
import { getUserById } from "../service/endpoints";
import { User } from "../types";
import { Link } from "wouter";

const RegisteredUsersTable = () => {
  const [id, setId] = useState<number>(1);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const buscarUsuario = (id: number) => {
    getUserById(id)
      .then((user) => {
        setUser(user);
        setError(null);
      })
      .catch((err) => {
        if (err.message === "404") {
          setError("Ese ID de usuario no existe");
          setUser(null);
        } else {
          setError("Un error ocurrio al buscar el usuario");
        }
      });
  };

  return (
    <>
      <div className="w-2/3 bg-white p-4 rounded-lg shadow-lg">
        <h1 className="mb-4 text-4xl text-center font-bold">
          USUARIOS REGISTRADOS
        </h1>
        <hr />
        <h2 className="text-2xl font-bold">Buscar usuario</h2>
        <input
          className="border border-gray-400 w-24 mr-8 p-2 rounded-lg"
          type="number"
          value={id}
          onChange={(e) => setId(Number(e.target.value))}
          placeholder="ID"
          min={1}
        />
        <button
          className="border border-gray-400 w-32 p-2 text-center rounded-lg"
          onClick={() => buscarUsuario(id)}
        >
          Buscar usuario
        </button>
        {error && <p className="text-red-500">{error}</p>}
        <table className="w-full mt-4 text-center border-collapse border border-gray-400">
          <thead className="bg-gray-200">
            <tr>
              <th className="border-r-1 border-r-gray-400">ID</th>
              <th className="border-r-1 border-r-gray-400">Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {user ? (
              <tr>
                <td className="border-r-1 border-r-gray-400">{id}</td>
                <td className="border-r-1 border-r-gray-400">
                  {user.username}
                </td>
                <td>{user.email}</td>
              </tr>
            ) : (
              <tr>
                <td colSpan={3}>No se encontró el usuario</td>
              </tr>
            )}
          </tbody>
        </table>
        <Link href="/">
            <button className="w-48 mt-6 border border-gray-400 rounded-lg p-2 hover:cursor-pointer">Registrar un usuario</button>
        </Link>
      </div>
    </>
  );
};

export default RegisteredUsersTable;
