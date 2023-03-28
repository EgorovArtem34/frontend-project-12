import { useSelector, useDispatch } from 'react-redux';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { BsPlusSquare } from 'react-icons/bs';
import { actions } from '../../slices/channelsSlice.js';
import { showModal } from '../../slices/modalsSlice.js';

const Channels = () => {
  const dispatch = useDispatch();
  const channelsData = useSelector(({ channelsSlice }) => channelsSlice.channelsData);
  const { channels, currentChannelId } = channelsData;

  const setShowModal = (type, item = null) => dispatch(showModal({ type, item }));
  const handleClick = (id) => {
    dispatch(actions.setCurrentChannel(id));
  };
  const createStaticBtn = (channel) => (
    <Button
      onClick={() => handleClick(channel.id)}
      type="button"
      variant={channel.id === currentChannelId ? 'secondary' : ''}
      className="w-100 rounded-0 text-start"
    >
      <span className="me-1">#</span>
      {channel.name}
    </Button>
  );
  const createChangeableBtn = (channel) => (
    <Dropdown as={ButtonGroup} className="d-flex">
      <Button
        onClick={() => handleClick(channel.id)}
        variant={channel.id === currentChannelId ? 'secondary' : ''}
        className="w-100 rounded-0 text-start text-truncate btn"
      >
        <span className="me-1">#</span>
        {channel.name}
      </Button>

      <Dropdown.Toggle
        split
        variant={channel.id === currentChannelId ? 'secondary' : 'light'}
        id="dropdown-split-basic"
      />

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => setShowModal('removeChannel', channel.id)}>
          Удалить
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setShowModal('renameChannel', channel.id)}>
          Переименовать
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <Button onClick={() => setShowModal('addChannel')} className="p-0 text-primary btn-group-vertical" variant="outline-light">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <BsPlusSquare />
          </svg>
        </Button>
      </div>
      <ul
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
        id="channels-box"
      >
        {channels.map((channel) => (
          <li className="nav-item w-100" key={channel.id}>
            {channel.changeable ? createChangeableBtn(channel) : createStaticBtn(channel)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Channels;
