# nuée Foundations

Start with the user's task, information hierarchy, and interaction before choosing visual values. These guidelines explain how to compose screens with nuée.

## Work in this order

1. Describe the task the user needs to complete in one sentence.
2. Separate headings, content, and supporting information. Choose one primary action.
3. Check existing components and their supported props.
4. Choose tokens for color, size, spacing, and motion by their role.
5. Check empty, loading, success, and error states, long content, and keyboard use.

## Choose a guideline

| Decision                              | Read                                   |
| ------------------------------------- | -------------------------------------- |
| Values and names                      | Design Token, Color, Typography        |
| Grouping information                  | Layout, Spacing, Radius, Elevation     |
| Interaction and results               | State, Motion, Feedback                |
| Access across languages and abilities | Inclusive Design, International Design |
| Interface wording                     | Voice and Tone, Writing                |

## Guidelines and implementation

These recommendations are starting points for new screens. Preserve the typography and alignment already defined by components. Document the reason and scope of any exception.

## Build with an LLM

Ask the LLM to read the [complete guidelines](llms-full.en.txt), then check the relevant topics and component source. This repository's `AGENTS.md` points to the guidelines. In other projects, include their path in the request; an LLM does not automatically read every available document.

## References

The topic structure draws on [SEED Foundations](https://seed-design.io/foundations). Token names, APIs, and behavior follow nuée's implementation; SEED's brand rules and support guarantees do not apply to nuée.
