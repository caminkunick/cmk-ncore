import { Box, Button, Container, Typography } from "@mui/material";
import { useMC } from "./ctx";
import React, { ReactNode } from "react";
import { Block, ChevronLeft } from "@mui/icons-material";

export interface RestrictProps {
  message?: React.ReactNode;
  icon?: ReactNode;
  link?: string;
}
export const MCRestrict = (props: RestrictProps) => {
  const { dense } = useMC();

  return (
    <Container maxWidth="xs">
      <Box py={dense ? 6 : 0} textAlign={"center"}>
        {props.icon ?? <Block sx={{ fontSize: "8rem" }} />}
        <Typography mt={2} color="textSecondary">
          {props.message || "You don't have permission to view this page"}
        </Typography>
        {props.link && (
          <Button
            variant="outlined"
            color="info"
            sx={{ mt: 4 }}
            startIcon={<ChevronLeft />}
            onClick={() => window.open(props.link!, "_self")}
          >
            Back
          </Button>
        )}
      </Box>
    </Container>
  );
};
