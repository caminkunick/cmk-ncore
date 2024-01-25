import { useCallback, useEffect, useState } from "react";
import { useSP } from "./context";
import { StockDisplay } from "../stock.display";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import { StockImageDocument } from "./controller";
import { DragUploadItem } from "./drag.upload";
import { useDropzone } from "react-dropzone";
import { grey } from "@mui/material/colors";
import { Image } from "@mui/icons-material";
import { Core } from "..";
import update from "react-addons-update";

const CheckBoxContainer = styled(Box)({
  position: "absolute",
  left: 12,
  bottom: 0,
  color: "white",
  "& .MuiSvgIcon-root": {
    fill: "white",
  },
});

const DropHere = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isDragActive",
})<{ isDragActive?: boolean }>(({ theme, isDragActive }) => ({
  cursor: "grab",
  position: "relative",
  backgroundColor: isDragActive ? theme.palette.primary.main : grey[300],
  color: isDragActive ? theme.palette.primary.contrastText : undefined,
  width: "100%",
  "&:hover": {
    backgroundColor: grey[400],
  },
  "&:active": {
    backgroundColor: grey[500],
  },
  "&:after": {
    content: "''",
    display: "block",
    paddingTop: "100%",
  },
  "&>div": {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export const SPContent = () => {
  const { dispatch: coreDispatch } = Core.useCore();
  const { state, dispatch, control } = useSP();

  const onDrop = useCallback(
    (acceptedFiles: File[]) =>
      dispatch({
        type: "upload/add",
        value: acceptedFiles,
        callback: coreDispatch,
      }),
    [coreDispatch, dispatch]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleCheck = (id: string) => () =>
    dispatch({ type: "select/toggle", value: id });

  useEffect(() => {
    if (control && state.uploadqueue.length > 0) {
      const imageProm = state.uploadqueue.map(async (file, index) => {
        return await control.upload(file).catch((err) => {
          coreDispatch({
            type: "alert/add",
            value: { severity: "error", label: err.message },
          });
          return null;
        });
      });
      Promise.all(imageProm).then((images) => {
        dispatch({ type: "upload/clear", value: images });
        coreDispatch({
          type: "alert/add",
          value: { label: "Upload complete" },
        });
      });
    }
  }, [state.uploadqueue, control, coreDispatch, dispatch]);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={3}>
          <DropHere isDragActive={isDragActive} {...getRootProps()}>
            <div>
              <input accept="image/*" {...getInputProps()} />
              <Image sx={{ fontSize: "4rem" }} />
              <Typography variant="caption">Drop File Here</Typography>
            </div>
          </DropHere>
        </Grid>
        {state.uploadqueue.map((file: File, index) => (
          <DragUploadItem
            progress={state.Get().progress(index)}
            file={file}
            key={index}
          />
        ))}
        {state.docs
          .sort((a, b) => {
            const getDate = (doc: StockImageDocument) =>
              new Date(doc.datemodified).getTime();
            return getDate(b) - getDate(a);
          })
          .map((doc) => (
            <Grid item xs={6} sm={3} key={doc._id}>
              <StockDisplay image={doc} ratio={1} hover>
                <CheckBoxContainer>
                  <FormControlLabel
                    label="Select"
                    control={
                      <Checkbox
                        size="small"
                        checked={state.selected.includes(doc._id)}
                        onChange={handleCheck(doc._id)}
                      />
                    }
                    componentsProps={{
                      typography: {
                        variant: "body2",
                      },
                    }}
                    sx={{
                      backgroundColor: "#0006",
                      pr: 1.5,
                    }}
                  />
                </CheckBoxContainer>
              </StockDisplay>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};
