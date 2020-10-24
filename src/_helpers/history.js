import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

// history 모듈을 설치해야 동작할 것 같다.

// --------------------------------------

// App.js에서, 아래와 같이 작성하여 사용한다.

// const dispatch = useDispatch();

// useEffect(() => {
//   history.listen((location, action) => {
//       // clear alert on location change
//       dispatch(alertActions.clear());
//   });
// }, []);

{
  /* <Router history={history}></Router> */
}
