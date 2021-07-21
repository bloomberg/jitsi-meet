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
          console.log("New poll received")
          store.dispatch(newPoll(data.poll));
        }
        else if (data.type === NEW_POLL_RESPONSE) {
          console.log("New Poll response received")
          store.dispatch(newPollResponse(data.response));
          console.log(store.getState())
        }
      })
    }
  }
);
