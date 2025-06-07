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
        }}>
            <DndContext onDragEnd={handleDragEnd}>
                <StatusBoard status="รอยื่น"/>
                <StatusBoard status="สมัครแล้ว"/>
                <StatusBoard status="นัดสัมภาษณ์"/>
                <StatusBoard status="สัมภาษณ์แล้ว"/>
                <StatusBoard status="ผ่าน"/>
                <StatusBoard status="ไม่ผ่าน"/>
            </DndContext>
        </Box>
    );
}

