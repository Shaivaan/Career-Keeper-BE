const errorHandler=(message)=>{return {error : message}};
const successHandler=(jsonToSend)=>{return {data : jsonToSend}};
module.exports = {errorHandler,successHandler};