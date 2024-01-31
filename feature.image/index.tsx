import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemProps,
  ListItemText,
} from "@mui/material";
import { ImageDisplay } from "../image.display";
import { PreButton } from "../pre.button";
import { FolderOpen, OpenWith, PhoneAndroid, Tv } from "@mui/icons-material";
import { ActionIcon, Core } from "..";
import { StockImageDocument, StockImagePosition } from "../stock.picker";
import { useState } from "react";
import { PositionEditor } from "./post.edit";

export type FeatureImageEditProps = Pick<ListItemProps, "divider"> & {
  value?: string | null;
  pos?: StockImagePosition;
  onChange?: (value: StockImageDocument) => void;
  onChangePos?: (pos: StockImagePosition) => void;
  onRemove?: () => void;
};

export const FeatureImageEdit = (props: FeatureImageEditProps) => {
  const { dispatch } = Core.useCore();
  const [mobile, setMobile] = useState<boolean>(false);
  const [openPos, setOpenPos] = useState<boolean>(false);

  const handleChange = () =>
    dispatch({
      type: "picker",
      value: ([img]) => img && props.onChange?.(img),
    });

  return (
    <>
      <List disablePadding>
        <ListItem divider={props.divider}>
          <ListItemText
            primary={
              <Box display="flex">
                Feature Image
                <Box flexGrow={1} />
                <ActionIcon
                  icon={mobile ? <PhoneAndroid /> : <Tv />}
                  color="neutral"
                  onClick={() => setMobile((m) => !m)}
                />
                &nbsp;
                <ActionIcon
                  icon={<OpenWith />}
                  color="neutral"
                  onClick={() => setOpenPos(true)}
                />
              </Box>
            }
            secondary={
              <Grid container spacing={1} sx={{ pt: 1 }}>
                {props.value && (
                  <Grid item xs={12}>
                    <ImageDisplay
                      src={props.value}
                      ratio={mobile ? "1 / 1" : "3 / 1"}
                      pos={props.pos}
                    />
                  </Grid>
                )}
                <Grid item xs={props.value ? 6 : 12}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<FolderOpen />}
                    onClick={handleChange}
                    children="Change"
                  />
                </Grid>
                {props.value && (
                  <Grid item xs={6}>
                    <PreButton.Remove fullWidth onClick={props.onRemove} />
                  </Grid>
                )}
              </Grid>
            }
            primaryTypographyProps={{
              variant: "caption",
            }}
            secondaryTypographyProps={{
              component: "div",
            }}
          />
        </ListItem>
      </List>
      <PositionEditor
        open={openPos}
        image={props.value ?? undefined}
        pos={props.pos}
        onChange={props.onChangePos}
        onClose={() => setOpenPos(false)}
      />
    </>
  );
};
