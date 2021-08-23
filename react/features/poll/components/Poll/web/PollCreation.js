// @flow
import React, { useCallback } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { NEW_POLL } from '../../../actionTypes';
import { openPollsListPage } from '../../../actions';
import {
    AddOptionsButton,
    AddOptionsContainer,
    Button,
    Container,
    Footer,
    FooterButton,
    Heading,
    Option,
    TitleInput
} from '../../../styled';
import theme from '../../../theme.json';

export const PollCreation = () => {
    const dispatch = useDispatch();
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
            pollId: `${time}_${Math.floor((Math.random() * 899999) + 100000).toString()}`,
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

    const handleAddOptionsButton = useCallback(() => append({ option: '' }));

    const handleRemoveOptionsButton = useCallback(index => () => remove(index));

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
                                    placeholder = 'Option...'
                                    styles = {{ display: 'block',
                                        boxSizing: 'border-box',
                                        borderRadius: '2px',
                                        border: '1px solid white' }}
                                    { ...register(`options.${index}.option`, { required: true }) } />
                                <Button
                                    onClick = { handleRemoveOptionsButton(index) }
                                    type = 'button'> x
                                </Button>
                            </Option>
                        ))}
                        <AddOptionsButton
                            onClick = { handleAddOptionsButton }
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
