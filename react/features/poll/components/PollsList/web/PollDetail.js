// @flow
import _ from 'lodash';
import React, { useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { NEW_POLL_RESPONSE } from '../../../actionTypes';
import { openPollsListPage } from '../../../actions';
import theme from '../../../theme.json';
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
    ProgressBar,
    Progress
} from '../../PollPanel/styled';

export const PollDetail = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const pollSelected = useSelector(state => state['features/poll'].pollSelected);
    const togglePollsListMode = useCallback(() => dispatch(openPollsListPage(), [ dispatch ]));
    const { register, handleSubmit } = useForm();

    const conference = useSelector(state => state['features/base/conference'].conference);
    const participant = useSelector(state => state['features/base/participants'].local);

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

    const options = _.get(pollSelected, 'options');

    const [ customizedAnswer, setCustomizedAnswer ] = useState('');

    return (<div>
        <Header><Heading>{pollSelected.title}</Heading></Header>
        <Container>
            <div>
                {Object.keys(options).map(option =>
                    (
                        <div key = { option }>
                            <PollOptionsContainer>
                                <PollsContent onClick = { () => sendPollResponseMessage(option) }>
                                    <PollsTitleContainer>
                                        <PollOptionsTitle>
                                            { t(option) }
                                        </PollOptionsTitle>
                                        {pollSelected.options[option]}
                                    </PollsTitleContainer>
                                </PollsContent>
                            </PollOptionsContainer>

                        </div>

                    ))}
                {pollSelected.allowCustomizedAnswer
                    ? <PollOptionsContainer>
                        <PollsContent>
                            <CustomizedAnswerInput
                                onChange = { e => setCustomizedAnswer(e.target.value) }
                                value = { customizedAnswer }
                                placeholder = 'Other ...' />
                            <Button
                                onClick = { () => {
                                    sendPollResponseMessage(customizedAnswer);
                                } }>+</Button>
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
