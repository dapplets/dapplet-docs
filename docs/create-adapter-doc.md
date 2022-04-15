---
id: create-adapter-doc
sidebar_label: Creating adapter docs
title: Creating documentation for the adapter
---

Each adapter must be described in documentation making it available for production use. This documentation is also necessary for the audit procedure.

This website is built using [Docusaurus 2](https://v2.docusaurus.io/). Adapter docs should be written with Markdown and put to the root of your project as `dapplet-docs.md`:

```bash
my-adapter
├── dapplet-docs.md
...
```

Documentation should contain:

  1. Adapter name
  2. General information about the adapter
  3. Contexts with insertion points for the widgets (pictures, table, additions)
  4. Widgets with their types, description and parameters. It is better if this information is presented in the form of a table or tables
  5. Events (text, code)
  6. Supported virtual adapters

Look at the examples [here.](https://github.com/dapplets/dapplet-docs/blob/master/static/md/atV050.md)
