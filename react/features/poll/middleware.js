// @flow

import { PARTICIPANT_JOINED } from '../base/participants/actionTypes';
import { isLocalParticipantModerator } from '../base/participants/functions';
import { MiddlewareRegistry } from '../base/redux';

import { SYNC_POLL } from './actionTypes';


MiddlewareRegistry.register(({ getState }) => next => action => {
    const result = next(action);

    switch (action.type) {

    // Middleware triggered when a poll is received
    case PARTICIPANT_JOINED: {
        if (isLocalParticipantModerator) {
            const state = getState();
            const { polls, pollResponses, optionsList } = state['features/poll'];

            const conference = state['features/base/conference'].conference;

            const msg = { polls,
                pollResponses,
                optionsList,
                type: SYNC_POLL };

            if (conference) {
                conference.sendMessage(msg);
            }
        }
        break;
    }


    }

    return result;
});
