const ethers = require("ethers")
const fs = require("fs-extra")
require("dotenv").config()

async function deploy() {
    try {
        const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
        const wallet = new ethers.Wallet(process.env.PRIVATE_KEY_ONE, provider)
        const abi = fs.readFileSync("./outputs/Ledger.abi", "utf-8")
        const binary = fs.readFileSync("./outputs/Ledger.bin", "utf-8")
        const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
        const contract = await contractFactory.deploy()
        console.log(contract)

        console.log("Waiting for deployment...")
        await contract.waitForDeployment()
        const address = await contract.getAddress()
        console.log(`Contract Address: ${address}`)
    } catch (error) {
        console.error(error)
    }
}

deploy()
    .then(_ => process.exit(0))
    .catch(error => {
        console.log(error)
        process.exit(1)
    })