const {Pool} = require('pg');

module.exports = new Pool({
connectionString: ProcessingInstruction.env.POSTGRES_URL 
})