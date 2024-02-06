import { Breakpoint } from "@mui/material";
import { createContext, useContext } from "react";
import { RestrictProps } from "./restrict";
import { Core } from "..";

export interface MainContainerProps {
  children?: React.ReactNode;
  loading?: boolean;
  restrict?: boolean;
  restrictProps?: RestrictProps;
  dense?: boolean;
  sidebar?: React.ReactNode;
  rightbar?: React.ReactNode;
  signInOnly?: boolean;
  maxWidth?: Breakpoint;
  // PROFILE
  profileMenu?: React.ReactNode;
  startActions?: React.ReactNode;
  endActions?: React.ReactNode;
  disableSidebarPadding?: boolean;
  title?: string
  //ANCHOR - logo
  overrideLogo?: string;
}
export type MCContextTypes = MainContainerProps & {
  open: {
    sidebar: boolean;
    setting: boolean;
    signin: boolean;
  };
  handleOpen: (key: string, open: boolean) => () => void;
  state: {
    anchorProfile: Element | null;
  };
  setState: React.Dispatch<React.SetStateAction<MCContextTypes["state"]>>;
  user: Core.State["user"];
};

export const MCContext = createContext<MCContextTypes>({
  children: null,
  user: "loading",
  dense: false,
  open: {
    sidebar: true,
    setting: false,
    signin: false,
  },
  handleOpen: () => () => {},
  state: {
    anchorProfile: null,
  },
  setState: (data) => data,
});

export const useMC = () => useContext(MCContext);
