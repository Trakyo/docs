---
title: Add the script to your site builder
description: Where the Trakyo tracking script goes in Framer, Webflow, GoHighLevel, ClickFunnels, Wix, Squarespace and Google Tag Manager.
order: 2
draft: true
---

The **Trakyo** tracking script goes in the `<head>` of every page on your site. Where you
paste it depends on what your site is built with. This page covers the common ones.

:::note
Every one of these starts the same way: open the Custom Domains card in **Trakyo** and
click **Copy Tracking Script**. That is the button, not **Copy prompt** — the prompt is for
AI site builders. See **[Custom Domains](/docs/help/custom-domains/overview)**.
:::

---

## Framer

1. Copy the script in **Trakyo**.
2. Sign in to Framer and open your project.
3. Go to **Settings** → **Code**.
4. Paste it into the start or end of `<head>`, set it to run on **every visit** and on
   **all pages**.
5. Save, then publish the site.

---

## Webflow

1. Copy the script in **Trakyo**.
2. Sign in to Webflow.
3. Click the three dots on your project.
4. Go to **Settings** → **Custom code**, and paste it into **Head code**.
5. Save, then publish the site.

---

## GoHighLevel

1. Copy the script in **Trakyo**.
2. Sign in to GoHighLevel.
3. Click **Sites** in the left menu.
4. Open the **Websites** tab, then the website or funnel you want to track.
5. Open the **Settings** tab and paste the script into **Head Code**.
6. Save. GoHighLevel publishes the change for you.

---

## ClickFunnels

### Classic

1. Copy the script in **Trakyo**.
2. Sign in to ClickFunnels.
3. Open your funnel and click **Settings**.
4. Paste the script into **Head Tracking Code**.
5. Scroll down and click **Save and Update Settings**.

### 2.0

Add it once at site level and it covers your site and your funnels.

1. Copy the script in **Trakyo**.
2. Sign in to ClickFunnels.
3. Open the **Site** app and go to **Site Settings**.
4. Paste the script into the **Header Code** field, under tracking codes.
5. Save your changes.

To cover a single funnel instead, open that funnel's settings with the gear icon, paste the
script into **Head Code**, and click **Update Funnel**.

:::warning
Custom HTML pages do not inherit site or funnel head code. On those, the script has to go
into the page's own HTML.
:::

---

## Wix

1. Copy the script in **Trakyo**.
2. Sign in to Wix and open your site's dashboard.
3. Go to **Settings** → **Custom Code**, under **Development & integrations**.
4. Click **+ Add Custom Code** and paste the script in.
5. Under **Add Code to Pages**, choose **All pages**, and set it to load on each new page
   rather than once per visit.
6. Under **Place Code in**, choose **Head**.
7. Click **Apply**.

:::note
Wix only offers Custom Code on sites with a connected domain, and on a paid plan.
:::

---

## Squarespace

1. Copy the script in **Trakyo**.
2. Sign in to Squarespace and open your site.
3. Go to **Website** → **Website Tools** → **Code Injection**.
4. Paste the script into the **Header** field, which loads on every page.
5. Save.

:::note
Code Injection is only on Squarespace's paid plans. If a site is downgraded, the code stays
in the panel but stops running.
:::

---

## WordPress

WordPress has no built-in field for head code, so use a plugin. **WPCode** — formerly
Insert Headers and Footers — is the usual choice.

1. Copy the script in **Trakyo**.
2. In your WordPress admin, go to **Plugins** → **Add New**, install **WPCode** and
   activate it.
3. Go to **Code Snippets** → **Header & Footer** in the left menu.
4. Paste the script into the **Header** box.
5. Click **Save Changes**.

:::warning
The plugin has to stay active. Deactivate it and the script stops loading, so tracking
stops with it.
:::

:::note
If your theme has its own header-code field, you can use that instead. Avoid editing
`header.php` directly — a theme update overwrites it.
:::

---

## Google Tag Manager

Worth using only if Tag Manager is already on every page of your site. If it is not, paste
the script into your site builder instead — one less thing between a visit and **Trakyo**.

1. Copy the script in **Trakyo**.
2. Open your Tag Manager container and go to **Tags** → **New**.
3. For **Tag Configuration**, choose **Custom HTML**, and paste the script into the HTML
   field.
4. For **Triggering**, choose **All Pages**.
5. Save the tag, then **Submit** and publish the container.

---

## After you add it

Check it is really there before you move on, and make sure your pages carry `trakyo_id`
forward. Both are covered in
**[Custom Domains](/docs/help/custom-domains/overview)**.

---

:::info
Learn more about **[Custom Domains](/docs/help/custom-domains/overview)** here.
:::
