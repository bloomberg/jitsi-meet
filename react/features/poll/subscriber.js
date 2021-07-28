import { getCurrentConference } from '../base/conference';
import { StateListenerRegistry } from '../base/redux';

import { NEW_POLL, NEW_POLL_RESPONSE } from './actionTypes';
import { newPoll, newPollResponse } from './actions';


StateListenerRegistry.register(
  state => getCurrentConference(state),
  (conference, store, previousConference) => {
      if (conference && conference !== previousConference) {
          conference.room.addListener('xmmp.json_message_received', (senderJid, data) => {
              if (data.type === NEW_POLL) {
                  store.dispatch(newPoll(data.poll));
              } else if (data.type === NEW_POLL_RESPONSE) {
                  store.dispatch(newPollResponse(data.response));
              }
          });
      }
  }
);
