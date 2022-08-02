export const dynamicColor = (state = { color: "" }, { type, payload }) => {
  switch (type) {
    case "CHANGE_COLOR":
      return (state = { color: payload });
    // return payload;
    default:
      return state;
  }
};
