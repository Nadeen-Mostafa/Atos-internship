import react, { useState, useEffect, useRef } from "react";
import Keycloak from 'keycloak-js';

const client = new Keycloak({
  url: process.env.REACT_APP_KEYCLOAK_URL,
  realm: process.env.REACT_APP_KEYCLOAK_REALM,
  clientId: process.env.REACT_APP_KEYCLOAK_CLIENT,
});

function UserAuth() {
  const isRun = useRef(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    try {
      if (isRun.current) return;
      isRun.current = true;
      client.init({ onLoad: "login-required" }).then((res) => setIsLogin(res))
      
    }
    catch (err) {
      console.log(err);
    }
  }, [])
  return (
    isLogin
  );
}

export default UserAuth;