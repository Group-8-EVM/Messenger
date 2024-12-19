import { expect } from "chai";
import { viem } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";

describe("Messenger", async () => {
  async function deployMessengerFixture() {
    const publicClient = await viem.getPublicClient();
    const [account1, account2, account3] = await viem.getWalletClients();
    const messenger = await viem.deployContract("Messenger");
    return { publicClient, messenger, account1, account2, account3 };
  }

  describe("someone sends message to another person", async () => {
    it("should everyone have 0 messages at first", async () => {
      const { publicClient, messenger, account1, account2, account3 } =
        await loadFixture(deployMessengerFixture);
      expect(
        (await messenger.read.getMyMessages({ account: account1.account }))
          .length,
      ).eq(0);
      expect(
        (await messenger.read.getMyMessages({ account: account2.account }))
          .length,
      ).eq(0);
      expect(
        (await messenger.read.getMyMessages({ account: account3.account }))
          .length,
      ).eq(0);
    });

    it("should add message into person messages", async () => {
      const { publicClient, messenger, account1, account2, account3 } =
        await loadFixture(deployMessengerFixture);
      await messenger.write.sendMessage([account2.account.address, "Hi"], {
        account: account1.account,
      });

      const account2Messages = await messenger.read.getMyMessages({
        account: account2.account,
      });
      const message = account2Messages[0];
      expect(message.message).to.equal("Hi");
    });

    it("should not allow sending an empty message", async () => {
      const { publicClient, messenger, account1, account2 } =
        await loadFixture(deployMessengerFixture);
      await expect(
        messenger.write.sendMessage([account2.account.address, ""], {
          account: account1.account,
        }),
      ).to.be.revertedWith("Message cannot be empty");
    });

    it("should not allow sending a message to an invalid address", async () => {
      const { publicClient, messenger, account1 } =
        await loadFixture(deployMessengerFixture);
      await expect(
        messenger.write.sendMessage(["0x0000000000000000000000000000000000000000", "Hi"], {
          account: account1.account,
        }),
      ).to.be.revertedWith("Invalid recipient address");
    });

    it("should see message for yourself", async () => {
      const { publicClient, messenger, account1, account2, account3 } =
        await loadFixture(deployMessengerFixture);
      await messenger.write.sendMessage([account2.account.address, "Hi"], {
        account: account1.account,
      });

      const account1Messages = await messenger.read.getMyMessages({
        account: account1.account,
      });
      const message = account1Messages[0];
      expect(message.message).to.equal("Hi");
    });
    
    it("should not everyone get message", async () => {
      const { publicClient, messenger, account1, account2, account3 } =
        await loadFixture(deployMessengerFixture);
      await messenger.write.sendMessage([account2.account.address, "Hi"], {
        account: account1.account,
      });

      const account3Messages = await messenger.read.getMyMessages({
        account: account3.account,
      });
      expect(account3Messages.length).to.equal(0);
    });
  });
});
