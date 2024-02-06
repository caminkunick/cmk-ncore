import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  SlideProps,
  Typography,
} from "@mui/material";
import { useState } from "react";
import QRCode from "react-qr-code";
import { Link as LinkIcon } from "@mui/icons-material";
import Link from "next/link";
import { Core } from "..";

export const MCLine = () => {
  const {
    state: { user },
  } = Core.useCore();
  const [open, setOpen] = useState<boolean>(false);
  const line = null;

  const handleOpen = (open: boolean) => () => setOpen(open);
  const uid = (): string =>
    user !== "loading" && user !== null ? user?.uid : "";

  return (
    <Box display={"flex"} alignItems={"center"}>
      <Button
        variant="outlined"
        size="small"
        onClick={handleOpen(true)}
        startIcon={<LinkIcon />}
      >
        {line ? "Change" : "Link"}
      </Button>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={open}
        onClose={handleOpen(false)}
        TransitionComponent={Slide}
        TransitionProps={{ direction: "up" } as SlideProps}
      >
        <DialogTitle>Line QRCode</DialogTitle>
        <DialogContent>
          <Box textAlign="center">
            <QRCode
              value={`https://line.me/R/oaMessage/@920ooxaj/?register:${uid()}`}
            />
            <Box mb={2} />
            <Button
              fullWidth
              variant="outlined"
              component={Link}
              href={`https://line.me/R/oaMessage/@920ooxaj/?register:${uid()}`}
              target="_blank"
              size="large"
              startIcon={<LinkIcon />}
            >
              Link
            </Button>
            <Box mb={2} />
            <Typography variant="caption">
              หากยังไม่เคยเพิ่มเพื่อนกรุณากดเพิ่มเพื่อนแล้วแสกน QR Code อีกครั้ง
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
