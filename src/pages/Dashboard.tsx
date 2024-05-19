import { Button, Grid, Typography } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

export const Dashboard = () => {
  const { logout } = useAuth();
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      mt={2}
    >
      <Typography variant="h3"> Welcome to Application</Typography>
      <Grid item mt={4}>
        <Button
          type="button"
          onClick={() => {
            logout();
            toast.success("Logged Out");
          }}
        >
          Logout
        </Button>
      </Grid>
    </Grid>
  );
};
