import React from "react";
import { useSP } from "./context";
import { Core } from "..";
import { PreButton } from "../pre.button";
import { Delete } from "@mui/icons-material";

export const SPRemove = () => {
  const { state, dispatch, control } = useSP();
  const { dispatch: coreDispatch } = Core.useCore();

  const handleRemove = () => {
    coreDispatch({
      type: "popup",
      value: {
        title: "Remove",
        text: "Do You Want To Remove Selected?",
        icon: <Delete fontSize="inherit" />,
        value: "Selected",
        type: "remove",
        onConfirm: async () => {
          dispatch({ type: "loading", value: true });
          if (control && state.selected.length) {
            const promises = state.selected.map(
              async (id) => await control.remove(id)
            );
            await Promise.all(promises);
            dispatch({ type: "docs/remove" });
          }
          dispatch({ type: "loading", value: false });
        },
      },
    });
  };

  return state.selected.length ? (
    <React.Fragment>
      &nbsp;
      <PreButton.Remove onClick={handleRemove} />
    </React.Fragment>
  ) : null;
};
