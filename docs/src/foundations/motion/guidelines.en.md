# Motion

Use motion to confirm input and explain change. Decoration should not delay task completion.

## Choose timing

| Change                                 | Token                                                          |
| -------------------------------------- | -------------------------------------------------------------- |
| Hover and press feedback               | `motionVars.durationFast`                                      |
| General state and surface transitions  | `motionVars.durationNormal`                                    |
| Larger areas such as Dialog and Drawer | `motionVars.durationSlow`                                      |
| Repeating loading feedback             | `durationLoading`; `durationLoadingReduced` for reduced motion |

Consider `easingStandard` for state changes and `easingEnter` and `easingExit` for entry and exit. Preserve the component's existing motion settings and media queries first.

## Reduced motion

Respect `prefers-reduced-motion`. Retain progress text and state when reducing rotation or movement. Disabling reduced-motion support during installation must be a deliberate product decision.

## Avoid

Do not add looping animation just for emphasis. If scaling blurs text and borders, consider translation, dimensions, or opacity instead. Do not make people wait for decoration after loading completes.
