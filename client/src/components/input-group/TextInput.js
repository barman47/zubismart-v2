import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextInput = ({
    label,
    type,
    id,
    name,
    value,
    placeholder,
    onChange,
    icon,
    info,
    tooltip,
    title,
    disabled,
    errorMessage
}) => (
    <div className="row">
        <div className="col s12 input-field">
            <span className={`${icon} prefix`}></span>
            <input 
                className={classnames('form-input validate tooltipped', {
                    'invalid': errorMessage
                })}
                id={id}
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                title={title}
                data-tooltip={tooltip}
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
    name: PropTypes.string,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    id: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    info: PropTypes.string,
    title: PropTypes.string,
    tooltip: PropTypes.string,
    errorMessage: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool
};

TextInput.defaultProps = {
    type: 'text'
};

export default TextInput;