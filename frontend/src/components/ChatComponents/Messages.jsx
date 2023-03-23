import { useSelector } from 'react-redux';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useEffect, useRef } from 'react';
import { BsArrowRightSquare } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';

const Messages = () => {
  const channelsData = useSelector(({ channelsSlice }) => channelsSlice.channelsData);
  const { channels, currentChannelId } = channelsData;
  const [currentChannel] = channels.filter((channel) => channel.id === currentChannelId);
  const messages = useSelector(({ messagesSlice }) => messagesSlice.messages);
  const { t } = useTranslation();
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const createMessage = (message) => (
    message
    // <div class="text-break mb-2"><b>admin</b>: check</div>
  );

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {' '}
              {currentChannel?.name}
            </b>
          </p>
          <span className="text-muted">
            {t('messages.key', { count: messages.length })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {messages.map((message) => (
            <div className="text-break mb-2" key={message}>
              {createMessage(message)}
            </div>

          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <Form noValidate className="py-1 border rounded-2">
            <InputGroup className="has-validation">
              <Form.Control
                name="body"
                placeholder="Введите сообщение..."
                aria-label="Новое сообщение"
                aria-describedby="basic-addon2"
                className="border-0 p-0 ps-2"
                ref={inputEl}
              />
              <Button type="submit" variant="group-vertical">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                  <BsArrowRightSquare />
                </svg>
                <span className="visually-hidden">Отправить</span>
              </Button>
            </InputGroup>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Messages;
