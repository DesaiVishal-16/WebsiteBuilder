
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("builderState");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    console.error("Could not load state", err);
    return undefined;
  }
};

export const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("builderState", serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};
