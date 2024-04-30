import { createContext, useReducer } from "react";

interface StoreProviderProps {
  children: React.ReactNode;
}

const initialState = {
  username: "",
  email: "",
  token: "",
};

export type StoreAction =
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
  switch (type) {
    case "LOGIN":
      return { ...state, ...payload };
    case "LOGOUT":
      return { ...initialState };
    default:
      return state;
  }
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
};
