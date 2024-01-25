import { Alert, AlertProps, Box, Snackbar, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { Core } from "..";

export class AlertDocument {
  key: string = "";
  label: React.ReactNode = "";
  severity: AlertProps["severity"] = "success";

  constructor(data?: Partial<AlertDocument>) {
    Object.assign(this, data);
    if (!this.key) this.key = AlertDocument.genKey();
  }

  static genKey(): string {
    return Math.random().toString(36).substring(2, 9);
  }
}

const AlertIitem = ({ value }: { value: AlertDocument }) => {
  const { dispatch } = Core.useCore();

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: "alert/remove", value: value.key });
    }, 5000);
  }, [dispatch, value.key]);

  return (
    <Alert
      variant="filled"
      severity={value.severity}
      onClose={() => dispatch({ type: "alert/remove", value: value.key })}
    >
      {value.label}
    </Alert>
  );
};

export const Alerts = () => {
  const {
    state: { alerts },
  } = Core.useCore();

  return (
    <Snackbar
      open={Boolean(alerts.length)}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Box>
        <Stack spacing={1}>
          {alerts.map((item) => (
            <AlertIitem value={item} key={item.key} />
          ))}
        </Stack>
      </Box>
    </Snackbar>
  );
};
