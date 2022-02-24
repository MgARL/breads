const React = require('react')
const bread = require('../models/bread')
const Default = require('./layouts/default')

function Bakers({breads, baker}) {
    return(
        <Default title={baker}>
            <h2>
                {baker} breads!
            </h2>
            {/* <p> I have {breads[0].name} bread!</p> */}
            <ul>
                {
                    breads.map((bread) => {
                        return (
                        <li key={bread.id}>
                            <a href={`/breads/${bread.id}`} >
                            {bread.name}
                            </a>
                        </li>)
                        
                    })
                }
            </ul>
            <div className="newButton">
                <a href="/breads/"><button>Go Back Home</button></a>
            </div>
        </Default>
    )
}

module.exports = Bakers