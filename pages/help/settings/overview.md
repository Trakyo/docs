---
title: Settings
description: Name your account, set your timezone and currency, invite new users, and choose how Trakyo talks about your numbers.
order: 1
draft: true
---

Settings holds everything about the account itself, across four tabs:

- **General** — your brand name, invite link, timezone, currency, the words **Trakyo** uses
  for your numbers, the theme, and cancelling or deleting the account.
- **Profile** — your own email address, role and sign-in dates.
- **Self-reported** — what buyers answered when asked how they heard about you, and which
  source each answer counts as.
- **Spend** — what you pay for your sources and content, so the dashboard can show what a
  customer costs you.

---

## General

### Company / Brand Name

The company or brand name that identifies your account. Click **Edit** to change it.

![The company or brand name in Settings](./settings-brand-name.png)

---

### Invite link

Your account's own sign-up link. Share it and anyone who opens it can create a **Trakyo**
account.

![The invite link in Settings](./settings-invite-link.png)

:::warning
An account created through your link becomes a child account of yours, under your agency.
:::

---

### Regional settings

Choose your timezone, or leave **Auto-detect from browser** ticked and **Trakyo** follows
the device you are on. This is what every date and time in your account is shown in.

![The regional settings in Settings](./settings-regional.png)

---

### Display currency

Choose the currency your account shows amounts in.

![The display currency in Settings](./settings-currency.png)

:::tip
A payment taken in another currency is converted for you, at the exchange rate on that
transaction's own date — not today's.
:::

---

### Business type

This sets the words **Trakyo** uses for your numbers, on your dashboard, across the other
pages, and when your AI assistant talks about your data.

- **Creator or info product** — opt-ins, bookings, cash collected.
- **Software (SaaS)** — leads, demos booked, revenue.

![The business type in Settings](./settings-business-type.png)

:::note
It applies to everyone on the account, and it changes the words rather than your data or
your API. CSV exports use the same words in their column headers.
:::

---

### Appearance

Choose a **Light** or **Dark** theme, or **System** to follow whatever your computer is
set to.

![The appearance settings](./settings-appearance.png)

---

### Cancel your account

Cancelling signs you out and marks the account as cancelled. Nothing is deleted — your
leads, tracking data and integrations all stay as they are, and you can reactivate at any
time.

![Cancelling an account](./settings-cancel.png)

---

### Delete your account

Deleting is the other option, and it is permanent.

:::danger
Deleting an account cannot be undone. **Trakyo** asks you to type `DELETE MY ACCOUNT` to
confirm.
:::

Deleting will:

- sign you out and block any further sign-in, for you and for your team,
- disconnect your integrations, so **Trakyo** stops pulling in data from Stripe, Meta,
  YouTube and the rest,
- stop your short links redirecting,
- stop your API keys working, including any your team created,
- end your access to leads, transactions and analytics.

Anyone on your team who also belongs to another **Trakyo** account can still sign in,
though they may need our help to reach it.

![Deleting an account](./settings-delete.png)

**Before you delete, remove these by hand.** If you use custom domains: your Cloudflare
workers, the fingerprint DNS records in Cloudflare, your GoHighLevel domains and DNS, and
the shortlink workers in Cloudflare. For other integrations: Cloudflare API tokens and
workers, GoHighLevel OAuth access, your Resend domain, and the Commas and Teachable
webhooks.

:::note
Stripe, Calendly, Typeform, Kit, Whop and YouTube disconnect themselves as part of the
deletion. There is nothing to do for those.
:::

Two more things:

- If you or anyone on your team also works on another **Trakyo** account, email
  **[support@trakyo.io](mailto:support@trakyo.io)** before deleting, so we can make sure
  they land on the right account afterwards.
- If the **Trakyo** tracking script is on your site, take it out. Until you do, your pages
  keep sending visits to **Trakyo**.

To have your data erased permanently, email
**[support@trakyo.io](mailto:support@trakyo.io)** and we will action it.

---

## Profile

What **Trakyo** holds about you: your email address, your role on this account, the date
you joined and when you last signed in. It is there to read, not to edit.

