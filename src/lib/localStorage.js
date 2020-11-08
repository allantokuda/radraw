// https://medium.com/@jrcreencia/persisting-redux-state-to-local-storage-f81eb0b90e7e

export const loadState = () => {
  try {
    const openChartId = localStorage.getItem('openChartId')
    let serializedState = localStorage.getItem(openChartId);

    // Deprecated, remove in 2021
    if (serializedState === null)
      serializedState = localStorage.getItem('state');

    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    state.updatedAt = (new Date()).getTime()
    const serializedState = JSON.stringify(state);
    localStorage.setItem('openChartId', state.id);
    localStorage.setItem(state.id, serializedState);
    localStorage.removeItem('state');
  } catch {
    // ignore write errors
  }
};
