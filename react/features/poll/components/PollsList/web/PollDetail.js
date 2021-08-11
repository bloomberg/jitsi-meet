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
    FooterButton,
    Container,
    Footer,
    Header,
    Heading,
    CustomizedAnswerInput,
    AddOptionsButton
} from '../../PollPanel/styled';

import { ProgressBar } from './ProgressBar';

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

    const options = useSelector(state => state['features/poll'].optionsList[pollSelected.pollId]);

    const participantPollResponse = useSelector(state => _.get(state['features/poll'].pollResponses[pollSelected.pollId], participant.id));
    const participantAnswerList = _.get(participantPollResponse, 'answer') || [];

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
                                <PollsContent
                                    onClick = { () => sendPollResponseMessage(option) }
                                    isSelected = { participantAnswerList.includes(option) }>
                                    <ProgressBar
                                        count = { pollSelected.options[option] }
                                        text = { option }
                                        percentage = { Math.floor((pollSelected.options[option] * 100) / totalVotes) || 0 } />
                                </PollsContent>
                            </PollOptionsContainer>

                        </div>

                    ))}
                {pollSelected.allowCustomizedAnswer & allowCustomizedInput
                    ? <PollOptionsContainer>
                        <PollsContent>
                            <CustomizedAnswerInput
                                onChange = { e => setCustomizedAnswer(e.target.value) }
                                placeholder = 'Other ...' />
                            <AddOptionsButton
                                onClick = { () => {
                                    if (customizedAnswer) {
                                        sendPollResponseMessage(customizedAnswer);
                                        disableCustomizedAnswer();
                                    }
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


// export const ProgressBar = props => {
//     const { text, percentage, count } = props;

//     return (
//         <ProgressBarConatainer>
//             <Progress>
//                 <ProgressText>{text}</ProgressText>
//                 <ProgressCount>{count}</ProgressCount>
//             </Progress>
//             <ProgressBarComplete
//                 style = {{ width: `${percentage}%` }}>
//                 <ProgressBarLiquid />
//             </ProgressBarComplete>

//         </ProgressBarConatainer>);
// };