![The Profile tab](./settings-profile.png)

:::note
To change an email address, see **[Team](/docs/help/settings/team)**.
:::

---

## Self-reported

Some buyers never click a tracked link — they heard you on a podcast, or a friend sent
them. This tab is where you turn what they tell you into a source.

![The Self-reported tab](./settings-self-reported.png)

### Where the answers come from

An answer reaches **Trakyo** from any of these, once you pick the question or field:

- **Bookings** — Calendly, HubSpot Meetings, GoHighLevel calendars and iClosed. You choose
  your existing "How did you hear about us?" question on that integration's card.
- **Forms** — Typeform and Tally. You choose the form's source field.
- **Custom webhooks** — the form, booking and transaction webhooks take an optional
  `self_reported_source` field.
- **Trakyo checkout pages** — an optional question on the first step of Stripe and Whop
  checkouts. Switch it to Required or Off here.

### Map the answers to a source

Every answer people gave is listed on this tab. Map each one to the source it names: a
platform, one of your custom sources, or a single piece of content. So "YT", "youtube" and
"saw your video" can all point at YouTube.

Answers that differ only in capitals, spaces or punctuation share one mapping, and a
mapping covers the answers already collected as well as new ones.

:::warning
Mapping never relabels a payment. It stays **Self-reported**, kept apart from the revenue
**Trakyo** tracked itself.
:::

### What it does not do

- **A tracked source always wins.** An answer only fills a gap, and it never changes a sale
  **Trakyo** already tracked. Your totals do not move — revenue shifts out of **Other**
  into **Self-reported**.
- **Nothing is backfilled.** Answers count from the moment you pick the question. A new
  answer can still credit that person's own earlier untracked payments.
- **A buyer who skips the question stays unattributed.**
- **The dashboard shows one Self-reported row**, not a split by mapped source. The mapping
  shows here and on each lead.
- **The checkout question's wording is fixed**, and renewals are not asked again. Setting
  it to Required adds a step to your checkout, so Optional is the safer choice.

---

## Spend

Everything you spend on your sources and content, in one place, so the dashboard can show
what a customer costs you.

![The Spend tab](./settings-spend.png)

### Add an amount

Click **Add spend** and fill in the dialog:

1. **Source** — which source the money went on.
2. **Applies to** — **The whole source**, one amount for everything that source does, or
   **One content item**, a video, a post or a link with its own cost.
3. **Amount** and **Currency**.
4. **Dates** — optional. Left alone, the amount is counted in full whatever dates the
   dashboard is showing. Click **Add dates** to give it a range, and it is spread evenly
   across those days instead. The picker offers This month, Last month, Month to date, Last
   30 days and Year to date.
5. **Note** — optional, for your own reference: an editor, a sponsorship, a retainer.

Then click **Save spend**.

:::note
Meta ad spend syncs on its own, so Meta sources take no manual entry.
:::

![The Add spend dialog](./settings-add-spend.png)

:::warning
For any one source, spend goes either on the whole source or on its content items, never
both. That is what stops the same money being counted twice.
:::

### Where else you can enter it

You do not have to come here. Spend can be entered wherever you see the source or the
content item: on the **YouTube Tracking** page, and in the Spend cells of your dashboard.
This tab is simply the list of everything you have entered.

### What the dashboard does with it

Once there is spend to work with, the dashboard can show:

- **Cost per booking**.
- **CAC** — spend divided by new customers.
- **Return on spend** — revenue divided by spend.
- **Booking → customer** rate.

:::note
These are opt-in widgets. Add them to your dashboard to see them.
:::

Each of those carries a "How it's calculated" explainer and a breakdown by source. The
**Sources** table gains spend, cost per booking, CAC and ROAS alongside revenue and
bookings, and each row opens to show how that source is credited under first touch, last
touch and linear side by side, with a tag for whether it starts deals, closes them, or
both. **Top content** ranks your content by revenue with the same cost columns.

---

:::info
Learn more about the **[Dashboard](/docs/help/dashboard/overview)** here.
:::
