import { getCurrentConference } from '../base/conference';
import { StateListenerRegistry } from '../base/redux';
import {
    showNotification,
    POLL_NOTIFICATION_TIMEOUT,
    NOTIFICATION_TYPE
} from '../notifications';

import { NEW_POLL, NEW_POLL_RESPONSE, SYNC_POLL } from './actionTypes';
import { newPoll, newPollResponse, syncPoll, open, openPollDetailPage } from './actions';

// OPtimization so that only sync once from the host when joining the conference
let isSynced = false;


StateListenerRegistry.register(
  state => getCurrentConference(state),
  (conference, store, previousConference) => {
      if (conference && conference !== previousConference) {
          conference.room.addListener('xmmp.json_message_received', (senderJid, data) => {
              if (data.type === NEW_POLL) {
                  store.dispatch(newPoll(data.poll));
                  store.dispatch(showNotification({
                      appearance: NOTIFICATION_TYPE.NORMAL,
                      descriptionKey: data.poll.title,
                      title: 'A new poll has been created!',
                      titleArguments: data.poll,
                      hideErrorSupportLink: true,
                      customActionNameKey: 'Vote',
                      customActionHandler: () => {
                          store.dispatch(open());
                          store.dispatch(openPollDetailPage(store.getState()['features/poll'].polls[data.poll.pollId]));
                      }
                  }, POLL_NOTIFICATION_TIMEOUT));
              } else if (data.type === NEW_POLL_RESPONSE) {
                  store.dispatch(newPollResponse(data.response));

              } else if (data.type === SYNC_POLL) {
                  if (!isSynced) {
                      const { polls, pollResponses, optionsList } = data;

                      store.dispatch(syncPoll(polls, pollResponses, optionsList));
                      isSynced = true;
                  }

              }
          });
      }
  }
);
