import React, {createContext} from 'react';

export interface UserData {
    id: string;
    name: string;
    email: string;
    password: string;
    token: string;
};

export interface UserContext {
    user: UserData | null;
    setUser: (user: UserData | null) => void;
}

export interface AuthProviderProps {
    children: React.ReactNode;
}

const usertest: UserData = {
    id: '',
    name: '',
    email: '',
    password: '',
    token: ''
}

export const AuthContext = createContext<UserContext>({
    setUser(user: UserData | null): void {
    }, user: null
});

// export const AuthProvider = ({children}: AuthProviderProps) => {
//     const usertest: UserData = {
//         id: '',
//         name: '',
//         email: '',
//         password: '',
//         token: ''
//     }
//     const [user, setUser] = useState<UserData | null>(usertest);
//
//     return (
//         <AuthContext.Provider value={{user, setUser}}>
//             {children}
//         </AuthContext.Provider>
//     );
// };


