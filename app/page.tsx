'use client';

import Header from "@/components/Header";
import {Box, Container} from "@mui/material";
import JobBoard from "@/components/JobBoard";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "@/app/firebase";
import { useRouter } from 'next/navigation';
import {useEffect} from "react";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                router.push('/login');
            }
        });
        return () => unsubscribe(); // Cleanup subscription on unmount
    }, [router]);

    return (
        <Container maxWidth="lg">
            <Box
                sx={{
                    my: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Header />
                <JobBoard />
            </Box>
        </Container>


    );
}