### Documentation

#### Permissions

The permissions History Disabler requires on install are declared in the manifest.

    "permissions": [
		  "browsingData",
		  "history",
		  "tabs",
		  "downloads",
		  "storage"
    ]

Each permission is required for the reasons set out below.

**browsingData** 

To clear all history on tab close. 

This removes items from the 'Recently closed' menu.

**history**

To remove history items as they are added to history.

This must be used alongside `browsingData`, becuase `browsingData` does not remove browsing history from the 'New tab' page.

**tabs**

To detect when a tab has been closed, so that history can be cleared from the 'Recently closed' menu using `browsingData`.

**downloads (Since 1.5)**

To clear download history when a download has completed, or has been interrupted. This functionality is optional.

**storage (Since 1.5)**

To save and access extension options.
