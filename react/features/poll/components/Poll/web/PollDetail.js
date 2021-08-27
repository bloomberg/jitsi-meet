// @flow
import _ from 'lodash';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NEW_POLL_RESPONSE } from '../../../actionTypes';
import { openPollsListPage, disableCustomizedAnswer } from '../../../actions';
import {
    AddOptionsButton,
    Container,
    CustomizedAnswerInput,
    Footer,
    FooterButton,
    Header,
    Heading,
    PollOptionsContainer,
    PollsContent
} from '../../../styled';

import { ProgressBar } from './ProgressBar';

export const PollDetail = () => {
    const dispatch = useDispatch();

    const [ customizedAnswer, setCustomizedAnswer ] = useState('');

    const pollIdSelected = useSelector(state => state['features/poll'].pollSelected);
    const pollSelected = useSelector(state => state['features/poll'].polls[pollIdSelected]);
    const conference = useSelector(state => state['features/base/conference'].conference);
    const participant = useSelector(state => state['features/base/participants'].local);
    const createdCustomizedInput = useSelector(state => state['features/poll'].addedCustomizedAnswer[pollIdSelected]);
    const options = useSelector(state => state['features/poll'].optionsList[pollIdSelected]);
    const participantPollResponse = useSelector(state =>
        _.get(state['features/poll'].pollResponses[pollIdSelected], participant.id));

    const togglePollsListMode = useCallback(() => dispatch(openPollsListPage(), [ dispatch ]));
    const removeCustomizedAnswerBox = useCallback(() =>
        dispatch(disableCustomizedAnswer(pollIdSelected), [ dispatch ]));
    const sendPollResponseMessage = useCallback(option => {
        const newResponse = { pollId: pollIdSelected,
            participantId: participant.id,
            answer: [ option ] };

        const msg = {
            type: NEW_POLL_RESPONSE,
            response: newResponse
        };

        conference.sendMessage(msg);
    });
    const handleSetCustomizedAnswer = useCallback(e => {
        setCustomizedAnswer(e.target.value);
    });

    const handleAddCustomizedOptionButton = useCallback(() => {
        if (customizedAnswer) {
            sendPollResponseMessage(customizedAnswer);
            removeCustomizedAnswerBox();
        }
    });

    const handlePollResponse = useCallback(option => () => sendPollResponseMessage(option));

    const participantAnswerList = _.get(participantPollResponse, 'answer') || [];

    const totalVotes = Object.values(pollSelected.options).reduce((total, count) => total + parseInt(count, 10), 0);


    return (<div>
        <Header><Heading>{pollSelected.title}</Heading></Header>
        <Container>
            <div>
                {options.map(option =>
                    (
                        <div key = { option }>
                            <PollOptionsContainer>
                                <PollsContent
                                    isSelected = { participantAnswerList.includes(option) }
                                    onClick = { handlePollResponse(option) }>
                                    <ProgressBar
                                        count = { pollSelected.options[option] }
                                        percentage = {
                                            Math.floor((pollSelected.options[option] * 100) / totalVotes) || 0
                                        }
                                        text = { option } />
                                </PollsContent>
                            </PollOptionsContainer>

                        </div>

                    ))}
                {pollSelected.allowCustomizedAnswer && !createdCustomizedInput
                    && <PollOptionsContainer>
                        <PollsContent>
                            <CustomizedAnswerInput
                                onChange = { handleSetCustomizedAnswer }
                                placeholder = 'Other ...' />
                            <AddOptionsButton
                                onClick = { handleAddCustomizedOptionButton }>+</AddOptionsButton>
                        </PollsContent>
                    </PollOptionsContainer>
                }
            </div>
        </Container>
        <Footer>
            <FooterButton onClick = { togglePollsListMode }> Back</FooterButton>
        </Footer>

    </div>);
};
