import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextInput = ({
    label,
    type,
    id,
    name,
    value,
    onChange,
    icon,
    info,
    disabled,
    errorMessage
}) => (
    <div className="row">
        <div className="col s12 input-field">
            <span className={`${icon} prefix`}></span>
            <input 
                className={classnames('form-input validate', {
                    'invalid': errorMessage
                })}
                id={id}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
            <label htmlFor={id}>{label}</label>
            {info ? (<span className="helper-text">{info}</span>) : null}
            {errorMessage ? (<span className="helper-text invalid-text">{errorMessage}</span>) : null}
        </div>
    </div>
);

TextInput.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    info: PropTypes.string,
    errorMessage: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool
};

TextInput.defaultProps = {
    type: 'text'
};

export default TextInput;