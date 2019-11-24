export const currentPage = ( state = ['/index'], action ) => {
  switch (action.type) {
    case 'SAVE_BREADCRUMB':
      return action.arr
      break;
    default:
      return state;
  }
}
