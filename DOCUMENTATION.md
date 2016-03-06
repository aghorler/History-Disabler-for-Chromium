### Documentation

#### Permissions

The permissions History Disabler requires on install are declared in the manifest.

    "permissions": [
		  "browsingData",
		  "history",
		  "tabs"
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
