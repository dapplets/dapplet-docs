---
id: create-adapter-doc
sidebar_label: Creating adapter docs
title: Creating documentation for the adapter
---

Each adapter must be documented to be audited and available for production use. Adapter documentation should be in two parts:

### 1. Json file with the following structure:

```json
{
  "your-adapter-name.eth": {
    "title": "Your adapter title",
    "versions": [
      {
        "version": "v0_1_0",
        "link": "path_to_your_docs/your_docs.md"
      }
    ]
  }
}
```

### 2. MarkDown (.md) file with your documentation. It should contain:

  1. Adapter name.
  2. General information about the adapter.
  3. Widgets with description, parameters, their types. It is better if this information is presented in the form of a table.
  4. Insertion points of the widgets (pictures, table, additions).
  5. Events (text, code).
  6. Supported virtual adapters.

Look at the example [here](/docs/twitter-adapter)
