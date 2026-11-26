---
title: Topics and articles
description: How folders and files in GitHub become the cards, sidebar and pages of this Help Center.
order: 1
draft: true
---

:::note[Demo article]
Part of a demo pull request that shows how the Help Center is put together. Never published.
:::

Everything in the Help Center comes from files in the `pages/help/` folder of the
[Trakyo/docs](https://github.com/Trakyo/docs) repository. There are only two ideas to learn:
**topics** and **articles**.

## A topic is a folder

Each folder in `pages/help/` is one topic. This demo has five:

| Folder | Topic on the site |
|---|---|
| `pages/help/how-this-works/` | How this Help Center works |
| `pages/help/getting-started/` | Getting started |
| `pages/help/integrations/` | Integrations |
| `pages/help/alerts/` | Alerts |
| `pages/help/troubleshooting/` | Troubleshooting |

A topic shows up in two places:

1. **A card on the home page.** Click the Trakyo logo to see them.
2. **A group in the left sidebar,** with its articles listed under it.

Each topic folder has a small file called `topic.json` that sets how the topic looks:

```json
{
  "title": "Integrations",
  "description": "Connect your forms, calendar, email and payment tools.",
  "icon": "plug",
  "order": 3
}
```

| Line | What it changes |
|---|---|
| `title` | The card's heading and the sidebar group's name |
| `description` | The sentence under the card's heading |
| `icon` | The card's picture: any name from [lucide.dev/icons](https://lucide.dev/icons) |
| `order` | The topic's place: 1 comes first |

## An article is a file

Each `.md` file inside a topic folder is one article: one page, one task. This page is the
file `pages/help/how-this-works/topics-and-articles.md`.

**The file name becomes the page's address.** This page lives at
`/docs/help/how-this-works/topics-and-articles`: the topic folder, then the file name.

**The top block of the file sets the page's details:**

```
---
title: Topics and articles
description: How folders and files in GitHub become the cards, sidebar and pages.
order: 1
draft: true
---
```

| Line | What it changes |
|---|---|
| `title` | The page heading and its name in the sidebar |
| `description` | The text under the heading and in search results |
| `order` | The article's place within its topic: 1 comes first |
| `draft: true` | Keeps the article off the live site. Delete the line to publish it |

:::note
Every article in this demo is a draft. You can see them here because previews show drafts,
but merging this pull request would publish nothing.
:::

## What an article can contain

Open [Connect Kit](/docs/help/integrations/connect-kit) for numbered steps with screenshots,
and [Welcome to Trakyo](/docs/help/getting-started/welcome-to-trakyo) for a video. Boxes
look like this:

:::note
A note: background the reader may need.
:::

:::tip
A tip: something that saves the reader time.
:::

:::warning
A warning: something that makes the numbers wrong if it is skipped.
:::

:::danger
Danger: something that cannot be undone.
:::

## Where to see your changes

Every pull request gets a comment with a **Preview** link: the whole site as it will look with
your changes, drafts included. It updates a few minutes after each change you commit, and it
is deleted when the pull request is closed.
