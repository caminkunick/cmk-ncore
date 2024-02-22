import { ChevronLeft } from "@mui/icons-material";
import { Button, List, ListItem, ListItemProps } from "@mui/material";
import Link, { LinkProps } from "next/link";

export type BackLinkProps = Pick<ListItemProps, "divider"> &
  Pick<LinkProps, "href">;
export const BackLink = (props: BackLinkProps) => {
  return (
    <List disablePadding>
      <ListItem divider={props.divider}>
        <Button
          LinkComponent={Link}
          // @ts-ignore
          href={props.href}
          startIcon={<ChevronLeft />}
        >
          Back
        </Button>
      </ListItem>
    </List>
  );
};
