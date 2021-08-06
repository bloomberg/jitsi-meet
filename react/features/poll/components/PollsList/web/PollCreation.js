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
    OptionInput,
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
                                <OptionInput
                                    placeholder = 'Option...'
                                    { ...register(`options.${index}.option`, { required: true }) } />
                                {/* <div className = { `chat-input-container${this.state.message.trim().length ? ' populated' : ''}` }>
                                    <div id = 'chat-input' >
                                        <div className = 'usrmsg-form'>
                                            <TextareaAutosize
                                                autoComplete = 'off'
                                                autoFocus = { true }
                                                id = 'usermsg'
                                                maxRows = { 5 }
                                                onChange = { this._onMessageChange }
                                                onHeightChange = { this.props.onResize }
                                                onKeyDown = { this._onDetectSubmit }
                                                placeholder = { this.props.t('chat.messagebox') }
                                                ref = { this._setTextAreaRef }
                                                tabIndex = { 0 }
                                                value = { this.state.message } />
                                        </div>
                                    </div>
                                </div> */}
                                <Button
                                    onClick = { () => remove(index) }
                                    type = 'button'> X
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
