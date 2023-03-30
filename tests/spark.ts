import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Spark } from "../target/types/spark";
import * as assert from "assert"

describe("spark", () => {
  anchor.setProvider(anchor.AnchorProvider.env())
  const program = anchor.workspace.Spark as Program<Spark>
    it("can send a new tweet" ,async () => {
      const tweetKeyPair = anchor.web3.Keypair.generate();
      await program.methods.sendTweet("Shobhit tweet" , "test tweet")
      .accounts({
        myTweet: tweetKeyPair.publicKey,
        senderOfTweet: program.provider.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId
        
      })
      .signers([tweetKeyPair])
      .rpc() 


      const tweetAccount = await program.account.tweetOnSolana.fetch(tweetKeyPair.publicKey);

      assert.equal(tweetAccount.author.toBase58() , program.provider.publicKey.toBase58())
      assert.equal(tweetAccount.topic , "Shobhit tweet")
      assert.equal(tweetAccount.content , "test tweet")
      assert.ok(tweetAccount.timestamp)
    })


    it("can send a new tweet without a topic" ,async () => {
      const tweetKeyPair = anchor.web3.Keypair.generate();
      await program.methods.sendTweet("" , "test tweet 1")
      .accounts({
        myTweet: tweetKeyPair.publicKey,
        senderOfTweet: program.provider.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId
        
      })
      .signers([tweetKeyPair])
      .rpc() 


      const tweetAccount = await program.account.tweetOnSolana.fetch(tweetKeyPair.publicKey);

      assert.equal(tweetAccount.author.toBase58() , program.provider.publicKey.toBase58())
      assert.equal(tweetAccount.topic , "")
      assert.equal(tweetAccount.content , "test tweet 1")
      assert.ok(tweetAccount.timestamp)
    })


    it("can send a new tweet from a different user" ,async () => {
      const otherUser = anchor.web3.Keypair.generate();
      const tweetKeyPair = anchor.web3.Keypair.generate();

    const signature =  await program.provider.connection.requestAirdrop(otherUser.publicKey , 1000000000);
    
    const latestBlockHash = await program.provider.connection.getLatestBlockhash()

    await program.provider.connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: signature
    })
    
    await program.methods.sendTweet("other user" , "Well test tweet from other user")
      .accounts({
        myTweet: tweetKeyPair.publicKey,
        senderOfTweet: otherUser.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId
        
      })
      .signers([otherUser , tweetKeyPair])
      .rpc() 


      const tweetAccount = await program.account.tweetOnSolana.fetch(tweetKeyPair.publicKey);

      assert.equal(tweetAccount.author.toBase58() , otherUser.publicKey.toBase58())
      assert.equal(tweetAccount.topic , "other user")
      assert.equal(tweetAccount.content , "Well test tweet from other user")
      assert.ok(tweetAccount.timestamp)
    })
    
});
