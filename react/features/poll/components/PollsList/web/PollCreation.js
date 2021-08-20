// @flow
import React, { useCallback } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { NEW_POLL } from '../../../actionTypes';
import { openPollsListPage } from '../../../actions';
import {
    Close
} from '../../PollPanel/styled';
type Props = {

    poll: Object
};


export const PollCreation = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const togglePollsListMode = useCallback(() => dispatch(openPollsListPage(), [ dispatch ]));
    const conference = useSelector(state => state['features/base/conference'].conference);
    const participant = useSelector(state => state['features/base/participants'].local);
    const sendPollMessage = useCallback(poll => {
        conference.sendMessage({
            type: NEW_POLL,
            poll
        });
    });
    const onSubmit = data => {
        const options = {};

        data.options.forEach(option => {
            options[option.option] = 0;
        });
        const poll = { creatorParticipantId: participant.id,
            pollId: Math.floor(Math.random() * 899999 + 100000),
            title: data.title,
            allowCustomizedAnswer: false,
            options };

        sendPollMessage(poll);
        togglePollsListMode();
    };

    const { register, control, handleSubmit } = useForm({
        defaultValues: { 'options': [ {}, {} ]
        }
    });
    const { fields, append, remove } = useFieldArray(
        {
            control,
            name: 'options'
        }
    );

    return (
        <div>
            <Close
                aria-label = { t('participants_pane.close', 'Close') }
                onClick = { togglePollsListMode }
                role = 'button'
                tabIndex = { 0 } />
            <form onSubmit = { handleSubmit(onSubmit) }>
                <input
                    { ...register('title', { required: true }) } />
                <br />
                <ul>
                    {fields.map((item, index) => (
                        <li key = { item.id }>
                            <input
                                { ...register(`options.${index}.option`) } />

                            <button
                                onClick = { () => remove(index) }
                                type = 'button'> Delete
                            </button>
                        </li>
                    ))}
                </ul>

                <button
                    onClick = { () => {
                        append({ option: '' });
                    } }
                    type = 'button'>
          +
                </button>
                <br />
                <input
                    { ...register('customizedAnswers') }
                    type = 'checkbox' /> Allow customized answers
                <br />
                <input type = 'submit' />
            </form>
        </div>);
};
