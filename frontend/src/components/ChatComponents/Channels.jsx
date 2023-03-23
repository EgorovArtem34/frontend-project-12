import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { BsPlusSquare } from 'react-icons/bs';
import { actions } from '../../slices/channelsSlice.js';

const Channels = () => {
  const channelsData = useSelector(({ channelsSlice }) => channelsSlice.channelsData);
  const { channels, currentChannelId } = channelsData;
  const dispatch = useDispatch();
  const handleClick = (id) => {
    dispatch(actions.setCurrentChannel(id));
  };

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <Button className="p-0 text-primary btn-group-vertical" variant="outline-light">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <BsPlusSquare />
          </svg>
        </Button>
      </div>
      <div
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
        id="channels-box"
      >
        {channels.map((channel) => (
          <li className="nav-item w-100" key={channel.id}>
            <Button
              onClick={() => handleClick(channel.id)}
              type="button"
              variant={channel.id === currentChannelId ? 'secondary' : 'light'}
              className="w-100 rounded-0 text-start"
            >
              <span className="me-1">#</span>
              {channel.name}
            </Button>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Channels;
