import React from 'react'


export const PageContentLayout = ({ isRendering, children, unAvailabilityText }) => (
        <React.Fragment>
        {
            isRendering ? children : unAvailabilityText
        }
        </React.Fragment>
        
)
