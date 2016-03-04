### Documentation

#### The permissions

Each permission is required for the following reasons.

**browsingData** 

To clear history on tab close. 

This removes items from the 'Recently closed' menu.

**history**

To remove history items as they're added to history.

This must be used instead of `browsingData`, becuase `browsingData` doesn't remove items from the 'New tab' page.

**tabs**

To detect when a tab has closed, so that history can be cleared.