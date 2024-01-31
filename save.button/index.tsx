import { Save } from "@mui/icons-material";
import { Button, List, ListItem } from "@mui/material";

export interface SaveButtonProps {
  loading?: boolean;
  onSave: () => void;
  disabled?: boolean;
}
export const SaveButton = ({ loading, onSave, disabled }: SaveButtonProps) => {
  return (
    <List disablePadding>
      <ListItem divider>
        <Button
          fullWidth
          size="large"
          variant="contained"
          color="success"
          disableElevation
          startIcon={loading ? null : <Save />}
          disabled={loading || disabled}
          onClick={onSave}
        >
          {loading ? "Please Wait" : "Save"}
        </Button>
      </ListItem>
    </List>
  );
};
