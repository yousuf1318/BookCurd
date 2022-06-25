const dotenv = require('dotenv');
const result = dotenv.config();

if(result.error){
    throw result.error;
}
const {parsed: envs} = result

if(!Object.keys(envs).includes('PORT')){
    throw Error('.env must contain PORT')
}

module.exports = {
    envdata: envs
}