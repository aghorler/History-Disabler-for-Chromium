### Documentation

#### Permissions

The permissions History Disabler requires on install are declared in the manifest.

    "permissions": [
      "browsingData",
      "history",
      "downloads",
      "storage",
      "tabs"
    ]

Each permission is required for the reasons set out below.

**browsingData** 

To clear all history on browser start-up.

**history** and **tabs**

To remove history items as their corresponding tabs are closed.

**downloads (Since 1.5)**

To clear download history when a download has completed, or has been interrupted. This functionality is optional.

**storage (Since 1.5)**

To save and access extension options.
