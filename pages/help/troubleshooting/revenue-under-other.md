---
title: Why is my revenue under "Other"?
description: Revenue Trakyo can't trace to a piece of content shows as Other. The usual causes and how to fix each.
order: 30
draft: true
---

:::note[Demo article]
Shows what a finished article looks like. Part of a demo pull request: never published.
:::

**Other** means the payment reached Trakyo, but Trakyo couldn't tell which video, post or
ad the buyer came from. It's almost always a setup gap, not missing data.

| You see | Most likely cause | Fix |
|---|---|---|
| Most revenue is under Other | The tracking tag is missing on some pages | Install the tag on every page, including checkout |
| Payments from a form tool are under Other | The form isn't connected | Connect the form tool under **Integrations** |
| Only some processors are under Other | That processor isn't connected | Connect it under **Integrations** |

:::tip
New setups take a few days to fill in: revenue from buyers who first visited before the tag
was installed stays under Other.
:::

For how first-touch and last-touch credit work, see
[First vs last touch](/docs/attribution).
