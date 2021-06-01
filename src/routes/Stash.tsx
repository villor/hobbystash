import { Paper } from '@material-ui/core';
import AppContext from '../context';
import QuickPart from '../components/QuickPart';
import { useContext } from 'react';

export default function Stash() {
  const context = useContext(AppContext);

  return (
    <div>
      <QuickPart partTypes={context.partTypes} />
      <Paper>This is where the inventory goes</Paper>
    </div>
  );
}
