import  {ethers}  from "hardhat";

async function main() {
    const MultisigFactoryAddress = "0xfD5aB8a4F8f08edf2fd83e72fa06d945D686d993"
    const MultisigFactory = ethers.getContractAt("IMultisigFactory", MultisigFactoryAddress)

    const validSigners = ["0x21Be2291f91EA2A1d1EB65DbBea2dA8886Ad7a3E", "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"]

    const factory = await MultisigFactory.createMultisigWallet(2, validSigners)

    console.log("factory", factory)

    const clones = await MultisigFactory.getMultiSigClones()

    console.log('clones', clones)

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
