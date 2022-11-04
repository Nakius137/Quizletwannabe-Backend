const checkForEnv = (variable: string | undefined) => {
  if (!variable) {
    throw new Error("Missing env");
  }

  return variable;
};

export default checkForEnv;
