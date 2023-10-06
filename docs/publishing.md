---
id: publishing
title: Publishing
---

1. Launch the application locally. Click on the `Current registry address:` link.

  ![Image to point 1](/img/pub_01.png)

2. A window will open in the browser.

  ![Image to point 2](/img/pub_02.png)

3. Add the address into the Development Servers field of the extension's Developer page.

  ![Image to point 3](/img/pub_03.png)

  :::note

  If an error occurs, click on the URL.

  ![set dynamic adapter](/img/gs_4.jpg)

  You can:

    - run on http via [serve](https://www.npmjs.com/package/serve)
    - check the ssl certificate for validity
    - add the certificate to your browser exceptions

  After reload the tab and you will see the module.

  :::

4. If the module has successfully connected to the extension, you can run the developed dapplet on the dapplet list tab and test it.

  ![Image to point 4](/img/pub_04.png)

  If the module works as you expect, you can return to deployment.
  
  Currently in the settings you can select one of two registries for work and deployment: `v3.registry.dapplet-base.eth` and `test.v3.registry.dapplet-base.eth`. Choose a `test.v3.registry.dapplet-base.eth` registry for trial deployment of new applications or for testing new features.

5. Connect a wallet if it has not been connected yet

  ![Image to point 5](/img/pub_05_1.png)

  ![Image to point 5](/img/pub_05_2.png)

  :::note

  Currently, Dapplets Team only supports two Ethereum Goerli registries.

  To publish the module, you need to connect the MetaMask wallet.

  :::

6. Open the Developer tab and click on **Deploy**. The modal window appears when you first deploy the module. Click **Ok**

  ![Image to point 6](/img/pub_07.png)

7. MetaMask will open. **Confirm** the transaction.

  ![Image to point 7](/img/pub_08.png)

8. The new module will appear in the registry.

  ![Image to point 8](/img/pub_09.png)

9. Turn off the Development Server. There is an application in the list of dapplets.

  ![Image to point 9](/img/pub_10.png)
