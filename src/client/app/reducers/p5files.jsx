// import * as ActionTypes from '../constants.jsx';
//
//
// const initialState = {
//   files: [
//     {
//       name: 'index.html',
//       content: defaultHTML
//     }
//   ]
// };
// //
// const p5files = (state = initialState, action) => {
//   const files = JSON.parse(JSON.stringify(state.files));
//   switch (action.type) {
//
//     case ActionTypes.UPDATE_FILE:
//       files[action.index].content = action.content;
//       return Object.assign({}, state, {
//         files
//       });
//
//     default:
//       return state;
//   }
// };
//
// export default p5files;
