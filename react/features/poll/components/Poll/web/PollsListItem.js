// @flow
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
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


export const PollsListItem = ({ poll: p }: Props) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const toggleDetailView = () => {
        dispatch(openPollDetailPage(p), [ dispatch ]);
    };

    const handleToggleDetailView = useCallback(() => toggleDetailView(p));

    return (<PollsContainer>
        <PollsContent onClick = { handleToggleDetailView }>
            <PollsTitleContainer>
                <PollsTitle>
                    { t(p.title) }
                </PollsTitle>
            </PollsTitleContainer>
        </PollsContent>
    </PollsContainer>);
};

