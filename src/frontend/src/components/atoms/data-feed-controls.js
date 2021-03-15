import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  CheckBox,
  Button,
  RadioButtonGroup,
} from "grommet";

/**
 * @author
 * @function DataFeedControls
 **/

const DataFeedControls = ({ label, onChange }) => {
  const [value, setFilterValue] = React.useState("all");

  const onFilterChecked = (value) => {
    setFilterValue(value);
    onChange(value);
  };

  useEffect(() => {
    //setFetching(true)
  });

  return (
    <Box direction={"row"} flex={"grow"} gap={"large"} align={"center"}>
      <Box align={"baseline"}>
        {" "}
        <Heading level={"2"} margin={"none"}>
          Data : {label}
        </Heading>{" "}
      </Box>
      {/* <Box direction={'row'} 
                gap={'small'}
                align={'baseline'}
                wrap={true}
            >
                <RadioButtonGroup
                    name="type"
                    direction={'row'}
                    options={['all', 'image', 'video', 'text']}
                    value={value}
                    onChange={(event) => onFilterChecked(event.target.value) }
                />
            </Box> */}
    </Box>
  );
};

export default DataFeedControls;
