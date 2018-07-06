import React from 'react';
import PropTypes from 'prop-types';
import './Content.scss';

const Content = (props) =>  {
    const {content} = props
    return ( 
        <div> 
            <h1 className="title">{content.title}</h1>
            <p className="content">{content.content}</p>
        </div> 
    );
}

Content.defaultProps = {

};

Content.propTypes = {
    content: PropTypes.object
}

export default Content