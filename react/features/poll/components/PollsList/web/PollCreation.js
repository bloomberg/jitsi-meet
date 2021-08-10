// @flow
import React, { useCallback } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { NEW_POLL } from '../../../actionTypes';
import { openPollsListPage } from '../../../actions';
import theme from '../../../theme.json';
import {
    Button,
    FooterButton,
    TitleInput,
    AddOptionsContainer,
    Container,
    Footer,
    Option,
    AddOptionsButton,
    Heading
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

        const time = Date.now().toString();
        const poll = { creatorParticipantId: participant.id,
            pollId: `${time}_${Math.floor(Math.random() * 899999 + 100000).toString()}`,
            title: data.title,
            allowCustomizedAnswer: data.customizedAnswer,
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
        <ThemeProvider theme = { theme }>

            <form onSubmit = { handleSubmit(onSubmit) }>
                <Container>
                    <Heading>Title</Heading>
                    <TitleInput
                        placeholder = 'Title...'
                        { ...register('title', { required: true }) } />
                    <Heading>Options</Heading>
                    <AddOptionsContainer>
                        {fields.map((item, index) => (
                            <Option key = { item.id }>
                                <input
                                    styles = {{ display: 'block',
                                        boxSizing: 'border-box',
                                        borderRadius: '2px',
                                        border: '1px solid white' }}
                                    placeholder = 'Option...'
                                    { ...register(`options.${index}.option`, { required: true }) } />
                                <Button
                                    onClick = { () => remove(index) }
                                    type = 'button'> x
                                </Button>
                            </Option>
                        ))}
                        <AddOptionsButton
                            onClick = { () => {
                                append({ option: '' });
                            } }
                            type = 'button'>
                        +
                        </AddOptionsButton>
                    </AddOptionsContainer>
                    <input
                        { ...register('customizedAnswer') }
                        type = 'checkbox' /> Allow customized answers
                </Container>
                <Footer>
                    <FooterButton onClick = { togglePollsListMode }> Cancel </FooterButton>
                    <FooterButton type = 'submit'> Create </FooterButton>
                </Footer>

            </form>
        </ThemeProvider>);
};
