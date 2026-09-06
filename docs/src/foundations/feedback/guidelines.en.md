# Feedback

Place feedback close to the action and match its prominence to the result's importance.

## Choose a component

| Situation                                | Start with                                 |
| ---------------------------------------- | ------------------------------------------ |
| An input needs correction                | FieldError and a nearby explanation        |
| Work completed without blocking the flow | Toast                                      |
| Work can be undone                       | A Toast action and actual data restoration |
| Page guidance must remain visible        | Banner or Message                          |
| A short asynchronous operation           | Spinner and a status message               |
| Progress is measurable                   | Progress                                   |
| A risky action needs a decision first    | Alert Dialog                               |

Do not turn every notification into a dialog. Do not place essential conditions only in a toast that quickly disappears.

## Action responsibilities

Undo must restore the data, then reflect the result. Closing a notification is not restoration. Dismiss all clears the notification list; it does not cancel the underlying work.

## Check

Avoid duplicate messages for the same result. Connect loading, success, and failure messages. Keep necessary state in the page after notifications disappear. Preserve the Toast behavior where Escape closes notifications one at a time, newest first.
