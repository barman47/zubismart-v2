import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextInput = ({
    placeholder1,
    type1,
    id1,
    name1,
    value1,
    onChange1,
    icon1,
    info1,
    disabled1,
    errorMessage1,
    
    placeholder2,
    type2,
    id2,
    name2,
    value2,
    onChange2,
    icon2,
    info2,
    disabled2,
    errorMessage2
}) => (
    <div className="row">
        <div className="col s12 m12 l6 input-field">
            <span className={`${icon1} prefix`}></span>
            <input 
                className={classnames('form-input validate', {
                    'invalid': errorMessage1
                })}
                id={id1}
                name={name1}
                type={type1}
                value={value1}
                placeholder={placeholder1}
                onChange={onChange1}
                disabled={disabled1}
            />
            {info1 ? (<span className="helper-text">{info1}</span>) : null}
            {errorMessage1 ? (<span className="helper-text invalid-text">{errorMessage1}</span>) : null}
        </div>
        <div className="col s12 m12 l6 input-field">
            <span className={`${icon2} prefix`}></span>
            <input 
                className={classnames('form-input validate', {
                    'invalid': errorMessage2
                })}
                id={id2}
                name={name2}
                type={type2}
                value={value2}
                placeholder={placeholder2}
                onChange={onChange2}
                disabled={disabled2}
            />
            {info2 ? (<span className="helper-text">{info2}</span>) : null}
            {errorMessage2 ? (<span className="helper-text invalid-text">{errorMessage2}</span>) : null}
        </div>
    </div>
);

TextInput.propTypes = {
    type1: PropTypes.string,
    id1: PropTypes.string.isRequired,
    name1: PropTypes.string.isRequired,
    value1: PropTypes.string.isRequired,
    icon1: PropTypes.string.isRequired,
    placeholder1: PropTypes.string.isRequired,
    info1: PropTypes.string,
    errorMessage1: PropTypes.string,
    onChange1: PropTypes.func.isRequired,
    disabled1: PropTypes.bool,

    type2: PropTypes.string,
    id2: PropTypes.string.isRequired,
    name2: PropTypes.string.isRequired,
    value2: PropTypes.string.isRequired,
    icon2: PropTypes.string.isRequired,
    info2: PropTypes.string,
    placeholder2: PropTypes.string.isRequired,
    errorMessage2: PropTypes.string,
    onChange2: PropTypes.func.isRequired,
    disabled2: PropTypes.bool
};

TextInput.defaultProps = {
    type1: 'text',
    type2: 'text'
};

export default TextInput;