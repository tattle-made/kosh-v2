import { Box, Button, Calendar, CheckBoxGroup, Text } from "grommet";
import React from "react";
import Dropzone from "react-dropzone";
import { Filter, Upload, X, Calendar as CalendarIcon } from "react-feather";
import DatePicker from "../atoms/datepicker";
import SearchBox from "../atoms/search-box";
import SearchSettings from "../atoms/search-settings";
import theme from "../atoms/theme";

const SearchPost = () => {
    const [searchString, setSearchString] = React.useState("");
    const [showFilter, setShowFilter] = React.useState(false)
    const [selectedTypes, setSelectedTypes] = React.useState([])
    const [selectedDatasource, setSelectedDatasource] = React.useState([])
    const [fromDate, setFromDate] = React.useState()
    const [toDate, setToDate] = React.useState()
    const [searchFile, setSearchFile] = React.useState()

    const grayColor = theme.global.colors["light-1"];
    const datasources = ["fearspeech", "factcheck"]

    const onDrop = (acceptedFiles) => {
        console.log("==files==");
        console.log(acceptedFiles);
        // navigate("/search");
        setSearchFile(acceptedFiles[0]);
    };

    return (
        <>
            {showFilter ? <SearchSettings setSelectedTypes={setSelectedTypes}
             setSelectedDatasource={setSelectedDatasource} datasources={datasources}
             fromDate={fromDate} setFromDate={setFromDate}
             toDate={toDate} setToDate={setToDate} /> : (
                <Box pad={"small"} direction="row">
                    <Box justify="center" align="center" width={"xxsmall"}>
                        <Dropzone onDrop={onDrop}>
                            {({ getRootProps, getInputProps }) => {
                            console.log(getRootProps())
                            return (
                                <Box {...getRootProps()} >
                                    <input {...getInputProps()} />
                                    <Upload color={grayColor} />
                                </Box>
                            )}}
                        </Dropzone>
                    </Box>
                    {searchFile ? (
                        <Box width={"medium"} pad={"small"} direction="row" justify="between" border="all" align="center" round="small">
                            {searchFile.name} 
                            <Button onClick={() => setSearchFile(null)}>
                                <X color={"#514E80AA"} size={26} />
                            </Button>
                        </Box>
                    ) : <SearchBox setSearchString={setSearchString} searchString={searchString} />}
                    <Box pad={"small"} justify={"center"} round={"xsmall"} focusIndicator={false} onClick={() => setShowFilter(true)}>
                        <Filter color={"#514E80AA"} size={22}/>
                    </Box>
                </Box>
            )}
        </>
    )
}

export default SearchPost