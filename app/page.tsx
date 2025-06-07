import Header from "@/components/Header";
import {Box, Container} from "@mui/material";
import JobBoard from "@/components/JobBoard";

export default function Home() {
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