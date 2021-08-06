// @flow
import _ from 'lodash';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { NEW_POLL_RESPONSE } from '../../../actionTypes';
import { openPollsListPage, createdCustomizedAnswer } from '../../../actions';
import {
    PollOptionsContainer,
    PollsContent,
    PollOptionsTitle,
    PollsTitleContainer,
    FooterButton,
    Container,
    Footer,
    Header,
    Heading,
    CustomizedAnswerInput,
    Button,
    AddOptionsButton,
    ProgressBarLiquid,
    Progress,
    ProgressBarComplete,
    ProgressBarConatainer
} from '../../PollPanel/styled';

export const PollDetail = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const pollSelected = useSelector(state => state['features/poll'].pollSelected);
    const togglePollsListMode = useCallback(() => dispatch(openPollsListPage(), [ dispatch ]));
    const disableCustomizedAnswer = useCallback(() => dispatch(createdCustomizedAnswer(pollSelected.pollId), [ dispatch ]));

    const conference = useSelector(state => state['features/base/conference'].conference);
    const participant = useSelector(state => state['features/base/participants'].local);
    const allowCustomizedInput = useSelector(state => state['features/poll'].createdCustomizedAnswer[pollSelected.pollId]);
    const sendPollResponseMessage = useCallback(option => {
        const newResponse = { pollId: pollSelected.pollId,
            participantId: participant.id,
            answer: [ option ] };

        const msg = {
            type: NEW_POLL_RESPONSE,
            response: newResponse
        };

        conference.sendMessage(msg);
    });

    const options = Object.keys(_.get(pollSelected, 'options')).sort();

    console.log(pollSelected);
    const [ customizedAnswer, setCustomizedAnswer ] = useState('');

    const totalVotes = Object.values(pollSelected.options).reduce((total, count) => total + count, 0);

    return (<div>
        <Header><Heading>{pollSelected.title}</Heading></Header>
        <Container>
            <div>
                {options.map(option =>
                    (
                        <div key = { option }>
                            <PollOptionsContainer>
                                <PollsContent onClick = { () => sendPollResponseMessage(option) }>
                                    {/* <PollsTitleContainer> */}
                                    {/* <PollOptionsTitle>
                                            { t(option) }
                                        </PollOptionsTitle> */}
                                    <ProgressBar
                                        text = { option }
                                        percentage = { ((pollSelected.options[option] * 100) / totalVotes) || 0 } />
                                    {/* {pollSelected.options[option]} */}
                                    {/* </PollsTitleContainer> */}
                                </PollsContent>
                            </PollOptionsContainer>

                        </div>

                    ))}
                {pollSelected.allowCustomizedAnswer & allowCustomizedInput
                    ? <PollOptionsContainer>
                        <PollsContent>
                            <CustomizedAnswerInput
                                onChange = { e => setCustomizedAnswer(e.target.value) }
                                value = { customizedAnswer }
                                placeholder = 'Other ...' />
                            <AddOptionsButton
                                onClick = { () => {
                                    sendPollResponseMessage(customizedAnswer);
                                    disableCustomizedAnswer();
                                } }>+</AddOptionsButton>
                        </PollsContent>
                    </PollOptionsContainer>
                    : <div />}
            </div>
        </Container>
        <Footer>
            <FooterButton onClick = { togglePollsListMode }> Back</FooterButton>
        </Footer>

    </div>);
};


export const ProgressBar = props => {
    const { text, percentage } = props;
    const progress = 60;

    return (
        <ProgressBarConatainer>
            <ProgressBarComplete
                style = {{ width: `${percentage}%` }}>
                <ProgressBarLiquid />
            </ProgressBarComplete>
            <Progress>{`${text} (${percentage}%)`}</Progress>
        </ProgressBarConatainer>);
};
