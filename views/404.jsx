const React = require('react')
const Default = require('./layouts/default')

function pageNotFound ({ message }) {
//   console.log(bread.name)
    return (
      <Default>
         <h2>404 Page Not Found</h2>
         <button><a href="/breads">Go Back Home</a></button>
         <p className='error'>Error: {message}</p>
      </Default>
    )
}

module.exports = pageNotFound