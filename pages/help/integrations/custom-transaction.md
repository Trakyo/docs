---
title: Custom Transaction
description: Record payments Trakyo does not collect automatically, so they count toward your revenue and attribution.
order: 8
---

The **Trakyo** Custom Transaction integration records payments that reach you outside a
connected payment processor, so they count toward your revenue and are attributed to the
content that produced them.

![Payment tools and Trakyo](./custom-transaction-trakyo.png)

:::tip
Use it for:

- wire and bank transfers, Zelle and cash,
- crypto payments,
- invoices and payment plans you collect by hand,
- any payment processor **Trakyo** does not integrate with.

Send each payment from Zapier, Make, n8n, or a direct HTTP POST.
:::

---

## How it works

1. A payment reaches you somewhere **Trakyo** cannot see — a bank transfer, an invoice, a
   wallet.
2. Your automation POSTs the payment to your Trakyo webhook.
3. **Trakyo** matches it to the lead, by `trakyo_id` if you send one, otherwise by email
   address.
4. The payment appears in your transactions and counts toward that content's revenue.

Use whatever tool you like for step two, as long as it can trigger on the payment and send
the required fields.

---

## Send the payment to Trakyo

:::warning
The webhook URL is unique to your account. Copy it from the Custom Transaction card on the
**[Integrations](https://app.trakyo.io/integrations)** page rather than from anywhere else.
:::

Send a POST request with a JSON body. All five of these fields are required:

### Mandatory fields

```json
{
  "email": "customer@example.com",
  "amount": 49.99,
  "currency": "USD",
  "payment_processor": "PayPal",
  "external_id": "txn_abc123"
}
```

**`payment_processor`** is the name shown against the payment on your dashboard. Send
whatever you would call it — "Stripe", "PayPal", "Bank Transfer". Make sure the payment
processor's name is there, so the payment is not filed under Unknown.

**`external_id`** is how **Trakyo** tells a repeated delivery from a second payment. Send a
value that is different for every payment, such as the payment's own id from your
processor. `transaction_id` works as an alias.

:::danger
Do not map a plan name, a product id, or any fixed value to `external_id`. Payments after
the first would be treated as repeats of it and never recorded.
:::

### Optional fields

Everything beyond those five is optional. Use `metadata` for anything else worth keeping —
an invoice id, a product name. Send the buyer's `trakyo_id`, from your checkout page's
`window.trakyo_id`, at the top level or inside `metadata` to tie the payment to the clicks
and visits that led to it.

```json
{
  "email": "customer@example.com",
  "amount": 49.99,
  "currency": "USD",
  "payment_processor": "PayPal",
  "name": "Jane Doe",
  "phone": "+1234567890",
  "external_id": "txn_abc123",
  "created_at": "2026-09-25T14:30:00Z",
  "trakyo_id": "{{trakyo_id if available}}",
  "metadata": {
    "invoice_id": "INV-001",
    "product": "Course Access"
  }
}
```

Send `created_at` — the real payment date, in ISO 8601 — whenever you have it. Without it a
payment is dated when it reaches **Trakyo**, not when it happened.

:::note
Zapier needs a paid plan for this: webhook steps are not available on its free tier.
:::

---

## What protects your figures

**Repeated deliveries are ignored.** A payment whose `external_id` has been seen before is
dropped automatically, so an automation that re-sends — or a tool that replays old
records — cannot book the same money twice as new revenue dated today.

**Payments are matched by email** when no `trakyo_id` is sent. If someone opts in with one
address and pays with another, the payment will not join their journey. That is the usual
reason a payment arrives but shows no attribution.

:::warning
If a CRM webhook already reports your closed deals, do not send the same payments here as
well — both would claim the same sale and your revenue would double. Pick one source per
payment.
:::

---

## Test the integration

1. Send one test payment through your automation, with a unique `external_id`.
2. Open **[Transactions](https://app.trakyo.io/transactions)** in **Trakyo** and check it is
   listed, with the right amount, currency and date.
3. Open the lead it belongs to and check the payment sits on their journey with its
   attribution.
4. Send the same payload again. Nothing new should appear — that is deduplication working.

---

:::info
Learn more about the **[Transactions page](/docs/help/transactions/overview)** here.
:::
