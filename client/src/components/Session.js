// import React, { useEffect } from "react";
// import { connect } from "react-redux";
// import * as sessionActions from "../redux/actions/sessionActions";
// import { bindActionCreators } from "redux";

// function Session({ session = null, load }) {
//   useEffect(() => {
//     if (session == null) {
//       load().catch((error) => {
//         alert("Loading session failed" + error);
//       });
//     }
//   });
//   return (
//     <div>
//       <h1>{session}</h1>
//     </div>
//   );
// }

// function mapStateToProps(state) {
//   return {
//     session: state.session,
//   };
// }
// function mapDispatchToProps(dispatch) {
//   return {
//     load: bindActionCreators(sessionActions.loadSession, dispatch),
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Session);
