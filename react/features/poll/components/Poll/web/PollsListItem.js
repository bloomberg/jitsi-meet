// @flow
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { openPollDetailPage } from '../../../actions';
import {
    PollsContainer,
    PollsContent,
    PollsTitle,
    PollsTitleContainer
} from '../../../styled';
type Props = {

    /**
     * Poll reference
     */
    poll: Object
};


export const PollsListItem = ({ poll }: Props) => {
    const dispatch = useDispatch();
    const toggleDetailView = () => {
        dispatch(openPollDetailPage(poll), [ dispatch ]);
    };

    const handleToggleDetailView = useCallback(() => toggleDetailView());

    return (<PollsContainer>
        <PollsContent onClick = { handleToggleDetailView }>
            <PollsTitleContainer>
                <PollsTitle>
                    {poll.title}
                </PollsTitle>
            </PollsTitleContainer>
        </PollsContent>
    </PollsContainer>);
};

