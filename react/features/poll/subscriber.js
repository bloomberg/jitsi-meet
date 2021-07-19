import { getCurrentConference } from '../base/conference';
import { StateListenerRegistry } from '../base/redux';
import { CREATE_NEW_POLL, CREATE_NEW_POLLRESPONSE } from './actionTypes'

StateListenerRegistry.register(
  state => getCurrentConference(state),
  (conference, store, previousConference) => {
    if (conference && conference !== previousConference) {
      conference.room.addListener('xmmp.json_message_received', (senderJid, data) => {
        if (data.type === CREATE_NEW_POLL) {
          console.log("New poll created")
          console.log(data)
        }
      })
    }
  }
);
