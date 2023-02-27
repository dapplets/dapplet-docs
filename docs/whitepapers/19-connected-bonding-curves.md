---
id: connected-bonding-curves
title: 'Connected Bonding Curves'
---

In the AUGE ecosystem there can be many tokens independently owned by different dapplets (DAPP tokens) each one connected to its own Bonding Curve. These curves can be parameterized independently as shown below.

### Parameter: INITIAL_SUPPLY

A token creator (a dapplet Owner) may want to buy (mint) an initial batch of tokens. It makes sense:

- for the project in general: to set up a reasonable initial token price;
- for the dapplet Owner to buy an initial supply at a lower price;
- for Auditors stake and partner rewards.

### Parameter: RESERVATION_RATIO (as a function of the minted amount)

The Bonding Curve for the application may have a much lower degree polynomial, and thus a much higher reservation ratio which goes down when the amount of tokens minted rises. This means that:

- when minted amounts are low the reservation ratio may almost be equal to 1, which means that all the value of the DAPP token gets translated into the AUGE token. This makes sense for new applications whose own added value is still quite low.
- when minted amounts are higher the reservation ratio gets lower and lower, which means that more and more incoming value translates into the DAPP token price. This creates an incentive for the dapplet developer to raise the capitalization of his DAPP token.

Later we can target the DAO based configuration of the Reservation Ratio, which allows the Community to balance their interests between attracting new DAPP developers and overall platform capitalization.

| Capitalization | Example Reservation Ratio | Meaning                                                                                                                                                                      |
| :------------: | :-----------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   < X1 AUGE    |             1             | A new dapplet with low own capitalization and visibility. The DAPP benefits from the reputation of the AUGE. The DAPP token is 1:1 connected to the AUGE token.              |
|   < X2 AUGE    |            0.5            | Healthy balance of interests between AUGE and DAPP.                                                                                                                          |
|   < X3 AUGE    |            0.1            | Matured Dapplet with high own capitalization and visibility. The AUGE Ecosystem benefits from its high reputation. Most incoming value translates into the DAPP token price. |

The real values of X1, X2 and X3 are threshold amounts of AUGE token set by a Dapplets DAO.
