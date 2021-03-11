---
id: extra-button
title: Extra button
---

### Part 01.1: implement counter in dapplet

1. There is an extra button of SOUTH_PANEL in the template. Add label with counter for it.
2. Listen for the button click - output into console.
3. Make counter incrementing on button click.
4. In browser set User Settings properties of the dapplet - output into alert on button click. In the config try to define your own defaults.

### Part 01.2: implement server counter storage

5. Add storage for counters.
6. Initialize counter for current tweet.
7. Send counter in `params`.
8. Send counter in callback.
9. Implement counter increment.
10. Add `serverUrl` to dapplet config.
11. Use async method `Core.storage.get(serverUrl: string)` to get server url.
12. Take a connection with server. Use `Core.connect<{ param }>({ url })`.
13. Console calls and alert are not needed in this part so you can remove them.

- To run the application, run the server and the dapplet separately in two terminals.
- If the counters do not appear after running the server, open https://localhost:8080/ in browser and admit the permission.
