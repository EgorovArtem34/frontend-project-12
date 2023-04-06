import { useSelector } from 'react-redux';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useEffect, useRef } from 'react';
import { BsArrowRightSquare } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as yup from 'yup';
import leoProfanity from 'leo-profanity';
import { useAuth, useApi } from '../../hooks/index.jsx';
import { selectors } from '../../slices/channelsSlice.js';

const Messages = () => {
  const { t } = useTranslation();
  const socket = useApi();
  const { user: { username } } = useAuth();
  const channels = useSelector(selectors.selectAll);
  const { currentChannelId } = useSelector((state) => state.channelsSlice);
  const [currentChannel] = channels.filter((channel) => channel.id === currentChannelId);
  const messages = useSelector(({ messagesSlice }) => messagesSlice.messages);
  const currentMessages = messages.filter((message) => message.channelId === currentChannelId);
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
  });

  const createMessage = (message) => (
    <div className="text-break mb-2">
      <b>{message.username}</b>
      :
      {' '}
      {message.body}
    </div>
  );

  const signUpSchema = yup.object().shape({
    body: yup.string()
      .trim()
      .required(t('errors.required')),
  });
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: signUpSchema,
    onSubmit: (e, { resetForm }) => {
      const { body } = e;
      const filteredMessage = leoProfanity.clean(body);
      try {
        socket.addNewMessage({ body: filteredMessage, channelId: currentChannelId, username });
        resetForm();
      } catch (err) {
        toast.error(t('toast.network'));
      }
    },
  });
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
            {t('messages.count.key', { count: currentMessages.length })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {currentMessages.map((message) => (
            <div className="text-break mb-2" key={message.id}>
              {createMessage(message)}
            </div>

          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <Form onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
            <InputGroup className="has-validation">
              <Form.Control
                name="body"
                onChange={formik.handleChange}
                value={formik.values.body}
                placeholder={t('messages.form.placeholder')}
                aria-label={t('messages.form.ariaLabel')}
                aria-describedby="basic-addon2"
                className="border-0 p-0 ps-2"
                ref={inputEl}
              />
              <Button type="submit" variant="group-vertical" disabled={formik.isSubmitting}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                  <BsArrowRightSquare />
                </svg>
                <span className="visually-hidden">{t('messages.form.send')}</span>
              </Button>
            </InputGroup>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Messages;
