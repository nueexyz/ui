## What stays in sync

The form stores `query` and `status`. The result list reads only `applied`. Applying copies the trimmed query and status into `applied`; clearing updates both sets of values. This avoids a list showing one filter while its controls appear to describe another.

Input names remain visible through `FieldLabel`. `Select` represents one status value; `Combobox` would add unnecessary search for three short options. A plain list suits names and one status; use `Table` when users need to compare several columns.

The result count and applied criteria share a status announcement. The list updates without moving focus, and the native form supports Enter to apply. Only submit applies draft changes; selecting an option does not.

## Extend to remote results

When a request starts, retain the last successful rows and their applied summary, and label them as previous results while loading. Track the submitted criteria separately until their results succeed. On failure, retain the draft, explain that the update failed, and offer Retry for the submitted criteria. Do not display “No results” for a failed request.

If newer requests can start before earlier ones finish, cancel the earlier request or ignore its response. Reset pagination when new filters are applied. For shareable results, serialize applied criteria into the URL and restore the form and results together on browser navigation.
