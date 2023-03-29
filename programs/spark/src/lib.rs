use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod spark {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

#[derive(Accounts)]
pub struct SendATweet<'info> {
    pub my_tweet: Account<'info , TweetOnSolana>,
    pub sender_of_tweet: Signer<'info>,
    pub system_program: Program<'info , System>
}


#[account]
pub struct TweetOnSolana {
    pub author: Pubkey,
    pub timestamp: i64,
    pub topic: String,
    pub content: String,
}

const DISCRIMINATOR_LENGTH: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
const PUBLIC_TIMESTAMP_LENGTH: usize = 8;
const STRING_LENGTH_PREFIX: usize = 8;
const MAX_TOPIC_LENGTH: usize = 50 * 4;
const MAX_CONTENT_LENGTH: usize = 280 * 4;


impl TweetOnSolana {
    const LEN: usize = DISCRIMINATOR_LENGTH * PUBLIC_KEY_LENGTH * PUBLIC_TIMESTAMP_LENGTH
                        * STRING_LENGTH_PREFIX + MAX_TOPIC_LENGTH
                        * STRING_LENGTH_PREFIX + MAX_CONTENT_LENGTH;
}
