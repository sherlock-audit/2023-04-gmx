
# GMX Update contest details

- Join [Sherlock Discord](https://discord.gg/MABEWyASkp)
- Submit findings using the issue page in your private contest repo (label issues as med or high)
- [Read for more details](https://docs.sherlock.xyz/audits/watsons)

# Q&A

### Q: On what chains are the smart contracts going to be deployed?
Arbitrum, Avalanche, more chains may be added later
___

### Q: Which ERC20 tokens do you expect will interact with the smart contracts? 
Whitelisted
___

### Q: Which ERC721 tokens do you expect will interact with the smart contracts? 
None
___

### Q: Which ERC777 tokens do you expect will interact with the smart contracts? 
None
___

### Q: Are there any FEE-ON-TRANSFER tokens interacting with the smart contracts?

None
___

### Q: Are there any REBASING tokens interacting with the smart contracts?

None
___

### Q: Are the admins of the protocols your contracts integrate with (if any) TRUSTED or RESTRICTED?
RESTRICTED
___

### Q: Is the admin/owner of the protocol/contracts TRUSTED or RESTRICTED?
RESTRICTED
___

### Q: Are there any additional protocol roles? If yes, please explain in detail:
Roles are managed in the RoleStore, the RoleAdmin has access to grant and revoke any role.

The RoleAdmin will be the deployer initially, but this should be removed after roles have been setup.

After the initial setup:

- Only the Timelock contract should have the RoleAdmin role
- New roles can be granted by timelock admins with a time delay
- System values should only be set using the Config contract
- No EOA should have a Controller role
- Config keepers and timelock admins could potentially disrupt regular operation through the disabling of features, incorrect setting of values, whitelisting malicious tokens, abusing the positive price impact value, etc
- It is expected that the timelock multisig should revoke the permissions of malicious or compromised accounts
- Oracle signers are expected to accurately report the price of tokens
___

### Q: Is the code/contract expected to comply with any EIPs? Are there specific assumptions around adhering to those EIPs that Watsons should be aware of?
None
___

### Q: Please list any known issues/acceptable risks that should not result in a valid finding.
- Collateral tokens need to be whitelisted with a configured TOKEN_TRANSFER_GAS_LIMIT

- Rebasing tokens, tokens that change balance on transfer, with token burns, etc, are not compatible with the system and should not be whitelisted

- Order keepers can use prices from different blocks for limit orders with a swap, which would lead to different output amounts

- Order keepers are expected to validate whether a transaction will revert before sending the transaction to minimize gas wastage

- Order keepers may cause requests to be cancelled instead of executed by executing the request with insufficient gas

- A user can reduce price impact by using high leverage positions, this is partially mitigated with the MIN_COLLATERAL_FACTOR_FOR_OPEN_INTEREST_MULTIPLIER value

- Price impact can be reduced by using positions and swaps and trading across markets, chains, forks, other protocols, this is partially mitigated with virtual inventory tracking

- Virtual IDs must be set on market creation / token whitelisting, if it is set after trading for the token / market is done, the tracking would not be accurate and may need to be adjusted

- If an execution transaction requires a large amount of gas that may be close to the maximum block gas limit, it may be possible to stuff blocks to prevent the transaction from being included in blocks

- In certain blockchains it is possible for the keeper to have control over the tx.gasprice used to execute a transaction

___

### Q: Please provide links to previous audits (if any).
Guardian audit: https://github.com/GuardianAudits/Audits/blob/main/GMX/GMX_Synthetics_Audit_3.pdf

Sherlock audit: https://github.com/sherlock-audit/2023-02-gmx-judging/issues
___

### Q: Are there any off-chain mechanisms or off-chain procedures for the protocol (keeper bots, input validation expectations, etc)?
There are order keepers and oracle keepers described in https://github.com/gmx-io/gmx-synthetics/blob/fix-review/README.md
___

### Q: In case of external protocol integrations, are the risks of external contracts pausing or executing an emergency withdrawal acceptable? If not, Watsons will submit issues related to these situations that can harm your protocol's functionality.
There are Chainlink price feeds, in case those are paused it may result in stale pricing or reverting transactions, the affected markets are expected to be paused during this time, we view the chance of this to be small enough for it to be considered a known issue and we expect such pauses to be short if ever they occur
___



# Audit scope

