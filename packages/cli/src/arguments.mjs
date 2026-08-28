export function parseArguments(arguments_) {
  const [command, ...rest] = arguments_;
  const options = {};
  const positionals = [];

  for (let index = 0; index < rest.length; index += 1) {
    const argument = rest[index];
    if (!argument.startsWith("--")) {
      positionals.push(argument);
      continue;
    }

    const name = argument.slice(2);
    const nextArgument = rest[index + 1];
    if (!nextArgument || nextArgument.startsWith("--")) {
      options[name] = true;
      continue;
    }

    options[name] = nextArgument;
    index += 1;
  }

  return { command, options, positionals };
}
