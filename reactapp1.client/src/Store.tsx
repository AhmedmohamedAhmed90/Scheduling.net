import { createContext, useReducer } from "react";
import { Course } from "./services/courseService";
import { CourseMultiSelect } from "./utils/utils";
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
  tableIndex: userInfo?.tableIndex ? (userInfo.tableIndex as number) : 0,
  selectedSuggestedCourses: userInfo?.selectedSuggestedCourses
    ? (userInfo?.selectedSuggestedCourses as CourseMultiSelect[])
    : [],
  suggestedCourses: userInfo?.suggestedCourses
    ? (userInfo.suggestedCourses as Course[][])
    : [],
};

export type StoreAction =
  | {
      type: "SET_UNIVERSITYID";
      payload: number;
    }
  | {
      type: "SET_TABLEINDEX";
      payload: number;
    }
  | {
      type: "INCREMENT_TABLEINDEX";
      payload: undefined;
    }
  | {
      type: "DECREMENT_TABLEINDEX";
      payload: undefined;
    }
  | {
      type: "SET_SELECTED_SUGGESTED_COURSES";
      payload: CourseMultiSelect[];
    }
  | {
      type: "SET_SUGGESTED_COURSES";
      payload: Course[][];
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
    case "SET_TABLEINDEX":
      newState = { ...state, tableIndex: payload };
      break;
    case "SET_SELECTED_SUGGESTED_COURSES":
      newState = { ...state, selectedSuggestedCourses: payload };
      break;
    case "INCREMENT_TABLEINDEX":
      if (state.tableIndex < state.suggestedCourses.length - 1) {
        newState = { ...state, tableIndex: state.tableIndex + 1 };
      }
      break;
    case "DECREMENT_TABLEINDEX":
      if (state.tableIndex > 0) {
        newState = { ...state, tableIndex: state.tableIndex - 1 };
      }
      break;
    case "SET_UNIVERSITYID":
      newState = { ...state, universityID: payload };
      break;
    case "SET_FACULTYID":
      newState = { ...state, facultyID: payload };
      break;
    case "LOGIN":
      newState = { ...state, ...payload };
      break;
    case "SET_SUGGESTED_COURSES":
      newState = { ...state, suggestedCourses: payload };
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
