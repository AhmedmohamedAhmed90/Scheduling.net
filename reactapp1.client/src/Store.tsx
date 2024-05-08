import { createContext, useReducer } from "react";

interface StoreProviderProps {
  children: React.ReactNode;
}

const userInfo = JSON.parse(localStorage.getItem("userInfo")!);

const initialState = {
  username: userInfo?.username ? (userInfo.username as string) : "",
  email: userInfo?.email ? (userInfo.email as string) : "",
  token: userInfo?.token ? (userInfo.token as string) : "",
  universityID: userInfo?.universityID ? (userInfo.universityID as number) : 0,
  facultyID: userInfo?.facultyID ? (userInfo.facultyID as number) : 0,
};

export type StoreAction =
  | {
      type: "SET_UNIVERSITYID";
      payload: number;
    }
  | {
      type: "SET_FACULTYID";
      payload: number;
    }
  | {
      type: "LOGIN";
      payload: typeof initialState;
    }
  | {
      type: "LOGOUT";
      payload: undefined;
    };

export const Store = createContext<{
  state: typeof initialState;
  dispatch: React.Dispatch<StoreAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

function reducer(state: typeof initialState, { type, payload }: StoreAction) {
  let newState = state; // Use newState to handle state updates

  switch (type) {
    case "SET_UNIVERSITYID":
      newState = { ...state, universityID: payload };
      break;
    case "SET_FACULTYID":
      newState = { ...state, facultyID: payload };
      break;
    case "LOGIN":
      newState = { ...state, ...payload };
      break;
    case "LOGOUT":
      newState = { ...initialState };
      break;
    default:
      newState = state;
  }
  localStorage.setItem("userInfo", JSON.stringify(newState));
  return newState;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
};
