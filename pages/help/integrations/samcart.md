---
title: SamCart
description: Let Trakyo read the real total of a SamCart order, so order bumps and upsells are counted.
order: 10
draft: true
---

The **Trakyo** integration with SamCart reads the real total of each order, so revenue is
right on carts that include order bumps or upsells.

![SamCart and Trakyo](./samcart-trakyo.png)

:::warning
API access is a SamCart Pro and Enterprise feature. If you have no **API Keys** page, your
plan does not include it.
:::

---

## Get your SamCart API key

1. In SamCart, open **[Settings → API Keys](https://app.samcart.com/settings/api-keys)**.
   If you are not an admin, it is under **User Profile** → **API Keys**.
2. Click **Generate new key** and name it `Trakyo`.
3. Choose **Read only**. **Trakyo** never writes to SamCart.
4. Copy the key straight away — SamCart shows it once.

---

## Connect it in Trakyo

Open the **[Integrations](https://app.trakyo.io/integrations)** page in **Trakyo**, find the
SamCart card, paste the key in, and connect.

---

## Test the integration

1. Find a recent order that included an order bump or an upsell.
2. Open **[Transactions](https://app.trakyo.io/transactions)** in **Trakyo** and find that
   order.
3. Check the amount matches the full total the customer paid, not just the base product.

---

:::info
Learn more about the **[Transactions page](/docs/help/transactions/overview)** here.
:::
