import { createContext, useState } from "react";

type ComponentWithChildProps = React.PropsWithChildren<{example?: string}>;

const AuthContext = createContext({});

export const AuthProvider = ({ children }:ComponentWithChildProps) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;