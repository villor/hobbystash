import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import QuickPart from './components/QuickPart';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QuickPart />
    </ThemeProvider>
  );
}
