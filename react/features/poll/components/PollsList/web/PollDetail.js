// @flow
import _ from 'lodash';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { NEW_POLL_RESPONSE } from '../../../actionTypes';
import { openPollsListPage } from '../../../actions';
import {
    Close
} from '../../PollPanel/styled';

export const PollDetail = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const pollPaneMode = useSelector(state => state['features/poll'].pollPaneMode);
    const pollSelected = useSelector(state => state['features/poll'].pollSelected);
    const togglePollsListMode = useCallback(() => dispatch(openPollsListPage(), [ dispatch ]));
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const conference = useSelector(state => state['features/base/conference'].conference);
    const participant = useSelector(state => state['features/base/participants'].local);

    const sendPollResponseMessage = useCallback(res => {
        const newResponse = { pollId: pollSelected.pollId,
            participantId: participant.id,
            answer: [ res.response ] };

        const msg = {
            type: NEW_POLL_RESPONSE,
            response: newResponse
        };

        conference.sendMessage(msg);
    });

    const onSubmit = (data, any) => {
        sendPollResponseMessage(data);
    };


    if (pollPaneMode !== 'PollDetail') {
        return <div />;
    }
    const options = _.get(pollSelected, 'options');

    return (<div>
        <Close
            aria-label = { t('participants_pane.close', 'Close') }
            onClick = { togglePollsListMode }
            role = 'button'
            tabIndex = { 0 } />
        <p>{pollSelected.title}</p>
        <form onSubmit = { handleSubmit(onSubmit) }>
            {Object.keys(options).map(option =>
                (
                    <div key = { option }>
                        <input
                            type = 'radio'
                            value = { option }
                            { ...register('response') } />
                        <label >{option}</label>
                        <label >- {pollSelected.options[option]}</label>
                    </div>

                ))}
            <input type = 'submit' />
        </form>
    </div>);
};
