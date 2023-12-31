const ethers = require("ethers")
const fs = require("fs-extra")
require("dotenv").config()

async function handler(event) {
    try {
        const {id} = event.queryStringParameters
        const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
        const address = process.env.CONTRACT_ADDRESS
        const abi = fs.readFileSync("./outputs/Ledger.abi", "utf-8")
        const wallet = new ethers.Wallet(process.env[`PRIVATE_KEY_${id}`], provider)
        const contract = new ethers.Contract(address, abi, wallet)
        const blockNumber = await provider.getBlockNumber()
        const events = await contract.queryFilter("Exchange", Math.max(blockNumber - 10000, 0))
        const data = []

        for(let i = events.length - 1; i >= 0 && data.length < 10; --i) {
            if(events[i].args[0] === wallet.address) {
                data.push(events[i].args[1].toString())
            }
        }

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        }
    }
}

module.exports = {handler}