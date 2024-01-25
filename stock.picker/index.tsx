import {
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import { SPContent } from "./content";
import { StockPickerProps, SPContext, State } from "./context";
import { StockImageController, StockImageDocument } from "./controller";
import { SPUpload } from "./image.upload";
import { SPRemove } from "./remove";
import { FromURL } from "./url";
import { Core } from "..";
import { PreButton } from "../pre.button";

export * from "./controller";

export const StockPicker = ({
  open,
  onClose,
  onConfirm,
  multiple,
}: StockPickerProps) => {
  const {
    state: { db, user },
  } = Core.useCore();
  const [control, setControl] = useState<StockImageController>();
  const [state, dispatch] = useReducer(State.reducer, new State());

  const handleConfirm = () => {
    if (state.selected.length) {
      const docs = state.docs.filter((doc) => state.selected.includes(doc._id));
      onConfirm(docs);
    }
    dispatch({ type: "select/clear" });
    onClose();
  };
  const handleChangeURL = (data: StockImageDocument) =>
    dispatch({ type: "docs/update", value: data });

  useEffect(() => {
    dispatch({ type: "multiple", value: multiple });
  }, [multiple]);

  useEffect(() => {
    if (user !== "loading" && user && open && db) {
      const control = new StockImageController(user);
      setControl(control);
      return StockImageDocument.watch(db, user, (docs) =>
        dispatch({ type: "docs", value: docs })
      );
    }
  }, [db, open, user]);

  return (
    <SPContext.Provider
      value={{
        control,
        state,
        dispatch,
      }}
    >
      <Dialog fullWidth maxWidth="md" open={open} onClose={onClose}>
        <DialogTitle>
          {state.selected.length > 0
            ? `Select ${state.selected.length} image(s)`
            : "Change Image"}
        </DialogTitle>
        <DialogContent>
          {state.loading ? (
            <Box display="flex" sx={{ justifyContent: "center" }}>
              <CircularProgress size={64} thickness={4} />
            </Box>
          ) : (
            <SPContent />
          )}
        </DialogContent>
        <DialogActions>
          <SPUpload />
          <FromURL onConfirm={handleChangeURL} />
          <SPRemove />
          <Box flex={1} />
          <PreButton.Confirm
            disabled={state.selected.length < 1}
            onClick={handleConfirm}
          />
          <PreButton.Close onClick={onClose} />
        </DialogActions>
      </Dialog>
    </SPContext.Provider>
  );
};
