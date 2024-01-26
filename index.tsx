"use client";
import {
  ComponentType,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { FirebaseApp } from "firebase/app";
import { Auth, User, getAuth, onAuthStateChanged } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { AlertDocument, Alerts } from "./alerts";
import { Popup, PopupDocument } from "./popup";
import { grey } from "@mui/material/colors";

declare module "@mui/material/styles/createMixins" {
  interface Mixins {
    sidebar: CSSProperties;
    absoluteFluid: CSSProperties;
    flexMiddle: CSSProperties;
  }
}

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    neutral: Palette["primary"];
  }
  interface PaletteOptions {
    neutral: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {
    neutral: true;
  }
}

export * from "./action.icon";
export * from "./main.container";
export * from "./popup";
export * from "./table.grid";

// SECTION - Core
export namespace Core {
  // ANCHOR - State
  export type StateAction =
    | { type: "dark"; value: boolean }
    | { type: "app"; value: FirebaseApp }
    | { type: "user"; value: User | null }
    | { type: "alert/add"; value: Partial<AlertDocument> }
    | { type: "alert/error"; value: string }
    | { type: "alert/remove"; value: string }
    | { type: "popup"; value: Partial<PopupDocument> | null };
  export class State {
    app: FirebaseApp | null = null;
    auth: Auth | null = null;
    db: Firestore | null = null;

    sitename: string = "";
    logo: ReactNode = null;
    profileMenu: ReactNode = null;
    startActions: ReactNode = null;
    endActions: ReactNode = null;

    user: "loading" | User | null = "loading";
    alerts: AlertDocument[] = [];
    popup: PopupDocument | null = null;
    dark: boolean = false;

    constructor(data?: Partial<State>) {
      Object.assign(this, data);
    }

    Set<T extends keyof State>(key: T, value: State[T]): State {
      return new State({ ...this, [key]: value });
    }

    Alert() {
      return {
        add: (item: Partial<AlertDocument>): State => {
          return this.Set("alerts", [...this.alerts, new AlertDocument(item)]);
        },
        remove: (key: string): State => {
          return this.Set(
            "alerts",
            this.alerts.filter((item) => item.key !== key)
          );
        },
      };
    }

    User() {
      return {
        loaded: () => this.user !== "loading",
        loggedIn: () => this.user !== "loading" && this.user !== null,
        get: (): User => {
          if (this.user === "loading") {
            throw new Error("User not loaded");
          }
          if (this.user === null) {
            throw new Error("User not logged in");
          }
          return this.user;
        },
      };
    }

    static reducer(s: State, a: StateAction): State {
      switch (a.type) {
        case "dark":
          return s.Set("dark", a.value);
        case "app":
          return s
            .Set("app", a.value)
            .Set("auth", getAuth(a.value))
            .Set("db", getFirestore(a.value));
        case "user":
          return s.Set("user", a.value);
        case "alert/add":
          return s.Alert().add(a.value);
        case "alert/error":
          return s.Alert().add({ label: a.value, severity: "error" });
        case "alert/remove":
          return s.Alert().remove(a.value);
        case "popup":
          return s.Set("popup", a.value ? new PopupDocument(a.value) : null);
        default:
          return s;
      }
    }

    static watchDark(callback: (value: boolean) => void): () => void {
      const listener = (e: MediaQueryListEvent) => callback(e.matches);
      const mql = window.matchMedia("(prefers-color-scheme: dark)");
      mql.addEventListener("change", listener);
      callback(mql.matches);
      return () => mql.removeEventListener("change", listener);
    }
  }

  // ANCHOR - Context
  export type ContextValue = {
    state: State;
    dispatch: React.Dispatch<StateAction>;
    mobile: boolean;
  };
  const Context = createContext<ContextValue>({
    state: new State(),
    dispatch: () => {},
    mobile: false,
  });
  export const useCore = () => useContext(Context);

  // ANCHOR - connect
  export const connect =
    <T extends ContextValue = ContextValue>(
      Comp: ComponentType<T>,
      app: FirebaseApp
    ) =>
    (props: T) => {
      const [state, dispatch] = useReducer(State.reducer, new State());
      const mobile = useMediaQuery("(max-width: 768px)");

      useEffect(() => {
        dispatch({ type: "app", value: app });
        const unwatchdark = State.watchDark((value) => {
          dispatch({ type: "dark", value });
        });
        const unwatchuser = onAuthStateChanged(getAuth(app), (user) =>
          dispatch({ type: "user", value: user })
        );
        return () => {
          unwatchdark();
          unwatchuser();
        };
      }, [app]);

      return (
        <Context.Provider value={{ state, dispatch, mobile }}>
          <ThemeProvider
            theme={createTheme({
              palette: {
                primary: {
                  // google blue
                  main: "#4285f4",
                },
                success: {
                  // google green
                  main: "#34a853",
                },
                error: {
                  // google red
                  main: "#ea4335",
                },
                warning: {
                  // google yellow
                  main: "#fbbc05",
                },
                info: {
                  // google blue
                  main: "#4285f4",
                },
                neutral: { main: grey[500] },
                mode: state.dark ? "dark" : "light",
              },
              mixins: {
                sidebar: {
                  width: 272,
                },
                absoluteFluid: {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                },
                flexMiddle: {
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                },
              },
            })}
          >
            <CssBaseline />
            <Comp {...props} state={state} dispatch={dispatch} />
            <Alerts />
            <Popup />
          </ThemeProvider>
        </Context.Provider>
      );
    };
}
// !SECTION

// SECTION - utils
export namespace utils {
  export const validateEmail = (email: string): boolean => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
}
