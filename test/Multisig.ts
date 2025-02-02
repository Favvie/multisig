import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
  import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
  import { expect } from "chai";
  import hre from "hardhat";
  
  describe("Multisignature wallet", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployMultiSigFixture() {
        let validSigners;
        
      // Contracts are deployed using the first signer/account by default
      const [owner, addr1, addr2, addr3, addr4, addr5, addr6] = await hre.ethers.getSigners();

      validSigners =[addr1, addr2, addr3, addr4, addr5]
  
      const Multisig = await hre.ethers.getContractFactory("MultisigTest");
      const multisig = await Multisig.deploy(5, validSigners);
  
      return { multisig, validSigners, owner ,addr1, addr2, addr3, addr4, addr5, addr6};
    }
  
    describe("Deployment", function () {
      it("Should return the correct quorum", async function () {
        const { multisig } = await loadFixture(deployMultiSigFixture);
  
        expect(await multisig.quorum()).to.equal(5);
      });

      it("Should return valid signers", async function () {
        const { multisig, validSigners, owner, addr6 } = await loadFixture(deployMultiSigFixture);

        expect(await multisig.isValidSigner(owner)).to.be.true;
        expect(await multisig.isValidSigner(addr6)).to.be.false;
        
      })
      it("Should return no of valid signers", async function () {
        const { multisig, validSigners, owner, addr6 } = await loadFixture(deployMultiSigFixture);

       
        // expect(await multisig.noOfValidSigners).to.equal(5)
        
      })

    }) 
    
    
    describe('propose quorum', function () {
      it('check for the value of proposed quorum', async function() {
        const { multisig, validSigners } = await loadFixture(deployMultiSigFixture);
        await multisig.proposeNewQuorum(3);
        // await multisig.ApproveQuorumChange()
        expect(await multisig.proposedQuorum()).to.be.equal(3);
        expect(await multisig.)
      })
    })

      
    // })
    //   it("Should set the right owner", async function () {
    //     const { lock, owner } = await loadFixture(deployOneYearLockFixture);
  
    //     expect(await lock.owner()).to.equal(owner.address);
    //   });
  
    //   it("Should receive and store the funds to lock", async function () {
    //     const { lock, lockedAmount } = await loadFixture(
    //       deployOneYearLockFixture
    //     );
  
    //     expect(await hre.ethers.provider.getBalance(lock.target)).to.equal(
    //       lockedAmount
    //     );
    //   });
  
    //   it("Should fail if the unlockTime is not in the future", async function () {
    //     // We don't use the fixture here because we want a different deployment
    //     const latestTime = await time.latest();
    //     const Lock = await hre.ethers.getContractFactory("Lock");
    //     await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
    //       "Unlock time should be in the future"
    //     );
    //   });
    
  
    // describe("Withdrawals", function () {
    //   describe("Validations", function () {
    //     it("Should revert with the right error if called too soon", async function () {
    //       const { lock } = await loadFixture(deployOneYearLockFixture);
  
    //       await expect(lock.withdraw()).to.be.revertedWith(
    //         "You can't withdraw yet"
    //       );
    //     });
  
    //     it("Should revert with the right error if called from another account", async function () {
    //       const { lock, unlockTime, otherAccount } = await loadFixture(
    //         deployOneYearLockFixture
    //       );
  
    //       // We can increase the time in Hardhat Network
    //       await time.increaseTo(unlockTime);
  
    //       // We use lock.connect() to send a transaction from another account
    //       await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
    //         "You aren't the owner"
    //       );
    //     });
  
    //     it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
    //       const { lock, unlockTime } = await loadFixture(
    //         deployOneYearLockFixture
    //       );
  
    //       // Transactions are sent using the first signer by default
    //       await time.increaseTo(unlockTime);
  
    //       await expect(lock.withdraw()).not.to.be.reverted;
    //     });
    //   });
  
    //   describe("Events", function () {
    //     it("Should emit an event on withdrawals", async function () {
    //       const { lock, unlockTime, lockedAmount } = await loadFixture(
    //         deployOneYearLockFixture
    //       );
  
    //       await time.increaseTo(unlockTime);
  
    //       await expect(lock.withdraw())
    //         .to.emit(lock, "Withdrawal")
    //         .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
    //     });
    //   });
  
    //   describe("Transfers", function () {
    //     it("Should transfer the funds to the owner", async function () {
    //       const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
    //         deployOneYearLockFixture
    //       );
  
    //       await time.increaseTo(unlockTime);
  
    //       await expect(lock.withdraw()).to.changeEtherBalances(
    //         [owner, lock],
    //         [lockedAmount, -lockedAmount]
    //       );
    //     });
    //   });
    // });
  });