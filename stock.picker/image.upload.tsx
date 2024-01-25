import { Button } from "@mui/material";
import React, { useState } from "react";
import { useSP } from "./context";
import { FolderOpen } from "@mui/icons-material";
import { Core } from "..";

const UploadIcon = () => <FolderOpen />;

export const SPUpload = () => {
  const { dispatch: coreDispatch } = Core.useCore();
  const { control, state, dispatch } = useSP();
  const [value, setValue] = useState<string>("");
  const [selfState, setSelfState] = useState({
    loading: false,
    progress: 0,
  });

  const handleChange = async ({
    target: { value, files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setValue(value);
    setSelfState((s) => ({ ...s, loading: true }));
    if (files && files?.length && control) {
      const file = files[0];
      let result = await control.upload(file).catch((err) => {
        coreDispatch({
          type: "alert/add",
          value: { severity: "error", label: err.message },
        });
        return null;
      });
      if (result) {
        dispatch({ type: "docs/update", value: result });
      }
    }
    setSelfState((s) => ({ ...s, loading: false, progress: 0 }));
    setValue("");
  };

  return (
    <div>
      <label>
        <input
          type="file"
          hidden
          accept="image/*"
          value={value}
          onChange={handleChange}
        />
        {selfState.loading === false && (
          <Button
            variant="outlined"
            component="span"
            startIcon={<UploadIcon />}
          >
            Browse
          </Button>
        )}
      </label>
      {selfState.loading && (
        <Button variant="outlined" disabled>
          Uploading {selfState.progress}%
        </Button>
      )}
    </div>
  );
};
