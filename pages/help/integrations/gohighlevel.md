---
title: GoHighLevel
description: Capture every GoHighLevel form, survey, quiz and booking as an attributed lead in Trakyo.
order: 1
draft: true
---

GoHighLevel is where your funnels, forms and calendars live. **Trakyo** turns every one of
those submissions into a lead you can trace back to the video, ad or link that earned it —
automatically, from the moment this integration is live. No more guessing which content
filled your calendar.

_[Video: GoHighLevel integration walkthrough]_

## Set up your form

Every form that should feed **Trakyo** needs one hidden field carrying the visitor id.

### Option A: you do not have a form yet

1. In GoHighLevel, click **Sites** in the left sidebar.
2. Click **Forms** in the top navigation, then **+ Add Form**.
3. Choose **Start from Scratch**.
4. Add your standard fields: First Name, Last Name, Email, Phone.
5. Click **Add**, choose **Custom Fields**, and pick **Single Line** as the field type.
6. Fill the field settings in exactly — they are case-sensitive:

:::note
Name = `trakyo_id`
Object = `Contact`
Group = `Contact`
Placeholder = `trakyo_id`
Prefill = `trakyo_id`
Unique Key = `contact.trakyo_id`
:::

7. Click the `trakyo_id` field, tick **Hidden**, and set the Hidden Value to `trakyo_id`.

_[Screenshot: the trakyo_id custom field settings]_

### Option B: you already have a form

1. Click **Add**, choose **Custom Fields**, and pick **Single Line**.
2. Fill in the same settings as above, exactly.
3. Tick **Hidden** on the field and set the Hidden Value to `trakyo_id`.

## Set up your workflows

Workflows are what send the data to **Trakyo**. They cover form submissions, surveys,
quizzes and calendar bookings.

:::tip
One workflow can carry all of them. Open a workflow, click **Add New Trigger** next to the
existing trigger, and add **Survey Submitted** or **Quiz Submitted**. Every trigger fires
independently and they all share the same webhook, so there is nothing else to change.
:::

### Form workflow

1. Go to **Automation** → **Workflows**.
2. Click **Create Workflow**, then **Add Trigger**, and select **Form Submitted**.
3. Click **+** below the trigger and select **Webhook**.
4. Configure it:

:::note
Action Name = `Form Submitted to Trakyo`
Webhook URL = `https://app.trakyo.io/api/platforms/ghlevel/webhook`
Method = `POST`
Custom Data Field (key) = `type`
Custom Data Field (value) = `FormCreate`
:::

5. Back in the trigger, under **Filters**, click **Add Filters** and choose the forms to
   track. Leave it empty and every form is tracked.
6. Toggle the workflow from **Draft** to public, and click **Save**.

_[Screenshot: the webhook action settings]_

### Survey workflow

Same shape, with the survey trigger:

1. Go to **Automation** → **Workflows** and click **Create Workflow**.
2. Click **Add Trigger** and select **Survey Submitted**.
3. Add a **Webhook** action with the settings above — the value stays `FormCreate`.
4. Under **Filters**, choose which surveys to track, or leave it empty for all of them.
5. Toggle to public and click **Save**.

### Quiz workflow

1. Go to **Automation** → **Workflows** and click **Create Workflow**.
2. Click **Add Trigger**, select **Quiz Submitted**, and pick the quiz under **Filters**.
3. Add a **Webhook** action with the same settings, with the Action Name
   `Survey Submitted to Trakyo` and the value `FormCreate`.
4. Toggle to public and click **Save**.

### Calendar workflow

:::danger
Finish your form setup first. Calendars have to be linked to a form that carries the
`trakyo_id` field, or bookings arrive with no attribution.
:::

1. Go to **Workflows** and click **Create Workflow**.
2. Click **Add Trigger** and select **Customer Booked Appointment**.
3. Click **+** below the trigger and select **Webhook**.
4. Configure it:

:::note
Action Name = `Appointment Booked to Trakyo`
Webhook URL = `https://app.trakyo.io/api/platforms/ghlevel/webhook`
Method = `POST`
Custom Data Field (key) = `type`
Custom Data Field (value) = `AppointmentCreate`
:::

5. Under **Filters**, click **Add Filters** and choose the calendar to track. Leave it empty
   and every calendar is tracked.
6. Tracking more than one calendar? Add another **Customer Booked Appointment** trigger per
   calendar, each with its own filter.
7. Toggle to public and click **Save**.
8. In **Settings** → **Business Profile**, fill in your business details. They appear on
   calendar bookings.
9. In **Settings** → **Calendars**, open the calendar and click **Edit Calendar**.
10. In the **Forms** section, select the form you built above — the one with the
    `trakyo_id` field.

_[Screenshot: the calendar webhook settings]_

## Connect GoHighLevel to Trakyo

Open **[Integrations](https://app.trakyo.io/integrations)**, find GoHighLevel, and click
**Connect your Go High Level**. **Trakyo** starts receiving data straight away.

## Check it worked

Submit one of your own forms, then open **[Leads](https://app.trakyo.io/leads)**. The
submission should appear as a new lead within a minute, and opening it should show the
click that brought that person in.

:::info
Even with this integration live, create a Custom Tracking content item for any form you
share directly with leads. That is what lets you see the attribution for that specific
placement, rather than just the submission.
:::
