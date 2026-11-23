---
title: AEvent
description: Connect AEvent so webinar registrations reach Trakyo as leads, attributed to the content that produced them.
order: 23
draft: true
---

The **Trakyo** integration with AEvent tracks the people who register for your webinars and
attributes each registration to the content that brought them in.

![AEvent and Trakyo](./aevent-trakyo.png)

---

## Add the trakyo_id field

In your AEvent campaign, open **Registration** in the left sidebar, click **Add
Registration Field**, and set it up exactly like this:

- **Name** — `trakyo_id`
- **Form Type** — Query

:::note
A **Query** field does not appear on the registration form. AEvent reads the value from the
URL instead, such as `?trakyo_id=abc123`, and makes it available as the personalisation
variable `#{{!subscriber-trakyo_id!}}`.
:::

---

## Add the webhook

Open **Integrations** in the left sidebar of your campaign and click **Add Integration** at
the top right. Search for **Webhook**, select it, and click **Add Integration** again.

In the **Connect New Integration** dialog:

1. **Integration Name** — `Trakyo`.
2. **Integration Address** — the webhook URL from the AEvent card on the
   **[Integrations](https://app.trakyo.io/integrations)** page in **Trakyo**. It is unique
   to your account, so copy it from there.
3. **Type** — **POST**.
4. **Formatting** — **JSON**.
5. Leave everything else as it comes, and click **Connect**.

:::warning
Switch the type from **GET** to **POST**. On GET, nothing reaches **Trakyo**.
:::

---

## Switch the webhook on

Back on the Integrations page, find the Trakyo webhook you just made and check it is
toggled to **Active**.

Click the cogwheel to open its settings, check it is set to trigger **On Registration**,
and click **Update Settings**.

---

## Test the integration

1. Register for your own webinar through a tracked link, with test details.
2. Open **[Leads](https://app.trakyo.io/leads)** in **Trakyo** and check the registration is
   listed, with the content that brought the visitor in.

---

:::info
Learn more about the **[Leads page](/docs/help/leads/overview)** here.
:::
