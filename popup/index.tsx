import * as React from "react";
import { DialogStyled } from "./dialog.styles";
import { Core } from "..";
import { DialogContent, Stack } from "@mui/material";
import { PopupEnhance as Ui } from "./enhance";

export class PopupDocument {
  title: React.ReactNode = "";
  text: React.ReactNode = "";
  icon: React.ReactNode = "";
  value: string = "";
  type: "alert" | "confirm" | "prompt" | "remove" = "alert";
  onConfirm: (value: string) => void = () => {};
  onAbort: () => void = () => {};

  constructor(data?: Partial<PopupDocument>) {
    Object.assign(this, data);
  }
}

export const Popup = () => {
  const {
    state: { popup },
    dispatch,
  } = Core.useCore();
  const [open, setOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>("");

  React.useEffect(() => {
    if (popup) {
      setOpen(true);
      setValue(popup.value);
    }
  }, [popup]);

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);
  const handleConfirm = () => {
    setOpen(false);
    popup?.onConfirm(value);
  };
  const handleAbort = () => {
    setOpen(false);
    popup?.onAbort();
  };

  return (
    <DialogStyled
      open={open}
      onClose={handleAbort}
      TransitionProps={{
        onExited: () => {
          dispatch({ type: "popup", value: null });
        },
      }}
    >
      <DialogContent>
        <Ui.ContentCenter>
          {popup?.icon &&
            React.cloneElement(popup.icon as any, { sx: { fontSize: "3rem" } })}
          <Ui.Title variant="h6" fontWeight={"bold"} sx={{ mt: 2, mb: 1 }}>
            {popup?.title}
          </Ui.Title>
          {popup?.type === "prompt" ? (
            <Ui.TextField
              label={popup.text}
              value={value}
              onChange={handleChangeValue}
              onKeyDown={(e) => {
                if (e.key === "Enter" && popup.value) {
                  e.preventDefault();
                  handleConfirm();
                }
              }}
            />
          ) : (
            <Ui.Text>{popup?.text}</Ui.Text>
          )}
        </Ui.ContentCenter>
        <Stack spacing={0.5}>
          {((type?: PopupDocument["type"]) => {
            switch (type) {
              case "confirm":
                return (
                  <React.Fragment>
                    <Ui.Button variant="contained" onClick={handleConfirm}>
                      {"Confirm"}
                    </Ui.Button>
                    <Ui.Button onClick={handleAbort}>{"Cancel"}</Ui.Button>
                  </React.Fragment>
                );
              case "prompt":
                return (
                  <React.Fragment>
                    <Ui.Button variant="contained" onClick={handleConfirm}>
                      {"Confirm"}
                    </Ui.Button>
                    <Ui.Button onClick={handleAbort}>{"Cancel"}</Ui.Button>
                  </React.Fragment>
                );
              case "remove":
                return (
                  <React.Fragment>
                    <Ui.Button
                      variant="contained"
                      onClick={handleConfirm}
                      color="error"
                    >
                      {"Remove"}
                    </Ui.Button>
                    <Ui.Button onClick={handleAbort}>{"Cancel"}</Ui.Button>
                  </React.Fragment>
                );
              default:
                return <Ui.Button onClick={handleAbort}>{"Close"}</Ui.Button>;
            }
          })(popup?.type)}
        </Stack>
      </DialogContent>
    </DialogStyled>
  );
};
