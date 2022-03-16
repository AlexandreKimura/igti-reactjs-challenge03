import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useAuthContext } from "../../contexts/authContext";
import { endSession } from "../../services/loginApi";

export function Header() {
  const { user, onSignOut } = useAuthContext();
  async function signOut() {
    await endSession();
    onSignOut();
  }

  return (
    <Box
      display="flex"
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      marginTop="3rem"
      padding="0 16px 0 16px"
    >
      <Typography variant="h5" component="h5" fontWeight="700">
        Despesas
      </Typography>
      <Box display="flex" alignItems="center" gap="1rem">
        <Typography>{user.nome}</Typography>
        <Button variant="contained" onClick={signOut}>
          Sair
        </Button>
      </Box>
    </Box>
  );
}
