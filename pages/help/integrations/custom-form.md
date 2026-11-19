---
title: Custom Form
description: Track submissions from any form Trakyo has no direct integration with.
order: 6
draft: true
---

The **Trakyo** Custom Form integration tracks submissions from any form that has no direct
integration — a form tool Trakyo does not connect to, a custom-coded HTML form, or a form
on a site built with an AI builder.

![Form tools and Trakyo](./custom-form-trakyo.png)

:::tip
There are three ways to set this up, depending on where your form lives:

- **Any form tool** — send the submission to your Trakyo webhook.
- **A custom-coded HTML form** — add two hidden inputs, then send the submission.
- **A site built with an AI builder** — paste a prompt and let the builder do it.

It does not cover adding the tracking script to your pages — that is in the Custom Domains
article.
:::

---

## Any form tool

Use this when your form is built in a tool Trakyo has no direct integration with.

After the form is submitted, send the data to your **Trakyo** webhook. You can do that from
your backend, a serverless function, or an automation tool such as Zapier or Make.

:::warning
The webhook URL is unique to your account. Copy it from the Custom Form card on the
**[Integrations](https://app.trakyo.io/integrations)** page rather than from anywhere else.
:::

Send a POST request with a JSON body containing these fields:

```json
{
  "email": "visitor@example.com",
  "name": "Jane Doe",
  "phone": "+1234567890",
  "trakyo_id": "{{trakyo_id from hidden input}}",
  "form_name": "Contact Form"
}
```

At minimum, include one of `email`, `phone` or `trakyo_id`. Everything else is optional.

:::note
`form_name` is a label you choose. Pick one you will recognise on your dashboard — "Webinar
opt-in" rather than "form 1" — and use a different name for each form.
:::

---

## A custom-coded HTML form

### Form configuration

Two hidden inputs go on the form: one carries the visitor id, the other names the form.

1. Add a hidden input named `trakyo_id`. The Trakyo tracking script finds it and fills it
   in with the visitor's id, so leave the value empty.

   ```html
   <input type="hidden" name="trakyo_id" />
   ```

2. Add a second hidden input named `form_name`, with a name for this form as its value.

   ```html
   <input type="hidden" name="form_name" value="Contact Form" />
   ```

#### How it works

1. The Trakyo tracking script scans your page every two seconds for inputs named
   `trakyo_id`.
2. When it finds one, it fills it with the visitor's unique tracking id.
3. When the form is submitted, that id travels with the rest of the form data.
4. Your form handler sends the data to the Trakyo webhook, and the lead is attributed.

### Form workflow automation setup

Your form handler sends the submission to your webhook, exactly as described in
**[Any form tool](#any-form-tool)** above: a POST with a JSON body, using the webhook URL
from the Custom Form card on the **[Integrations](https://app.trakyo.io/integrations)**
page.

---

## A site built with an AI builder

Building on Lovable, v0, Bolt, Replit, Netlify or Base44? Do not wire this up by hand.
Paste the prompt below into the builder and it does all of the above — including the part
everyone misses, sending the data before the page redirects.

Replace the webhook URL with your own from the Custom Form card on the
**[Integrations](https://app.trakyo.io/integrations)** page.

```text
Send my form submissions to Trakyo, following these instructions exactly.

1. Add a hidden input named `trakyo_id` to the form. Leave its value empty — the Trakyo
   tracking script on the page fills it in automatically. Do not remove it, rename it, or
   generate a value for it yourself.
2. Add a second hidden input named `form_name` with a short name for this form as its
   value, e.g. "Contact Form". Use a different name for each form.
3. When the form is submitted, POST the submitted fields as JSON to this webhook:
   [your webhook URL]
   Content-Type: application/json. The body should include email, name, phone, trakyo_id
   and form_name — send whichever of those the form collects.
4. Send that POST **before** redirecting to the next page or showing the thank-you state,
   and wait for it to finish (await the request). If you redirect first the request is
   cancelled and the submission is lost.
5. If the POST fails, still let the user through — never block the form on it. Log the
   error instead.
```

:::warning
Paste the whole prompt, not an extract, and test with a real submission afterwards. These
builders report success they have not delivered.
:::

---

## Test the integration

1. Click one of your tracking links and let it take you to the page with the form.
2. Check that `trakyo_id` appears in the URL as a parameter.
3. Fill the form in and submit it.
4. Open **[Leads](https://app.trakyo.io/leads)** in **Trakyo** and look for your test lead,
   searching by the email address you entered.
5. Open the lead and check it shows your details along with its attribution.

:::warning
Every page with a form needs its own set-up. A second page on the same domain with an
unintegrated form records the clicks and loses the leads. An embedded form cannot be fixed
where it is embedded either — change it in the tool that produced the embed, then re-embed
it, and publish afterwards.
:::

---

:::info
Learn more about the **[Leads page](/docs/help/leads/overview)** here.
:::
