---
title: HubSpot Meetings
description: Track the calls booked through your HubSpot scheduler and attribute them to your content.
order: 19
draft: true
---

The **Trakyo** integration with HubSpot Meetings tracks the calls booked through your
HubSpot scheduler and attributes each one to the content that produced it.

---

## How it works

1. The **Trakyo** tracking script adds the visitor's id to your embedded HubSpot meeting
   scheduler.
2. A custom contact property catches that id when the booker submits the form.
3. An automation sends the booking, and the id with it, to **Trakyo**.

:::warning[Before you start]
You need:

- a **Sales Hub** or **Service Hub** seat, which is what lets you add custom fields to
  meeting forms,
- your meeting scheduler embedded on your own website, not shared as a standalone link,
- a Zapier or Make account, or **Operations Hub Professional** for workflow webhooks.
:::

---

## Create the contact property

In HubSpot, go to **Settings** → **Properties** → **Contact properties** and create a new
**Single-line text** property.

- Give it a label the booker will not question, such as `Reference ID`.
- Set the internal name to `trakyo_id`.

This is where the visitor's **Trakyo** id is stored on the contact record when they book.

:::note
HubSpot's own guide:
**[Create and edit properties](https://knowledge.hubspot.com/properties/create-and-edit-properties)**.
:::

---

## Add the property to your booking form

Open your scheduling page in HubSpot — **Sales** → **Meetings** → your meeting → the
**Form** tab — click **+ Contact property**, and add the property you just made.

:::warning
The field is visible to the booker. HubSpot meeting forms do not support hidden fields.
**Trakyo** fills it in through the URL before they see it, so most people leave it alone.
:::

:::note
HubSpot's own guide:
**[Create and edit scheduling pages](https://knowledge.hubspot.com/meetings-tool/create-and-edit-scheduling-pages)**.
:::

---

## Embed the scheduler on your site

Use HubSpot's embed code to put the scheduler on a page of your own, one that has the
**Trakyo** tracking script on it. The script finds the `meetings.hubspot.com` iframe, adds
the visitor's `trakyo_id` to the embed URL, and the property fills itself in when the form
loads.

:::warning
This only works on an embedded scheduler. A standalone `meetings.hubspot.com` link has no
**Trakyo** script running on it, so nothing fills the field in.
:::

:::note
HubSpot's own guides:
**[Share scheduling pages](https://knowledge.hubspot.com/meetings-tool/share-scheduling-pages)**
and
**[Auto-populate fields with a query string](https://knowledge.hubspot.com/forms/can-i-auto-populate-form-fields-through-a-query-string)**.
:::

---

## Send the booking to Trakyo

When someone books, an automation has to send the contact's details, `trakyo_id` included,
to your **Trakyo** webhook. Copy that webhook URL from the HubSpot card on the
**[Integrations](https://app.trakyo.io/integrations)** page — it is unique to your account.

There are three ways to send it.

### Zapier or Make

The one we would pick. Build a Zap or scenario triggered by **New Engagement (Meeting)** in
HubSpot, add a step that fetches the contact's `trakyo_id`, and POST the data to your
webhook URL. It works on any HubSpot plan.

### A HubSpot workflow webhook

Create a contact-based workflow triggered on **Meeting booked**, and add a **Send a
webhook** action that POSTs the contact's properties, `trakyo_id` included, to your webhook
URL.

:::warning
Workflow webhooks need **Operations Hub Professional** or **Enterprise**. The other two
routes work on any plan.
:::

:::note
HubSpot's own guide:
**[Trigger webhooks in HubSpot workflows](https://knowledge.hubspot.com/workflows/how-do-i-use-webhooks-with-hubspot-workflows)**.
:::

### The HubSpot webhooks API

For developers. Subscribe to `contact.propertyChange` on the
`engagements_last_meeting_booked` property. When it fires, read the contact's `trakyo_id`
through the CRM API and forward it to your webhook URL. This one needs a HubSpot developer
app.

:::note
HubSpot's own references:
**[Webhooks API](https://developers.hubspot.com/docs/api-reference/webhooks-webhooks-v3/guide)**
and
**[CRM Meetings API](https://developers.hubspot.com/docs/api-reference/crm-meetings-v3/guide)**.
:::

---

## Test the integration

1. Open the page that holds your embedded scheduler.
2. Book a meeting with test details, and check the Reference ID field is already filled in
   when the form loads.
3. Open **[Leads](https://app.trakyo.io/leads)** in **Trakyo** and check the booking is
   listed against that person, with the content that brought them in.

---

## Known limitations

- **The id field is visible.** HubSpot meeting forms have no hidden fields, so the booker
  sees it, labelled however you named it.
- **The scheduler has to be embedded on your site.** A standalone `meetings.hubspot.com`
  link carries no **Trakyo** script, so there is no id to pass.
- **UTM tracking on meeting links is limited** to `utm_source`, `utm_medium` and
  `utm_campaign`, held as contact-level properties that later visits overwrite.

---

:::info
Learn more about the **[Leads page](/docs/help/leads/overview)** here.
:::
