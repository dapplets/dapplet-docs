---
id: new-site-adapter
title: New Site specific adapter
---

In this example we implement an adapter for Google and a dapplet for it. There are two directories in the template: the adapter template and the dapplet template.

#### Part 1

- Change the adapter template. Implement possibility to add the button under the title of each element of the standard search results and in the top nav.

1. In `adapter/src/index.ts` implement communication between dapplets and pages.
2. In `adapter/src/button.ts` implement the button HTML with label, image and tooltip for two insert points: MENU and SEARCH_RESULT.
3. In `adapter/src/button.ts` add styles for the element depending on the insertion point

- Change the dapplet. Add buttons to search results and top nav.

4. An alert should be triggered when you click the search results button. The alert should contain the title of the element, a link to the source and a short description of the found fragment from the element.
5. Implement two states for top nav button with actions: replace search results with HI_GIF and return to default results.

#### Part 2

6. Add new insertion point WIDGETS on the top of Google widgets like Videos, Images of ..., People also ask etc.
7. Add a new insertion point DAPPLET_SEARCH_RESULT, which is similar to SEARCH_RESULT but adds a button to our search widget. This is to prevent overwriting of similar search results from different sources.
8. Implement module `adapter/src/result.ts` that exports class Result. It should have an image, a title and a artificial list of results.
9. In `dapplet-feature/src/index.ts` add "result" to WIDGETS. Use `searchResults` like a content sourse.
10. Implement the insertion of buttons into our widget.
11. Add to `adapter/src/button.ts` support for `DAPPLET_SEARCH_RESULT` insertion point.
