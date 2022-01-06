import { Box, Calendar } from "grommet";
import React from "react";

const DatePicker = (props) => (
    <Box width={"small"} border="all" elevation="small">
        <Calendar
            size="small"
            date={props.date}
            onSelect={(date) => props.setDate(date)}
        />
    </Box>
)

export default DatePicker