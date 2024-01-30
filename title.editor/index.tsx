import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import { ActionIcon, Core } from "..";
import { Edit } from "@mui/icons-material";

export interface TitleEditProps {
  value?: string;
  onChange: (value: string) => void;
}
export const TitleEdit = ({ value, onChange }: TitleEditProps) => {
  const { dispatch } = Core.useCore();

  const handleEdit = () =>
    dispatch({
      type: "popup",
      value: {
        title: "Edit Title",
        text: "Title",
        icon: <Edit />,
        value: value,
        type: "prompt",
        onConfirm: (value) => {
          onChange(value || "");
        },
      },
    });

  return (
    <List disablePadding>
      <ListItem divider dense>
        <ListItemText
          primary={"Title"}
          secondary={value || "No Title"}
          primaryTypographyProps={{
            variant: "caption",
            color: "textSecondary",
          }}
          secondaryTypographyProps={{
            variant: "h6",
            color: Boolean(value) ? "textPrimary" : "textSecondary",
          }}
        />
        <ListItemSecondaryAction>
          <ActionIcon icon={<Edit />} color="warning" onClick={handleEdit} />
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
};
