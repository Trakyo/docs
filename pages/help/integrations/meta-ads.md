---
title: Meta Ads
description: Attribute sales to your Facebook and Instagram ads, with spend and ROAS.
order: 2
---

The **Trakyo** integration with Meta Ads attributes leads and sales to the Facebook and
Instagram ads that produced them, and brings in spend so you can read ROAS per campaign,
ad set and ad.

![Meta and Trakyo](./meta-trakyo.png)

:::warning
Meta Ads tracking only works when your ads send people to a landing page that has the
Trakyo script in its header. If an ad sends people somewhere inside Meta — an Instagram
profile, for example — or to a YouTube video, there is no page for Trakyo to track and
attribution is not available.
:::

---

## Connect your Meta account

Open the **[Integrations](https://app.trakyo.io/integrations)** page in **Trakyo** and click
**Connect** on the Meta Ads card to start.

1. Log in to your Meta Business Manager.

![Logging in to Meta](./meta-login.png)

2. Choose the business assets to share with **Trakyo**:
   1. **Business portfolio** — required.
   2. **Ad Account** — required.
   3. **Page**, **Instagram Account** and **Dataset** — optional.
3. Click **Next** to finish.

![Selecting the business assets to share with Trakyo](./meta-select-assets.png)

:::tip
If you create a pixel during this step, always create a **new one for Trakyo**. It does not
deduplicate data against your existing Meta pixel, so sharing one mixes the two.

If you would rather not feed your pixel with data from **Trakyo**, do not create a pixel at
all. Data then goes only to Trakyo, which is what gives you the full lead journey — and
that is what lets you tell a lead whose first touch was organic content and last touch was
an ad from one who came the other way round.
:::

:::note
You can connect several Meta Business Manager accounts. Click **Connect another Meta
account** to add the next one.
:::

---

## Add URL parameters to your ads

Once the account is connected, **Trakyo** walks you through a one-time change in Meta Ads
Manager so every click lines up with the ad that paid for it. Copy the URL parameters it
gives you.

![The Meta ad tracking set-up in Trakyo](./meta-url-parameters-trakyo.png)

Then, in Meta Ads Manager:

1. Open your campaign and go to **Campaigns** → **Ad sets** → **Ads**.

![The Campaigns, Ad sets and Ads tabs in Meta Ads Manager](./meta-ads-tabs.png)

2. Select every ad with the checkbox at the top left of the list.
3. Open the dropdown next to **Edit**, scroll to the bottom, and choose **URL parameters**.

![Finding URL parameters in the Edit dropdown](./meta-url-parameters-meta.png)

4. Paste the parameters into the box at the top right, on the **Edit all selected ads** row,
   to apply them to every ad at once. If your ads already carry parameters, add Trakyo's to
   the end of what is there, joined with an `&` — your existing UTMs and pixels keep working
   alongside them.
5. Click **Save to draft**, then **Publish changes**.

![Pasting the parameters into every selected ad](./meta-paste-parameters.png)

:::warning
Adding tracking parameters to an ad that is already running **resets its learning phase**
and the performance data it has built up. To avoid that, apply the parameters to a new
batch of ads rather than running ones, or connect in receive-only mode, where Trakyo takes
data in without feeding anything back to the pixel.
:::

---

## Best practice — which pixel to send to

Every advertiser has a Meta pixel, which Meta also calls a dataset. Think of it as your
inbox at Meta for conversions. Your website already drops events in there — someone
registered, someone bought. **Trakyo**'s Conversions API drops our copy of those same
conversions into whichever pixel you pick in the app.

:::danger
Meta only merges two reports of the same conversion when both carry the same event id. A
website event and a **Trakyo** event never share one, so Meta counts both. The same
registration becomes two rows, and your cost per registration reads as half of what it
really is — which is an easy number to scale a budget on.
:::

So the rule is simple: never send **Trakyo** into a pixel your website is already sending
the same events to. There are two clean setups.

1. **A new dataset for Trakyo.** In Meta Events Manager, create an empty dataset, name it
   `Trakyo`, and pick that one in the **Add dataset** dialog. This is the one we recommend.
2. **One pixel, one sender.** Keep your existing pixel, and turn those events off on your
   website, so **Trakyo** is the only thing sending them.

Before you connect the Conversions API, ask yourself one question: does my website already
send Lead, Purchase, Schedule or CompleteRegistration to this pixel? If the answer is yes,
or you are not sure, make a new dataset.

:::note
**Send Trakyo's default events** starts unchecked in the **Add dataset** dialog. Leave it
that way unless you know your website is not already sending those events to that pixel.
:::

If your Meta numbers suddenly double after connecting **Trakyo**, this is the first thing
to check.

---

## Test the integration

1. Open the **[Meta Ad Library](https://www.facebook.com/ads/library/)** and find your ad.
2. Click it and go through the flow exactly as a lead would — the landing page, the form,
   and the booking if you have one.
3. Open **[Leads](https://app.trakyo.io/leads)** in **Trakyo** and check your test lead is
   there, with the ad as its source.

---

:::info
Learn more about **[Meta Ads Tracking](/docs/help/meta-ads-tracking/overview)** here.
:::
