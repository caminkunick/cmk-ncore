import { Dialog, DialogProps, Grow, styled } from "@mui/material";

export const DialogStyled = styled((props: DialogProps) => (
  <Dialog
    fullWidth
    maxWidth="xs"
    TransitionComponent={Grow}
    sx={{
      "& .MuiDialog-paper": { maxWidth: 360, borderRadius: "1.5rem" },
      "& .MuiDialogContent-root": {
        padding: "1.5rem 1rem 1rem",
      },
    }}
    {...props}
  />
))({});