import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminGuard = ({ children }) => {
  const [authorized, setAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const clave = prompt("🔒 Ingrese la clave de administrador:");
    if (clave === "alvaroGio_2025") {
      setAuthorized(true);
    } else {
      alert("Clave incorrecta ❌");
      navigate("/"); 
    }
  }, []);

  if (!authorized) return null; 

  return children;
};

export default AdminGuard;
