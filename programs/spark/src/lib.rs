use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod spark {
    use super::*;

    pub fn send_tweet(send_tweet_ctx:Context<SendATweet> , topic: String , tweet_content: String) -> Result<()> {
        
        if topic.chars().count() > 50 {
                    return err!(TweetErrors::TopicTooLong);
        }

        if tweet_content.chars().count() > 280 {
            return err!(TweetErrors::ContentTooLong);
        }
     
        let my_tweet: &mut Account<TweetOnSolana> = &mut send_tweet_ctx.accounts.my_tweet;
        let sender_of_tweet: &Signer = &send_tweet_ctx.accounts.sender_of_tweet;
        let clock: Clock = Clock::get().unwrap();
        my_tweet.author = *sender_of_tweet.key;
        my_tweet.timestamp = clock.unix_timestamp;
        my_tweet.topic = topic;
        my_tweet.content = tweet_content;
        Ok(())
    }
} 

#[error_code]
pub enum TweetErrors {
    #[msg("The tweet topic should be less than 50 characters")]
    TopicTooLong,
    #[msg("The tweet content should be less than 280 characters")]
    ContentTooLong,
}

#[derive(Accounts)]
pub struct SendATweet<'info> {
    #[account(init , payer=sender_of_tweet,space=TweetOnSolana::LEN)]
    pub my_tweet: Account<'info , TweetOnSolana>,

    #[account(mut)]
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
