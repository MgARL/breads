const React = require('react')
const Default = require('./layouts/default')

function Show ({bread}) {
//   console.log(bread.name)
    return (
      <Default>
          <h3>{bread.name}</h3>
          <p>
              and it {
                  bread.hasGluten
                  ? <span> does </span>
                  : <span> does NOT </span>
              }
              have gluten.
          </p>
        <img src={bread.image} alt={bread.name} id={bread.name}/>
        <p>Baked by {bread.baker}</p>
        <a href={`/breads/${bread.id}/edit`}><button id="edit-btn">Edit</button></a>
        
        <form action={`/breads/${bread.id}?_method=DELETE`} method="POST">
          <input id="delete-btn" type='submit' value="DELETE"/>
        </form>
        <button><a href="/breads">Go Back Home</a></button>
      </Default>
    )
}

module.exports = Show