'use client'

import {Box} from "@mui/material";
import {DndContext} from "@dnd-kit/core";
import StatusBoard from "@/components/StatusBoard";

export default function JobBoard() {
    function handleDragEnd(event) {
        if (event.over && event.over.id === 'droppable') {

        }
    }

    return (
        <Box component="section" sx={{
            my: 4,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            border: 1,
            borderRadius: 4,
        }}>
            <DndContext onDragEnd={handleDragEnd}>
                <StatusBoard status={1}/>
                <StatusBoard status={2}/>
                {/*<StatusBoard status="นัดสัม"/>*/}
                {/*<StatusBoard status="สัมแล้ว"/>*/}
                {/*<StatusBoard status="ผ่าน"/>*/}
            </DndContext>
        </Box>
    );
}

