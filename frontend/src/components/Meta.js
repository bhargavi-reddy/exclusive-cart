import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title >{title}</title>
            <meta name='description' content={description}></meta>
            <meta name='keywords' content={keywords}></meta>

        </Helmet>
    )
}


Meta.defaultProps = {
    title: 'Welcomre to proshop',
    description: 'Shop good products at cheaper price',
    keywords: 'Electronic products, clothing, etc.,'
}
export default Meta
