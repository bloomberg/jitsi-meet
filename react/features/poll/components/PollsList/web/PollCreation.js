// @flow
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
type Props = {

    poll: Object
};


export const PollCreation = ({ poll: p }: Props) => {
    const [ options, setOptions ] = useState([ 'option1', 'option2' ]);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const pollPaneMode = useSelector(state => state['features/poll'].pollPaneMode);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    if (pollPaneMode !== 'PollCreate') {
        return <div />;
    }

    return (<form onSubmit = { handleSubmit(onSubmit) }>
        <input
            { ...register('title', { required: true }) } />
        {errors.exampleRequired && <span>This field is required</span>}
        <br />
        <div>
            {options.map(option => (<label><input
                type = 'radio'
                key = { option }
                value = { option } />{option}</label >))}
        </div>

        <button type = 'submit'>Submit</button>
    </form>);
};
