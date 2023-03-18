import React from "react"
import FilterNameHandler from "./FilterName"
// on submit, the handler converts the filter value to lower case and checks if it matches any of the person's name in the db
// setSearched state is changed to 'True'
export default function FilterNameForm(props) {
    return (
        <form onSubmit={(e)=>FilterNameHandler(e,props)}>
            
            <div>
                {/* filtvalue function updates the filtervalue state */}
                <input onChange={props.filtValue} value={props.filterValue} />
                <button type='submit'>Search Name</button>
            </div>
        </form>
    )
}