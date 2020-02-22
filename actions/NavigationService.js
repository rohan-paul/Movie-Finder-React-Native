import { NavigationActions } from 'react-navigation';

// https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html
let navigator;

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function navigate(routeName, params) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}


export default {
  navigate,
  setTopLevelNavigator,
};