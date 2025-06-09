'use client';

import {Box, IconButton, Typography} from "@mui/material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {auth} from "@/firebase/firebase";

export default function Header() {
    const signOutUser = async () => {
        try {
            await auth.signOut();
        } catch (err: unknown) { // Explicitly type err as unknown
            console.error("Error signing in with Google:", err);
        }
    }
    return (<Box sx={{
        display: 'flex',
        direction: 'row',
        alignItems: 'center',
        px: 2,
        py: 1,
        width: '100%',
    }}>
        <Typography variant="h4" component="h2" sx={{
            flexGrow: 1,
            textAlign: 'center'
        }}>
            Jib!❤️ This page is for you 🫵
        </Typography>
        <IconButton aria-label="exit" onClick={signOutUser} color="error" sx={{
            alignSelf: 'flex-start',
        }}>
            <ExitToAppIcon />
        </IconButton>
    </Box>);
}
