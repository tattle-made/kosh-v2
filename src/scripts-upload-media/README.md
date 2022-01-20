# Setting Environment
run any of these scripts by passing them a mandatory environment parameter which can be either DEVELOPMENT or PRODUCTION
`node script.js DEVELOPMENT` or `node test.js PRODUCTION`


# Using the envirornment within scripts
const { initialize } = require("./environment");

initialize(process.argv[0]);