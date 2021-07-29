// @flow
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';


export const PollDetail = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const pollPaneMode = useSelector(state => state['features/poll'].pollPaneMode);
    const pollSelected = useSelector(state => state['features/poll'].pollSelected);

    console.log(pollSelected);
    if (pollPaneMode !== 'PollDetail') {
        return <div />;
    }

    return (<h1>
        <p>{pollSelected.title}</p>
    </h1>);
};
