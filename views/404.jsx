const React = require('react')
const Default = require('./layouts/default')

function pageNotFound ({ message }) {
  let errorMessage = ''
  if (message){
    errorMessage =`Error: ${message}`
  }
    return (
      <Default>
         <h2>404 Page Not Found</h2>
         <button><a href="/breads">Go Back Home</a></button>
        <p className='error'> {errorMessage} </p>
      </Default>
    )
}

module.exports = pageNotFound