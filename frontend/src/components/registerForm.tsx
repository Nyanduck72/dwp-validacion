import { useState, useEffect } from "react";
import type { User } from "../types";
import { Eye, EyeOff } from "lucide-react";
import { createUser } from "../service/endpoints";

const RegisterForm = () => {
  // Register form states
  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [lengthError, setLengthError] = useState<boolean>(true);
  const [upperCaseError, setUpperCaseError] = useState<boolean>(true);
  const [numberError, setNumberError] = useState<boolean>(true);
  const [revealPassword, setRevealPassword] = useState<boolean>(false);
  const [revealConfirmPassword, setRevealConfirmPassword] =
    useState<boolean>(false);

  // useEffect for password requirements handling
  useEffect(() => {
    if (password.length >= 8) {
      setLengthError(false);
    } else {
      setLengthError(true);
    }
    if (password.match(/[A-Z]/)) {
      setUpperCaseError(false);
    } else {
      setUpperCaseError(true);
    }
    if (password.match(/[0-9]/)) {
      setNumberError(false);
    } else {
      setNumberError(true);
    }
  }, [password]);

  // useEffect for email validation
  useEffect(() => {
    if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  }, [email]);

  const exportUser = (name: string, email: string, password: string) => {
    const user: User = {
      username: name,
      email: email,
      password: password,
    };
    createUser(user).catch((error) => console.error(error));
  };

  return (
    <>
      <div className="w-1/3 p-4 rounded-lg bg-neutral-50 shadow-lg">
        <h1 className="text-2xl font-bold text-neutral-900 text-center">
          Registrate
        </h1>
        <div className="mb-4">
          <label htmlFor="name" className="block text-neutral-900">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-blue-600"
            onChange={(e) => {
              if (
                e.target.value.match(/^[a-zA-Z0-9_]+$/) &&
                e.target.value.length < 31
              ) {
                setNameError ? setNameError(false) : null;
                setName(e.target.value);
              } else {
                setNameError(true);
              }
            }}
          />
          {nameError && name !== "" && (
            <p className="text-red-500">Nombre inválido</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-neutral-900">
            Correo
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-blue-600"
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && email !== "" && (
            <p className="text-red-500">Correo inválido</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-neutral-900">
            Contraseña
          </label>
          <div className="flex items-center justify-between">
            <input
              type={revealPassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-80 p-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-blue-600"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="w-1/6 p-2 rounded-lg flex items-center justify-center"
              onClick={(e) => {
                e.preventDefault();
                setRevealPassword(!revealPassword);
              }}
            >
              {revealPassword ? <EyeOff size={24} /> : <Eye size={24} />}
            </button>
          </div>
        </div>
        <div className="mb-4">
          <ul className="list-disc list-inside text-neutral-900">
            <li className={lengthError ? "" : "text-green-500"}>
              Al menos 8 caracteres
            </li>
            <li className={upperCaseError ? "" : "text-green-500"}>
              Al menos una mayúscula
            </li>
            <li className={numberError ? "" : "text-green-500"}>
              Al menos un número
            </li>
          </ul>
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-neutral-900">
            Confirmar Contraseña
          </label>
          <div className="flex items-center justify-between">
            <input
              type={revealConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              className="w-80 p-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-blue-600"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              className="w-1/6 p-2 rounded-lg flex items-center justify-center"
              onClick={(e) => {
                e.preventDefault();
                setRevealConfirmPassword(!revealConfirmPassword);
              }}
            >
              {revealConfirmPassword ? <EyeOff size={24} /> : <Eye size={24} />}
            </button>
          </div>
          {confirmPassword !== password && (
            <p className="text-red-500">Las contraseñas no coinciden</p>
          )}
        </div>
        <div className="mt-4">
          <button
            className="w-full text-neutral-50 font-bold h-16 p-2 bg-blue-600 rounded-lg hover:bg-blue-500"
            onClick={(e) => {
              if (
                name === "" ||
                emailError ||
                numberError ||
                upperCaseError ||
                lengthError ||
                password !== confirmPassword
              ) {
                e.preventDefault();
                return;
              } else {
                e.preventDefault();
                exportUser(name, email, password);
              }
            }}
          >
            Registrar Usuario
          </button>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
