import './App.css';
import { Books } from './components/books';

const Application: React.FC = () => {
  return (
    <div className="app">
      <h2>Steps to test:</h2>
      <ol>
        <li>
          <strong>For running local server please run this command in the root of repo:</strong>
          <strong>"npm run server"</strong>
        </li>
        <li>
          Page will fetch data when react component mounted.
        </li>
        <li>
          Refetch button will ignore Stale time of cache and send request to server for fetching new data.
        </li>
        <li>
          Refresh the page will reload it to show process of getting data from cache.
        </li>
        <li>
          Stale time set on 5 seconds
        </li>
      </ol>
      <Books />
    </div>
  );
}

export default Application;
