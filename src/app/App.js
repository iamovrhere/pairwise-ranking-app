import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { } from 'react-transition-group';
import { ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import { AppContext } from 'contexts/App';
import { routeList } from './routes';
import { AppTheme } from 'components/common/common.style';

function App() {
  const { state, dispatch } = React.useContext(AppContext);
  console.log(state);

  return (
    <>
      <div className="app">
        <div className="app-body">
          <ThemeProvider theme={AppTheme}>
            <Router basename={process.env.PUBLIC_URL}>
              <Switch>
                {
                  routeList.map(({ path, component }) => (
                    <Route key={path} path={path} component={component} />
                  ))
                }
              </Switch>
            </Router>
          </ThemeProvider>
        </div>
      </div>
      <div className="build-info">
        Release: {process.env.BUILD_INFO}
      </div>
    </>
  );
}

export default App;
