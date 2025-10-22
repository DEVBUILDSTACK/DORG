import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Datdev } from "../target/types/datdev";
import { assert } from "chai";
import { 
  createMint,
  createAssociatedTokenAccount,
  mintTo,
  getAssociatedTokenAddress
} from "@solana/spl-token";

describe("datdev", () => {
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Datdev as Program<Datdev>;
  const provider = anchor.getProvider();

  let vault_state: anchor.web3.PublicKey;
  let vault_bump : number;

  let tokenMint: anchor.web3.PublicKey;
  let mintAuthority = anchor.web3.Keypair.generate();

  let authority = anchor.web3.Keypair.generate();
  let user = anchor.web3.Keypair.generate();

  before(async ()=>{
    const signatures = await Promise.all([
      provider.connection.requestAirdrop(authority.publicKey, 10 * anchor.web3.LAMPORTS_PER_SOL),
      provider.connection.requestAirdrop(user.publicKey, 5 * anchor.web3.LAMPORTS_PER_SOL),
      provider.connection.requestAirdrop(mintAuthority.publicKey, 2 * anchor.web3.LAMPORTS_PER_SOL),
    ]);
    await Promise.all(signatures.map(sig => provider.connection.confirmTransaction(sig)));
    
    // create a new token mint
    const createMintTx = new anchor.web3.Transaction();
    tokenMint = await createMint(
      provider.connection,
      mintAuthority,
      mintAuthority.publicKey,
      null,
      6,
    );
    console.log("token mint:", tokenMint.toString());

    // create token account for the user and mint some tokens
    const userAta = await createAssociatedTokenAccount(
      provider.connection,
      user,
      tokenMint,
      user.publicKey
    );
    await mintTo(
      provider.connection,
      mintAuthority,
      tokenMint,
      userAta,
      mintAuthority,
      1_000_000_000 // 1000 tokens
    );

    [vault_state, vault_bump] = await anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("vault"),
        authority.publicKey.toBytes()      
      ],
      program.programId
    );

  })

  it("Is initialized", async () => {
    const usdcMint = tokenMint;
    let performance_fee = 1000; 
    let fee_bps = 50; 


    const [token_list, token_list_bump] = await anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("tokenlist"),
        vault_state.toBytes()
      ],
      program.programId
    );

    const tx = await program.methods
      .initialize(usdcMint, fee_bps, performance_fee)
      .accounts({
        authority: authority.publicKey,
        vaultState: vault_state,
        tokenList: token_list
      })
      .signers([authority])
      .rpc();
    
    // console.log("transaction:", tx);

    // fetch and verify vault state
    const vaultStateAccount = await program.account.vaultState.fetch(vault_state) as any;
    
    assert.equal(vaultStateAccount.admin.toString(), authority.publicKey.toString(), "admin should be authority");
    assert.equal(vaultStateAccount.rebalancer.toString(), authority.publicKey.toString(), "Rebalancer should be authority");
    assert.equal(vaultStateAccount.treasury.toString(), authority.publicKey.toString(), "Treasury should be authority");
    assert.equal(vaultStateAccount.usdcMint.toString(), usdcMint.toString(), "USDC mint should match");
    assert.equal(vaultStateAccount.tokenList.toString(), token_list.toString(), "Token list should match");
    assert.equal(vaultStateAccount.totalShares.toNumber(), 0, "Total shares should be 0");
    assert.equal(vaultStateAccount.totalValueUsdc.toNumber(), 0, "Total value should be 0");
    assert.equal(vaultStateAccount.feeBps, fee_bps, "Fee BPS should match");
    assert.equal(vaultStateAccount.performanceFeeBps, performance_fee, "Performance fee should match");
    assert.equal(vaultStateAccount.paused, false, "Vault should not be paused");
    assert.equal(vaultStateAccount.bump, vault_bump, "Bump should match");

    // verify token list
    const tokenListAccount = await program.account.tokenList.fetch(token_list) as any;
    
    assert.equal(tokenListAccount.vault.toString(), vault_state.toString(), "Token list vault should match");
    assert.equal(tokenListAccount.tokenCount, 0, "Token count should be 0");
    assert.equal(tokenListAccount.bump, token_list_bump, "Token list bump should match");

    // console.log(" vault State:", vault_state.toString());
    // console.log(" token List:", token_list.toString());
    // console.log(" admin:", authority.publicKey.toString());
  });

  it("add_token", async () => {
    let weight_bps = 5000; // 50% weight
    const mint = tokenMint;

    const [token_list, _token_list_bump] = await anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("tokenlist"),
        vault_state.toBytes()
      ],
      program.programId
    );

    // derive token_entry PDA
    const [token_entry, token_entry_bump] = await anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("tokenentry"),
        token_list.toBytes(),
        mint.toBytes()
      ],
      program.programId
    );

    // derive vault token account
    const vault_token_account = await anchor.utils.token.associatedAddress({
      mint: mint,
      owner: vault_state
    });

    const tx = await program.methods
      .addToken(weight_bps)
      .accounts({
        authority: authority.publicKey,
        vaultState: vault_state,
        tokenList: token_list,
        tokenEntry: token_entry,
        mint: mint,
        vaultTokenAccount: vault_token_account,
      })
      .signers([authority])
      .rpc();

      // console.log("tx: ",tx);

    // fetch and verify token entry
    const tokenEntryAccount = await program.account.tokenEntry.fetch(token_entry) as any;
    
    assert.equal(tokenEntryAccount.tokenList.toString(), token_list.toString(), "Token list should match");
    assert.equal(tokenEntryAccount.mint.toString(), mint.toString(), "Mint should match");
    assert.equal(tokenEntryAccount.vaultTokenAccount.toString(), vault_token_account.toString(), "Vault token account should match");
    assert.equal(tokenEntryAccount.weightBps, weight_bps, "Weight BPS should match");
    assert.equal(tokenEntryAccount.isActive, true, "Token should be active");
    assert.equal(tokenEntryAccount.bump, token_entry_bump, "Bump should match");

    // verify token list was updated
    const tokenListAccount = await program.account.tokenList.fetch(token_list) as any;
    assert.equal(tokenListAccount.tokenCount, 1, "Token count should be 1");

    // console.log("Token entry:", token_entry.toString());
    // console.log("Mint:", mint.toString());
    // console.log("Weight:", weight_bps, "BPS");
  });

  it("update_weights", async () => {
    const mint = tokenMint;
    const newWeightBps = 10000; // 100% weight for our single token

    const [token_list] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("tokenlist"),
        vault_state.toBytes()
      ],
      program.programId
    );
    
    const [token_entry] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("tokenentry"),
        token_list.toBytes(),
        mint.toBytes()
      ],
      program.programId
    );

    const tokenEntryBefore = await program.account.tokenEntry.fetch(token_entry) as any;
    
    const newWeights = [{
      mint: mint,
      weight: newWeightBps
    }];
    
    const tx = await program.methods
      .updateWeights(newWeights)
      .accounts({
        authority: authority.publicKey,
        vaultState: vault_state,
        tokenList: token_list,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .remainingAccounts([
        {
          pubkey: token_entry,
          isSigner: false,
          isWritable: true
        }
      ])
      .signers([authority])
      .rpc();
    
    // console.log("update weights tx", tx);
    
    const tokenEntryAfter = await program.account.tokenEntry.fetch(token_entry) as any;
    
    assert.equal(tokenEntryAfter.weightBps, newWeightBps, "Token weight should be updated to the new value");
    assert.notEqual(tokenEntryAfter.weightBps, tokenEntryBefore.weightBps, "Token weight should be different than before");
    
    assert.equal(tokenEntryAfter.tokenList.toString(), tokenEntryBefore.tokenList.toString(), "Token list reference shouldn't change");
    assert.equal(tokenEntryAfter.mint.toString(), tokenEntryBefore.mint.toString(), "Token mint shouldn't change");
    assert.equal(tokenEntryAfter.vaultTokenAccount.toString(), tokenEntryBefore.vaultTokenAccount.toString(), "Vault token account shouldn't change");
    assert.equal(tokenEntryAfter.isActive, tokenEntryBefore.isActive, "Active status shouldn't change");
    assert.equal(tokenEntryAfter.bump, tokenEntryBefore.bump, "Bump shouldn't change");
  })

  it("deposit", async () => {
    const mint = tokenMint;
    const depositAmount = new anchor.BN(1_000_000); // 1 token (assuming 6 decimals)

    const vault_token_account = await anchor.utils.token.associatedAddress({
      mint: mint,
      owner: vault_state
    })

    const user_token_account = await getAssociatedTokenAddress(
      mint,
      user.publicKey
    );
    
    const [user_account, _user_bump] = await anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("user"), user.publicKey.toBytes(), vault_state.toBytes()],
      program.programId
    );
    
    const tx = await program.methods
      .deposit(depositAmount)
      .accounts({
        user: user.publicKey,
        vaultState:vault_state,
        userAccount: user_account,
        userTokenAccount:user_token_account,
        vaultTokenAccount: vault_token_account,
      })
      .signers([user])
      .rpc();
    // console.log("deposit tx:", tx);

    const vaultStateAccount = await program.account.vaultState.fetch(vault_state) as any;
    assert(vaultStateAccount.totalShares.toNumber() > 0, "Total shares should increase");
    assert(vaultStateAccount.totalValueUsdc.toNumber() >= 0, "Total value should be non-negative");

    // const userTokenAcc = await program.provider.connection.getTokenAccountBalance(user_token_account);
    // console.log("user token account balance after deposit:", userTokenAcc.value.amount);
  })

  it("rebalance", async () => {
    const vaultStateBefore = await program.account.vaultState.fetch(vault_state) as any;
    
    const newTotalValue = new anchor.BN(2_000_000); // 2 tokens worth of USDC
    
    const [token_list] = await anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("tokenlist"), vault_state.toBytes()],
      program.programId
    );
    const tx = await program.methods
      .rebalance(newTotalValue)
      .accounts({
        authority: authority.publicKey,
        vaultState: vault_state,
        tokenList: token_list,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([authority])
      .rpc();

    // console.log("Rebalance tx:", tx);
    
    const vaultStateAfter = await program.account.vaultState.fetch(vault_state) as any;
    
    assert(vaultStateAfter.totalValueUsdc.eq(newTotalValue), "Total value USDC should be updated to the new value");
    assert.notEqual(vaultStateAfter.totalValueUsdc.toString(), vaultStateBefore.totalValueUsdc.toString(), 
      "Total value USDC should change after rebalance");
    
    assert(vaultStateAfter.lastRebalance > 0, "Last rebalance timestamp should be set");
    
    if (vaultStateBefore.lastRebalance) {
      assert.notEqual(vaultStateAfter.lastRebalance.toString(), vaultStateBefore.lastRebalance.toString(), 
        "Last rebalance timestamp should change");
    }
  })

  it("withdraw", async () => {
    const vault_token_account = await anchor.utils.token.associatedAddress({
      mint: tokenMint,
      owner: vault_state
    });

    const user_token_account = await getAssociatedTokenAddress(
      tokenMint,
      user.publicKey
    );
    
    const [user_account, _user_bump] = await anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("user"), user.publicKey.toBytes(), vault_state.toBytes()],
      program.programId
    );

    // fetch before balances
    const vaultStateBefore = await program.account.vaultState.fetch(vault_state) as any;
    const userAccountBefore = await program.account.userAccount.fetch(user_account) as any;
    
    const vaultTokenAccountBefore = await provider.connection.getTokenAccountBalance(vault_token_account);
    const userTokenAccountBefore = await provider.connection.getTokenAccountBalance(user_token_account);
    
    const sharesToWithdraw = userAccountBefore.shares.div(new anchor.BN(2));
    
    const tx = await program.methods
      .withdraw(sharesToWithdraw)
      .accounts({
        user: user.publicKey,
        vaultState: vault_state,
        userAccount: user_account,
        userUsdcAccount: user_token_account,
        vaultUsdcAccount: vault_token_account,
      })
      .signers([user])
      .rpc();

    // console.log("withdraw tx:", tx);
    
    const vaultStateAfter = await program.account.vaultState.fetch(vault_state) as any;
    const userAccountAfter = await program.account.userAccount.fetch(user_account) as any;
    
    const vaultTokenAccountAfter = await provider.connection.getTokenAccountBalance(vault_token_account);
    const userTokenAccountAfter = await provider.connection.getTokenAccountBalance(user_token_account);
    
    assert(
      userAccountAfter.shares.eq(userAccountBefore.shares.sub(sharesToWithdraw)),
      "User shares should decrease by the withdrawn amount"
    );
    
    assert(
      vaultStateAfter.totalShares.eq(vaultStateBefore.totalShares.sub(sharesToWithdraw)),
      "Vault total shares should decrease by the withdrawn amount"
    );
    
    const vaultTokenBefore = new anchor.BN(vaultTokenAccountBefore.value.uiAmount * Math.pow(10, vaultTokenAccountBefore.value.decimals));
    const vaultTokenAfter = new anchor.BN(vaultTokenAccountAfter.value.uiAmount * Math.pow(10, vaultTokenAccountAfter.value.decimals));
    assert(vaultTokenAfter.lt(vaultTokenBefore), "Vault token balance should decrease");
    
    const userTokenBefore = new anchor.BN(userTokenAccountBefore.value.uiAmount * Math.pow(10, userTokenAccountBefore.value.decimals));
    const userTokenAfter = new anchor.BN(userTokenAccountAfter.value.uiAmount * Math.pow(10, userTokenAccountAfter.value.decimals));
    assert(userTokenAfter.gt(userTokenBefore), "User token balance should increase");
  })

  it("admin", async () => {
    // test both pause and unpause functions

    let vaultState = await program.account.vaultState.fetch(vault_state) as any;
    
    const pauseTx = await program.methods
      .adminPause()
      .accounts({
        admin: authority.publicKey,
        vaultState: vault_state,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([authority])
      .rpc();
    
    // console.log("Pause tx:", pauseTx);
    
    vaultState = await program.account.vaultState.fetch(vault_state) as any;
    assert.equal(vaultState.paused, true, "Vault should be paused after pause operation");
    
    // now unpause
    const unpauseTx = await program.methods
      .adminUnpause()
      .accounts({
        admin: authority.publicKey,
        vaultState: vault_state,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([authority])
      .rpc();
    
    // console.log("Unpause tx:", unpauseTx);
    
    vaultState = await program.account.vaultState.fetch(vault_state) as any;
    assert.equal(vaultState.paused, false, "Vault should be unpaused after unpause operation");
    
    try {
      await program.methods
        .adminPause()
        .accounts({
          admin: user.publicKey, // Using regular user instead of admin
          vaultState: vault_state,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([user])
        .rpc();
      
      assert.fail("Unauthorized access should have failed");
    } catch (error) {
      assert(error.message?.includes("Unauthorized") || error.message?.includes("custom program error: 0x1771"), 
        "Expected an Unauthorized error");
    }
  })
});

/////////////             DEVNET
// import * as anchor from "@coral-xyz/anchor";
// import { Program } from "@coral-xyz/anchor";
// import { Datdev } from "../target/types/datdev";
// import { assert } from "chai";
// import { 
//   createAssociatedTokenAccount,
//   getAssociatedTokenAddress,
// } from "@solana/spl-token";
// import dotenv from 'dotenv';

// dotenv.config();

// const loadKeypairFromEnv = (jsonString) => {
//   try {
//     const secretKey = Uint8Array.from(JSON.parse(jsonString));
//     return anchor.web3.Keypair.fromSecretKey(secretKey);
//   } catch (e) {
//     console.log('Error loading keypair from environment variable:', e);
//     return null;
//   }
// };

// describe("datdev", () => {
//   // configure client to use the devnet cluster
//   const connection = new anchor.web3.Connection(
//     anchor.web3.clusterApiUrl('devnet'),
//     'confirmed'
//   );
  
//   // Load keypairs from .env file using the AUTHORITY_KEYPAIR and USER_KEYPAIR environment variables
//   const authorityKeypair = process.env.AUTHORITY_KEYPAIR 
//     ? loadKeypairFromEnv(process.env.AUTHORITY_KEYPAIR)
//     : anchor.web3.Keypair.generate();
  
//   const userKeypair = process.env.USER_KEYPAIR 
//     ? loadKeypairFromEnv(process.env.USER_KEYPAIR) 
//     : anchor.web3.Keypair.generate();
    
//   console.log("Authority public key:", authorityKeypair.publicKey.toString());
//   console.log("User public key:", userKeypair.publicKey.toString());
  
//   const walletWrapper = {
//     publicKey: authorityKeypair.publicKey,
//     signTransaction: async (tx) => {
//       tx.partialSign(authorityKeypair);
//       return tx;
//     },
//     signAllTransactions: async (txs) => {
//       return txs.map((tx) => {
//         tx.partialSign(authorityKeypair);
//         return tx;
//       });
//     }
//   };
  
//   // create a custom provider with our wallet wrapper
//   const customProvider = new anchor.AnchorProvider(connection, walletWrapper, {
//     commitment: 'confirmed',
//   });
  
//   // set the provider
//   anchor.setProvider(customProvider);
  
//   const program = anchor.workspace.Datdev as Program<Datdev>;
//   const provider = anchor.getProvider();

//   let vault_state: anchor.web3.PublicKey;
//   let vault_bump: number;

//   // Use USDC devnet token mint
//   let tokenMint = new anchor.web3.PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU");
  
//   let authority = authorityKeypair;
  
//   let user = userKeypair;

//   before(async ()=>{
//     console.log("Using pre-funded accounts for devnet testing:");
//     console.log("Authority:", authority.publicKey.toString());
//     console.log("User:", user.publicKey.toString());
//     console.log("Token mint (Devnet USDC):", tokenMint.toString());
    
//     try {
//       const authorityBalance = await provider.connection.getBalance(authority.publicKey);
//       const userBalance = await provider.connection.getBalance(user.publicKey);
      
//       console.log(`Authority SOL balance: ${authorityBalance / anchor.web3.LAMPORTS_PER_SOL} SOL`);
//       console.log(`User SOL balance: ${userBalance / anchor.web3.LAMPORTS_PER_SOL} SOL`);
      
//       if (authorityBalance < 0.5 * anchor.web3.LAMPORTS_PER_SOL || 
//           userBalance < 0.5 * anchor.web3.LAMPORTS_PER_SOL) {
//         console.warn("WARNING: Account balances are low, tests might fail");
//       }
//     } catch (err) {
//       console.error("Failed to check balances:", err);
//     }
    
//     try {
//       // if user has a token account for the test token
//       const userTokenAccount = await getAssociatedTokenAddress(
//         tokenMint,
//         user.publicKey
//       );
      
//       try {
//         const tokenAccountInfo = await provider.connection.getAccountInfo(userTokenAccount);
//         if (!tokenAccountInfo) {
//           console.log("Creating token account for user...");
//           // If using real USDC on devnet, you'll need to fund this account separately
//           await createAssociatedTokenAccount(
//             provider.connection,
//             user,
//             tokenMint,
//             user.publicKey
//           );
//         } else {
//           console.log("User token account exists");
//         }
//       } catch (err) {
//         console.error("Error checking user token account:", err);
//       }
//     } catch (err) {
//       console.error("Failed to setup token accounts:", err);
//     }

//     [vault_state, vault_bump] = await anchor.web3.PublicKey.findProgramAddressSync(
//       [
//         Buffer.from("vault"),
//         authority.publicKey.toBytes()      
//       ],
//       program.programId
//     );

//   })

//   it("Is initialized", async () => {
//     const usdcMint = tokenMint;
//     let performance_fee = 1000; 
//     let fee_bps = 50; 


//     const [token_list, token_list_bump] = await anchor.web3.PublicKey.findProgramAddressSync(
//       [
//         Buffer.from("tokenlist"),
//         vault_state.toBytes()
//       ],
//       program.programId
//     );

//     const tx = await program.methods
//       .initialize(usdcMint, fee_bps, performance_fee)
//       .accounts({
//         authority: authority.publicKey,
//         vaultState: vault_state,
//         tokenList: token_list
//       })
//       .signers([authority])
//       .rpc();
    
//     // console.log("transaction:", tx);

//     // fetch and verify vault state
//     const vaultStateAccount = await program.account.vaultState.fetch(vault_state) as any;
    
//     assert.equal(vaultStateAccount.admin.toString(), authority.publicKey.toString(), "admin should be authority");
//     assert.equal(vaultStateAccount.rebalancer.toString(), authority.publicKey.toString(), "Rebalancer should be authority");
//     assert.equal(vaultStateAccount.treasury.toString(), authority.publicKey.toString(), "Treasury should be authority");
//     assert.equal(vaultStateAccount.usdcMint.toString(), usdcMint.toString(), "USDC mint should match");
//     assert.equal(vaultStateAccount.tokenList.toString(), token_list.toString(), "Token list should match");
//     assert.equal(vaultStateAccount.totalShares.toNumber(), 0, "Total shares should be 0");
//     assert.equal(vaultStateAccount.totalValueUsdc.toNumber(), 0, "Total value should be 0");
//     assert.equal(vaultStateAccount.feeBps, fee_bps, "Fee BPS should match");
//     assert.equal(vaultStateAccount.performanceFeeBps, performance_fee, "Performance fee should match");
//     assert.equal(vaultStateAccount.paused, false, "Vault should not be paused");
//     assert.equal(vaultStateAccount.bump, vault_bump, "Bump should match");

//     // verify token list
//     const tokenListAccount = await program.account.tokenList.fetch(token_list) as any;
    
//     assert.equal(tokenListAccount.vault.toString(), vault_state.toString(), "Token list vault should match");
//     assert.equal(tokenListAccount.tokenCount, 0, "Token count should be 0");
//     assert.equal(tokenListAccount.bump, token_list_bump, "Token list bump should match");

//     // console.log(" vault State:", vault_state.toString());
//     // console.log(" token List:", token_list.toString());
//     // console.log(" admin:", authority.publicKey.toString());
//   });

//   it("add_token", async () => {
//     let weight_bps = 5000; // 50% weight
//     const mint = tokenMint;

//     const [token_list, _token_list_bump] = await anchor.web3.PublicKey.findProgramAddressSync(
//       [
//         Buffer.from("tokenlist"),
//         vault_state.toBytes()
//       ],
//       program.programId
//     );

//     // derive token_entry PDA
//     const [token_entry, token_entry_bump] = await anchor.web3.PublicKey.findProgramAddressSync(
//       [
//         Buffer.from("tokenentry"),
//         token_list.toBytes(),
//         mint.toBytes()
//       ],
//       program.programId
//     );

//     // derive vault token account
//     const vault_token_account = await anchor.utils.token.associatedAddress({
//       mint: mint,
//       owner: vault_state
//     });

//     const tx = await program.methods
//       .addToken(weight_bps)
//       .accounts({
//         authority: authority.publicKey,
//         vaultState: vault_state,
//         tokenList: token_list,
//         tokenEntry: token_entry,
//         mint: mint,
//         vaultTokenAccount: vault_token_account,
//       })
//       .signers([authority])
//       .rpc();

//       // console.log("tx: ",tx);

//     // fetch and verify token entry
//     const tokenEntryAccount = await program.account.tokenEntry.fetch(token_entry) as any;
    
//     assert.equal(tokenEntryAccount.tokenList.toString(), token_list.toString(), "Token list should match");
//     assert.equal(tokenEntryAccount.mint.toString(), mint.toString(), "Mint should match");
//     assert.equal(tokenEntryAccount.vaultTokenAccount.toString(), vault_token_account.toString(), "Vault token account should match");
//     assert.equal(tokenEntryAccount.weightBps, weight_bps, "Weight BPS should match");
//     assert.equal(tokenEntryAccount.isActive, true, "Token should be active");
//     assert.equal(tokenEntryAccount.bump, token_entry_bump, "Bump should match");

//     // verify token list was updated
//     const tokenListAccount = await program.account.tokenList.fetch(token_list) as any;
//     assert.equal(tokenListAccount.tokenCount, 1, "Token count should be 1");

//     // console.log("Token entry:", token_entry.toString());
//     // console.log("Mint:", mint.toString());
//     // console.log("Weight:", weight_bps, "BPS");
//   });

//   it("update_weights", async () => {
//     const mint = tokenMint;
//     const newWeightBps = 10000; // 100% weight for our single token

//     const [token_list] = anchor.web3.PublicKey.findProgramAddressSync(
//       [
//         Buffer.from("tokenlist"),
//         vault_state.toBytes()
//       ],
//       program.programId
//     );
    
//     const [token_entry] = anchor.web3.PublicKey.findProgramAddressSync(
//       [
//         Buffer.from("tokenentry"),
//         token_list.toBytes(),
//         mint.toBytes()
//       ],
//       program.programId
//     );

//     const tokenEntryBefore = await program.account.tokenEntry.fetch(token_entry) as any;
    
//     const newWeights = [{
//       mint: mint,
//       weight: newWeightBps
//     }];
    
//     const tx = await program.methods
//       .updateWeights(newWeights)
//       .accounts({
//         authority: authority.publicKey,
//         vaultState: vault_state,
//         tokenList: token_list,
//         systemProgram: anchor.web3.SystemProgram.programId,
//       })
//       .remainingAccounts([
//         {
//           pubkey: token_entry,
//           isSigner: false,
//           isWritable: true
//         }
//       ])
//       .signers([authority])
//       .rpc();
    
//     // console.log("update weights tx", tx);
    
//     const tokenEntryAfter = await program.account.tokenEntry.fetch(token_entry) as any;
    
//     assert.equal(tokenEntryAfter.weightBps, newWeightBps, "Token weight should be updated to the new value");
//     assert.notEqual(tokenEntryAfter.weightBps, tokenEntryBefore.weightBps, "Token weight should be different than before");
    
//     assert.equal(tokenEntryAfter.tokenList.toString(), tokenEntryBefore.tokenList.toString(), "Token list reference shouldn't change");
//     assert.equal(tokenEntryAfter.mint.toString(), tokenEntryBefore.mint.toString(), "Token mint shouldn't change");
//     assert.equal(tokenEntryAfter.vaultTokenAccount.toString(), tokenEntryBefore.vaultTokenAccount.toString(), "Vault token account shouldn't change");
//     assert.equal(tokenEntryAfter.isActive, tokenEntryBefore.isActive, "Active status shouldn't change");
//     assert.equal(tokenEntryAfter.bump, tokenEntryBefore.bump, "Bump shouldn't change");
//   })

//   it("deposit", async () => {
//     const mint = tokenMint;
//     const depositAmount = new anchor.BN(1_000_000); // 1 token (assuming 6 decimals)

//     const vault_token_account = await anchor.utils.token.associatedAddress({
//       mint: mint,
//       owner: vault_state
//     })

//     const user_token_account = await getAssociatedTokenAddress(
//       mint,
//       user.publicKey
//     );
    
//     const [user_account, _user_bump] = await anchor.web3.PublicKey.findProgramAddressSync(
//       [Buffer.from("user"), user.publicKey.toBytes(), vault_state.toBytes()],
//       program.programId
//     );
    
//     const tx = await program.methods
//       .deposit(depositAmount)
//       .accounts({
//         user: user.publicKey,
//         vaultState:vault_state,
//         userAccount: user_account,
//         userTokenAccount:user_token_account,
//         vaultTokenAccount: vault_token_account,
//       })
//       .signers([user])
//       .rpc();
//     // console.log("deposit tx:", tx);

//     const vaultStateAccount = await program.account.vaultState.fetch(vault_state) as any;
//     assert(vaultStateAccount.totalShares.toNumber() > 0, "Total shares should increase");
//     assert(vaultStateAccount.totalValueUsdc.toNumber() >= 0, "Total value should be non-negative");

//     // const userTokenAcc = await program.provider.connection.getTokenAccountBalance(user_token_account);
//     // console.log("user token account balance after deposit:", userTokenAcc.value.amount);
//   })

//   it("rebalance", async () => {
//     const vaultStateBefore = await program.account.vaultState.fetch(vault_state) as any;
    
//     const newTotalValue = new anchor.BN(2_000_000); // 2 tokens worth of USDC
    
//     const [token_list] = await anchor.web3.PublicKey.findProgramAddressSync(
//       [Buffer.from("tokenlist"), vault_state.toBytes()],
//       program.programId
//     );
//     const tx = await program.methods
//       .rebalance(newTotalValue)
//       .accounts({
//         authority: authority.publicKey,
//         vaultState: vault_state,
//         tokenList: token_list,
//         systemProgram: anchor.web3.SystemProgram.programId,
//       })
//       .signers([authority])
//       .rpc();

//     // console.log("Rebalance tx:", tx);
    
//     const vaultStateAfter = await program.account.vaultState.fetch(vault_state) as any;
    
//     assert(vaultStateAfter.totalValueUsdc.eq(newTotalValue), "Total value USDC should be updated to the new value");
//     assert.notEqual(vaultStateAfter.totalValueUsdc.toString(), vaultStateBefore.totalValueUsdc.toString(), 
//       "Total value USDC should change after rebalance");
    
//     assert(vaultStateAfter.lastRebalance > 0, "Last rebalance timestamp should be set");
    
//     if (vaultStateBefore.lastRebalance) {
//       assert.notEqual(vaultStateAfter.lastRebalance.toString(), vaultStateBefore.lastRebalance.toString(), 
//         "Last rebalance timestamp should change");
//     }
//   })

//   it("withdraw", async () => {
//     const vault_token_account = await anchor.utils.token.associatedAddress({
//       mint: tokenMint,
//       owner: vault_state
//     });

//     const user_token_account = await getAssociatedTokenAddress(
//       tokenMint,
//       user.publicKey
//     );
    
//     const [user_account, _user_bump] = await anchor.web3.PublicKey.findProgramAddressSync(
//       [Buffer.from("user"), user.publicKey.toBytes(), vault_state.toBytes()],
//       program.programId
//     );

//     // fetch before balances
//     const vaultStateBefore = await program.account.vaultState.fetch(vault_state) as any;
//     const userAccountBefore = await program.account.userAccount.fetch(user_account) as any;
    
//     const vaultTokenAccountBefore = await provider.connection.getTokenAccountBalance(vault_token_account);
//     const userTokenAccountBefore = await provider.connection.getTokenAccountBalance(user_token_account);
    
//     const sharesToWithdraw = userAccountBefore.shares.div(new anchor.BN(2));
    
//     const tx = await program.methods
//       .withdraw(sharesToWithdraw)
//       .accounts({
//         user: user.publicKey,
//         vaultState: vault_state,
//         userAccount: user_account,
//         userUsdcAccount: user_token_account,
//         vaultUsdcAccount: vault_token_account,
//       })
//       .signers([user])
//       .rpc();

//     // console.log("withdraw tx:", tx);
    
//     const vaultStateAfter = await program.account.vaultState.fetch(vault_state) as any;
//     const userAccountAfter = await program.account.userAccount.fetch(user_account) as any;
    
//     const vaultTokenAccountAfter = await provider.connection.getTokenAccountBalance(vault_token_account);
//     const userTokenAccountAfter = await provider.connection.getTokenAccountBalance(user_token_account);
    
//     assert(
//       userAccountAfter.shares.eq(userAccountBefore.shares.sub(sharesToWithdraw)),
//       "User shares should decrease by the withdrawn amount"
//     );
    
//     assert(
//       vaultStateAfter.totalShares.eq(vaultStateBefore.totalShares.sub(sharesToWithdraw)),
//       "Vault total shares should decrease by the withdrawn amount"
//     );
    
//     const vaultTokenBefore = new anchor.BN(vaultTokenAccountBefore.value.uiAmount * Math.pow(10, vaultTokenAccountBefore.value.decimals));
//     const vaultTokenAfter = new anchor.BN(vaultTokenAccountAfter.value.uiAmount * Math.pow(10, vaultTokenAccountAfter.value.decimals));
//     assert(vaultTokenAfter.lt(vaultTokenBefore), "Vault token balance should decrease");
    
//     const userTokenBefore = new anchor.BN(userTokenAccountBefore.value.uiAmount * Math.pow(10, userTokenAccountBefore.value.decimals));
//     const userTokenAfter = new anchor.BN(userTokenAccountAfter.value.uiAmount * Math.pow(10, userTokenAccountAfter.value.decimals));
//     assert(userTokenAfter.gt(userTokenBefore), "User token balance should increase");
//   })

//   it("admin", async () => {
//     // test both pause and unpause functions

//     let vaultState = await program.account.vaultState.fetch(vault_state) as any;
    
//     const pauseTx = await program.methods
//       .adminPause()
//       .accounts({
//         admin: authority.publicKey,
//         vaultState: vault_state,
//         systemProgram: anchor.web3.SystemProgram.programId,
//       })
//       .signers([authority])
//       .rpc();
    
//     // console.log("Pause tx:", pauseTx);
    
//     vaultState = await program.account.vaultState.fetch(vault_state) as any;
//     assert.equal(vaultState.paused, true, "Vault should be paused after pause operation");
    
//     // now unpause
//     const unpauseTx = await program.methods
//       .adminUnpause()
//       .accounts({
//         admin: authority.publicKey,
//         vaultState: vault_state,
//         systemProgram: anchor.web3.SystemProgram.programId,
//       })
//       .signers([authority])
//       .rpc();
    
//     // console.log("Unpause tx:", unpauseTx);
    
//     vaultState = await program.account.vaultState.fetch(vault_state) as any;
//     assert.equal(vaultState.paused, false, "Vault should be unpaused after unpause operation");
    
//     try {
//       await program.methods
//         .adminPause()
//         .accounts({
//           admin: user.publicKey, // Using regular user instead of admin
//           vaultState: vault_state,
//           systemProgram: anchor.web3.SystemProgram.programId,
//         })
//         .signers([user])
//         .rpc();
      
//       assert.fail("Unauthorized access should have failed");
//     } catch (error) {
//       assert(error.message?.includes("Unauthorized") || error.message?.includes("custom program error: 0x1771"), 
//         "Expected an Unauthorized error");
//     }
//   })
// });
