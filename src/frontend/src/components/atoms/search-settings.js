import { Box, Button, CheckBoxGroup, Text } from "grommet";
import React from "react";
import { Calendar as CalendarIcon, X } from "react-feather";
import DatePicker from "../atoms/datepicker";

const ACCEPTED_POST_TYPES = ["text", "image", "video"]

const SearchSettings = (props) => {
    const [showFromDatePicker, toggleFromDatePicker] = React.useState(false)
    const [showToDatePicker, toggleToDatePicker] = React.useState(false)

    return (
        <Box margin={"medium"} gap="large">
            <Box justify="between" direction="row" align="center">
                <Text size="medium">Search Filter</Text>
                <Button onClick={() => props.setShowFilter(false)}>
                    <X color={"#514E80AA"} size={26} />
                </Button>
            </Box>
            <Box gap={"medium"}>
                <Text size={"small"} weight={600}>
                    Type
                </Text>
                <CheckBoxGroup options={ACCEPTED_POST_TYPES} style={{textTransform: "capitalize"}} onChange={(e) => props.setSelectedTypes(e.value)} />
            </Box>
            <Box gap={"medium"}>
                <Text size={"small"} weight={600}>
                    Datasource
                </Text>
                <CheckBoxGroup options={props.datasources} style={{textTransform: "capitalize"}} onChange={(e) => props.setSelectedDatasource(e.value)} />
            </Box>
            <Box gap={"medium"}>
                <Text size={"small"} weight={600}>
                    Time of Upload
                </Text>
                <Box direction="row" gap="small">
                    <Text size="small" weight={"bold"} onClick={() => toggleFromDatePicker(!showFromDatePicker)}>
                        From <CalendarIcon size={16} />
                    </Text>
                    {props.fromDate && <Text size="small">{new Date(props.fromDate).toDateString()}</Text>}
                </Box>
                {showFromDatePicker && <DatePicker date={props.fromDate} setDate={props.setFromDate} />}
                <Box direction="row" gap="small">
                    <Text size="small" weight={"bold"} onClick={() => toggleToDatePicker(!showToDatePicker)}>
                        To <CalendarIcon size={16} />
                    </Text>
                    {props.toDate && <Text size="small">{new Date(props.toDate).toDateString()}</Text>}
                </Box>
                {showToDatePicker && <DatePicker date={props.toDate} setDate={props.setToDate} />}
            </Box>
        </Box>
    )
}

export default SearchSettings