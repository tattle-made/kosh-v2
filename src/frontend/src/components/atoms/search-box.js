import { Box, Keyboard, TextInput } from "grommet";
import React from "react";

const SearchBox = (props) => {
    const [filteredOptions, setFilteredOptions] = React.useState(["asd","sad"]);

    const getSuggestions = (text) => {
        // post('/suggest', {text}).then((response) => setFilteredOptions(response.suggestions))
        // .catch((res) => console.log(res))
    }
    let debounce;

    return <Box fill={true}>
        <Keyboard onEnter={() => props.search()}>
        <TextInput
            placeholder="Search"
            height={"small"}
            value={props.searchString}
            style={props.queryInput ? {paddingLeft: 60, alignItems: "center", display: "flex"} : {}}
            onChange={(event) => {
                if (event.target.value === "query:") {
                    props.showQueryInput(true)
                    props.setSearchString('')
                    return
                }
                props.setSearchString(event.target.value)
                clearTimeout(debounce)
                debounce = setTimeout(() => {
                    getSuggestions(event.target.value)
                }, 1000)
            }}
            icon={props.queryInput && <span style={{fontSize: 15}}>query</span>} 
            dropAlign={{ top: "bottom" }}
            suggestions={filteredOptions}
            dropHeight="medium"
            size={"small"}
            onSuggestionSelect={(s) => {
                console.log(s)
                props.setSearchString(s.suggestion)
            }}
        />
        </Keyboard>
    </Box>
}

export default SearchBox