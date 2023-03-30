import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Spark } from "../target/types/spark";

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

      console.log(tweetAccount)
    })
});
