import { use } from "react";
import { AuthContent } from "../provider/authContent";


const useAuth = () => {
  const authInfo =  use(AuthContent);
  return authInfo;

};

export default useAuth;