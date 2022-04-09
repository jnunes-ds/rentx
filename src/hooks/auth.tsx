import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import axios from 'axios';
import api from '../services/api';

import { database } from '../database';
import { User as ModelUser } from '../database/models/User';

interface User {
  id: string;
  user_id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
  token: string;
}

type UserWithoutToken = Omit<User, 'token'>;

interface ApiResponse {
  user: UserWithoutToken;
  token: string;
}

interface SingInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  // eslint-disable-next-line no-unused-vars
  singIn(credentials: SingInCredentials): Promise<void>;
  SingOut(): Promise<void>;
  // eslint-disable-next-line no-unused-vars
  updateUser(user: User): Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<User>({} as User);

  async function singIn({ email, password }: SingInCredentials) {
    try {
      console.log(`
        Email: ${email};
        Password:${password};
        Api: ${api.defaults.baseURL}
      `);
      const response = await api.post('/sessions', { email, password });
      if (response) {
        const { token, user } = (await response.data) as ApiResponse;

        api.defaults.headers.authorization = `Bearer ${token}`;

        const avatar = user.avatar != null ? user.avatar : '';

        const userCollection = await database.get<ModelUser>('users');
        await database.write(async () => {
          await userCollection.create(newUser => {
            newUser.user_id = user.id;
            newUser.name = user.name;
            newUser.email = user.email;
            newUser.driver_license = user.driver_license;
            newUser.avatar = avatar;
            newUser.token = token;
          });
        });

        setData({ ...user, token });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function SingOut() {
    try {
      const userCollection = database.get<ModelUser>('users');
      await database.write(async () => {
        const userSelected = await userCollection.find(data.id);
        await userSelected.destroyPermanently();
      });

      setData({} as User);
    } catch (error) {
      const e = String(error);
      throw new Error(e);
    }
  }

  async function updateUser(user: User) {
    try {
      const userCollection = database.get<ModelUser>('users');
      await database.write(async () => {
        const userSelected = await userCollection.find(user.id);
        await userSelected.update(userData => {
          userData.name = user.name;
          userData.driver_license = user.driver_license;
          userData.avatar = user.avatar;
        });
      });

      setData(user);
    } catch (error) {
      const e = error as unknown as string;
      throw new Error(e);
    }
  }

  useEffect(() => {
    async function loadUserData() {
      const userCollection = database.get<ModelUser>('users');
      const response = await userCollection.query().fetch();

      if (response.length > 0) {
        const userData = response[response.length - 1]._raw as unknown as User;
        api.defaults.headers.authorization = `Bearer ${userData.token}`;
        setData(userData);
      }
    }

    loadUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ user: data, singIn, SingOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
