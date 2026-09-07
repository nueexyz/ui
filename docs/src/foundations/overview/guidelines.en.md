# nuée Foundations

nuée shares recurring interface decisions so people can predict what to do next. Compose components and tokens around a consistent view of task priority, information relationships, and recovery from failure.

## Work in this order

1. Describe the task the user needs to complete in one sentence.
2. Separate headings, content, and supporting information. Choose one primary action.
3. Check existing components and their supported props.
4. Choose tokens for color, size, spacing, and motion by their role.
5. Check empty, loading, success, and error states, long content, and keyboard use.

## Start with a settings screen

For notification preferences, first decide when a change takes effect. Consider `Switch` for an immediate setting and `Checkbox` for a choice submitted later. Then use `Field` to connect names and descriptions, and preserve choices if saving fails.

## Choose a guideline

| Decision                                          | Read                               |
| ------------------------------------------------- | ---------------------------------- |
| Values and names                                  | Design Token, Color, Typography    |
| Grouping information                              | Layout, Spacing, Radius, Elevation |
| Interaction and results                           | State, Motion, Feedback            |
| Access with different abilities and input methods | Accessibility                      |
| Interface wording                                 | Voice and Tone, Writing            |

## Principles, components, and patterns

Foundations explain decisions that apply across screens. Component pages help you choose a control and inspect its supported examples. Patterns explain how controls work together to complete a task.

- Start with [Button](?path=/docs/components-button--docs) when choosing action emphasis, size, and placement.
- Follow [Field](?path=/docs/components-field--docs) for input errors and submission.
- Follow [Alert Dialog](?path=/docs/components-alert-dialog--docs) for consequences, cancellation, and recovery.
- Follow [Search and Filter](?path=/docs/patterns-search-and-filter--docs) for queries and changing result sets.

## Resolve competing priorities

Keep the task possible before reducing visual density. If labels or actions no longer fit, reflow the layout before shrinking text or hiding the main action. Prefer proximity and spacing to extra containers; add a border or surface only when the grouping remains unclear.

Emphasis follows the task, not the number of available controls. A page can have many actions while giving the next useful step the strongest treatment. Do not communicate an error with color alone: name the problem and provide a way forward.

## Guidelines and implementation

These recommendations are starting points for new screens. Preserve the typography and alignment already defined by components. Document the reason and scope of any exception.

## Build with an LLM

Provide the [complete guidelines](llms-full.en.txt) and relevant component source when asking an LLM to build a screen. This repository's `AGENTS.md` points to the guidelines. In other projects, include the guideline path in the request.
