import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Slider,
  Typography,
} from "@mui/material";
import { PreButton } from "../pre.button";
import { ImageDisplay } from "../image.display";
import { ReactNode, forwardRef, useCallback, useEffect, useState } from "react";
import { StockImagePosition } from "../stock.picker";
import { ActionIcon } from "../action.icon";
import { RestartAlt } from "@mui/icons-material";

type SliderStyledProps = {
  label?: ReactNode;
  value?: number | string;
  onChange?: (value: number) => void;
};
const SliderStyled = forwardRef<HTMLSpanElement, SliderStyledProps>(
  (props, ref) => {
    const int = useCallback((value?: string | number): number => {
      return parseInt(`${value ?? 0}`.replace(/[^0-9]/g, ""));
    }, []);

    return (
      <Box display="flex" alignItems="center" sx={{ gap: 1 }}>
        <Typography variant="caption">{props.label}</Typography>
        <Slider
          ref={ref}
          value={int(props.value)}
          onChange={(_, value) =>
            props.onChange?.(Array.isArray(value) ? value[0] : value)
          }
        />
        <Typography variant="caption">{int(props.value)}%</Typography>
        <ActionIcon
          icon={<RestartAlt />}
          onClick={() => props.onChange?.(50)}
        />
      </Box>
    );
  }
);

export type PositionEditorProps = {
  open: boolean;
  image?: string;
  pos?: StockImagePosition;
  onChange?: (pos: StockImagePosition) => void;
  onClose?: () => void;
};
export const PositionEditor = (props: PositionEditorProps) => {
  const [pos, setPos] = useState<StockImagePosition>({
    top: "50%",
    left: "50%",
  });

  useEffect(() => {
    setPos(props.pos ?? { top: "50%", left: "50%" });
  }, [props.pos]);

  const handleChange = (key: "top" | "left") => (value: number) =>
    setPos((p) => ({ ...p, [key]: `${value}%` }));
  const handleConfirm = () => {
    props.onChange?.(pos);
    props.onClose?.();
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={props.open} onClose={props.onClose}>
      <DialogTitle>Position</DialogTitle>
      <DialogContent>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} sm={6}>
            <ImageDisplay src={props.image} pos={pos} ratio="1 / 1" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ImageDisplay src={props.image} pos={pos} ratio="3 / 1" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SliderStyled
              label="Left"
              value={pos.left}
              onChange={handleChange("left")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SliderStyled
              label="Top"
              value={pos.top}
              onChange={handleChange("top")}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <PreButton.Confirm onClick={handleConfirm} />
        <PreButton.Cancel onClick={props.onClose} />
      </DialogActions>
    </Dialog>
  );
};
