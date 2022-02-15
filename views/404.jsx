const React = require('react')
const Default = require('./layouts/default')

function pageNotFound () {
//   console.log(bread.name)
    return (
      <Default>
         <h2>404 Page Not Found</h2>
         <button><a href="http://localhost:3003/breads">Go Back Home</a></button>
      </Default>
    )
}

module.exports = pageNotFound