import { Box, Button } from "@mui/material";
import { useSP } from "./context";
import { Fragment } from "react";
import { Core } from "..";
import { Link } from "@mui/icons-material";
import { StockImageDocument } from ".";

export const FromURL = (props: {
  onConfirm: (data: StockImageDocument) => void;
}) => {
  const { control } = useSP();
  const { dispatch } = Core.useCore();

  const handleConvert = () => {
    dispatch({
      type: "popup",
      value: {
        title: "From URL",
        text: "URL",
        icon: <Link />,
        type: "prompt",
        onConfirm: async (value) => {
          if (value && control) {
            const file = await control.fromURL(value).catch((err) => {
              dispatch({
                type: "alert/add",
                value: {
                  label: err.message,
                  severity: "error",
                },
              });
            });
            if (file) {
              const result = await control.upload(file).catch((err) => {
                dispatch({
                  type: "alert/add",
                  value: {
                    label: err.message,
                    severity: "error",
                  },
                });
              });
              if (result) {
                props.onConfirm(result);
              }
            }
          }
        },
      },
    });
  };

  return (
    <Fragment>
      <Box ml={2} />
      <Button
        variant="outlined"
        startIcon={<Link />}
        color="neutral"
        onClick={handleConvert}
      >
        From URL
      </Button>
    </Fragment>
  );
};
