import {
  Box,
  Breakpoint,
  Dialog,
  DialogActions,
  DialogActionsProps,
  DialogContent,
  DialogContentProps,
  DialogProps,
  DialogTitle,
  Grow,
  styled,
  Typography,
} from "@mui/material";
import * as React from "react";
import { PreButton } from "../pre.button";

const DialogStyled = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root:not(.MuiDialog-paperFullScreen)": {
    borderRadius: 24,
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(0, 2, 2),
  },
}));
DialogStyled.defaultProps = {
  TransitionComponent: Grow,
};

const DialogTitleStyled = styled(DialogTitle)(({ theme }) => ({
  padding: theme.spacing(3, 2, 2),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
}));
const DialogContentStyled = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(2),
  paddingTop: theme.spacing(1) + "!important",
  marginTop: theme.spacing(-1),
}));

const TitleStyled = styled(Box)({
  display: "flex",
  justifyContent: "center",
  width: "100%",
});

export type DialogCompactProps = {
  open: boolean;
  maxWidth?: Breakpoint | false;
  icon?: React.ReactNode;

  title?: React.ReactNode;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  onClose?: () => void;
  componentProps?: {
    dialog?: Omit<DialogProps, "open" | "maxWidth" | "children">;
    dialogContent?: Omit<DialogContentProps, "children">;
    dialogActions?: Omit<DialogActionsProps, "children">;
  };

  hideCloseButton?: boolean;
};

export const DialogCompact = (props: DialogCompactProps) => {
  return (
    <DialogStyled
      fullWidth
      maxWidth={props.maxWidth || "xs"}
      open={props.open}
      onClose={props.onClose}
      TransitionComponent={Grow}
      {...props.componentProps?.dialog}
    >
      <DialogTitleStyled>
        {props.icon && (
          <Typography variant="h4" component="div" sx={{ mb: 2 }}>
            {React.cloneElement(props.icon as any, {
              fontSize: "inherit",
            })}
          </Typography>
        )}
        <TitleStyled>{props.title}</TitleStyled>
      </DialogTitleStyled>
      <DialogContentStyled {...props.componentProps?.dialogContent}>
        {props.children}
      </DialogContentStyled>
      <DialogActions {...props.componentProps?.dialogActions}>
        {props.actions}
        {Boolean(props.hideCloseButton) === false && (
          <PreButton.Close onClick={props.onClose} />
        )}
      </DialogActions>
    </DialogStyled>
  );
};
