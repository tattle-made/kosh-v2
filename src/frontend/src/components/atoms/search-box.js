import { Box, Keyboard, Select, TextInput } from "grommet";
import React from "react";

const SearchBox = (props) => {
    const [options, setOptions] = React.useState(["HEllo", "Hel", "Hell", "Hey", "asdf", "What", "the", "Fuck", "ussi" ]);
    const [filteredOptions, setFilteredOptions] = React.useState(["HEllo", "Hel", "Hell", "Hey", "asdf", "What", "the", "Fuck", "ussi" ]);
    const [textInput, showTextInput] = React.useState(false)

    return <Keyboard onEnter={() => { }}>
        {textInput ? <Box>
            <TextInput height={"small"} style={{paddingLeft: 60, alignItems: "center", display: "flex"}} icon={<span style={{fontSize: 15}}>query</span>} />
        </Box> : <Select
            placeholder="Search"
            value={props.searchString}
            onChange={(event) => {
                console.log(event)
                props.setSearchString(event.option)
            }}
            onSearch={(e) => {
                if (e === "query:") showTextInput(true)
                setFilteredOptions(options.filter((option) => option.includes(e))
            )}}
            dropAlign={{top: "top", left: "left"}}
            dropHeight="medium"
            size={"small"}
            onSuggestionSelect={(s) => {
                console.log(s)
                props.setSearchString(s.suggestion)
            }}
            options={filteredOptions}
        />
        }
    </Keyboard>
}

export default SearchBox