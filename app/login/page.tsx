'use client';

import { useState, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup, User, onAuthStateChanged } from 'firebase/auth';
import { Button, Typography, Container, Paper, Box, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import {auth} from "@/app/firebase"; // For redirecting after login
import { FirebaseError } from 'firebase/app'; // Import FirebaseError

export default function LoginPage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            if (currentUser) {
                router.push('/');
            }
        });
        return () => unsubscribe(); // Cleanup subscription on unmount
    }, [router]);

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError(null);
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
            // You can redirect the user to another page after successful login
            // For example, router.push('/dashboard');
            console.log('Successfully signed in with Google:', result.user);
        } catch (err: unknown) { // Explicitly type err as unknown
            console.error("Error signing in with Google:", err);
            if (err instanceof FirebaseError) {
                setError(err.message || 'Failed to sign in with Google. Please try again.');
            } else if (err instanceof Error) { // Handle generic errors
                setError(err.message || 'An unexpected error occurred.');
            } else {
                setError('An unknown error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        setLoading(true);
        try {
            await auth.signOut();
            setUser(null);
        } catch (err: unknown) { // Explicitly type err as unknown
            console.error("Error signing out:", err);
            if (err instanceof FirebaseError) {
                setError(err.message || 'Failed to sign out.');
            } else if (err instanceof Error) { // Handle generic errors
                setError(err.message || 'An unexpected error occurred during sign out.');
            } else {
                setError('An unknown error occurred during sign out.');
            }
        } finally {
            setLoading(false);
        }
    }

    if (loading && !user) { // Show loading spinner only during initial auth check
        return (
            <Container component="main" maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
            <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {user ? (
                    <>
                        <Typography component="h1" variant="h5" gutterBottom>
                            Welcome, {user.displayName || user.email}
                        </Typography>
                        {user.photoURL && (
                            <Box
                                component="img"
                                sx={{
                                    height: 80,
                                    width: 80,
                                    borderRadius: '50%',
                                    my: 2,
                                }}
                                alt="User Photo"
                                src={user.photoURL}
                            />
                        )}
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSignOut}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Sign Out'}
                        </Button>
                    </>
                ) : (
                    <>
                        <Typography component="h1" variant="h5" gutterBottom>
                            Sign In
                        </Typography>
                        {error && (
                            <Typography color="error" sx={{ mb: 2 }}>
                                {error}
                            </Typography>
                        )}
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleGoogleSignIn}
                            disabled={loading}
                            startIcon={
                                <Box
                                    component="img"
                                    sx={{
                                        height: 20,
                                        width: 20,
                                        mr: 1
                                    }}
                                    alt="Google icon"
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" // Example Google icon
                                />
                            }
                        >
                            {loading ? <CircularProgress size={24} /> : 'Sign in with Google'}
                        </Button>
                    </>
                )}
            </Paper>
        </Container>
    );
}