import { useState, useEffect } from "react";
import RegisterForm from "../components/registerForm";

const Register = () => {
  const [isJumpscared, setIsJumpscared] = useState<boolean>(false);

  useEffect(() => {
    // Ensure the Egg library is loaded before using it
    if (window.Egg) {
      const egg = new window.Egg();
      egg.addCode("m,b,a,t,r,e,s,@,u,t,c,h,.,e,d,u,.,m,x", () => {
        setIsJumpscared(true);
        const t = setTimeout(() => {
          setIsJumpscared(false);
        }, 5000); // Display the jumpscare for 1 second
        return () => clearTimeout(t);
      });
      egg.listen();
    }
  }, []);
  return (
    <>
      <div className="w-screen h-screen bg-neutral-700 flex justify-center items-center">
        {isJumpscared && (
          <div className="jumpscare-container">
            <div className="jumpscare-content"></div>
          </div>
        )}
        <RegisterForm />
      </div>
    </>
  );
};

export default Register;
